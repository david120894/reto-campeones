import { Component, ElementRef, OnInit, ViewChild, NgZone } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

@Component({
  selector: 'app-llama-scene',
  template: '<div #rendererContainer style="width:100%; height:100%"></div>',
})
export class LlamaSceneComponent implements OnInit {
  @ViewChild('rendererContainer', { static: true }) rendererContainer!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private clock = new THREE.Clock();
  private llama!: THREE.Object3D;

  // Partículas alrededor del modelo
  private particleSystem!: THREE.Points;
  private particleCount = 200;
  private particles!: THREE.BufferGeometry;
  private particleMaterial!: THREE.PointsMaterial;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.initScene();
    // this.loadEnvironment();
    this.loadLlama();
    this.createParticles();
    this.animate();
  }

  private initScene(): void {
    this.scene = new THREE.Scene();
    this.scene.background = null; // fondo transparente

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 4.2;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    // Cámara
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 2, 6);

    // Luces
    this.scene.add(new THREE.AmbientLight(0xffffff, 1.5));
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x888888, 1.2);
    hemiLight.position.set(0, 50, 0);
    this.scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 3);
    dirLight.position.set(5, 10, 5);
    dirLight.castShadow = true;
    this.scene.add(dirLight);

    // Controles
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.enableZoom = false;

    // Resize handler
    window.addEventListener('resize', () => {
      const width = this.rendererContainer.nativeElement.clientWidth;
      const height = this.rendererContainer.nativeElement.clientHeight;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    });
  }

  private loadEnvironment(): void {
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    pmremGenerator.compileEquirectangularShader();

    new RGBELoader()
      .setPath('championship/3Dimage.glb')
      .load(
        'studio.hdr',
        (hdrEquirect) => {
          const envMap = pmremGenerator.fromEquirectangular(hdrEquirect).texture;
          this.scene.environment = envMap;
          hdrEquirect.dispose();
          pmremGenerator.dispose();
        },
        undefined,
        (error) => console.error('Error cargando HDR:', error)
      );
  }

  private loadLlama(): void {
    const loader = new GLTFLoader();
    loader.load(
      'championship/3Dimage.glb',
      (gltf: GLTF) => {
        this.llama = gltf.scene;
        this.llama.scale.set(4, 4, 4);
        this.llama.position.set(0, -0.5, 0);
        this.scene.add(this.llama);
      },
      undefined,
      (error) => console.error('Error cargando GLB:', error)
    );
  }

  // Crear partículas alrededor de la llama
  private createParticles(): void {
    this.particles = new THREE.BufferGeometry();
    const positions = [];

    for (let i = 0; i < this.particleCount; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.random() * Math.PI;
      const radius = 2 + Math.random() * 0.5;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions.push(x, y, z);
    }

    this.particles.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    this.particleMaterial = new THREE.PointsMaterial({
      color: 0xffdd00,
      size: 0.08,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8,
    });

    this.particleSystem = new THREE.Points(this.particles, this.particleMaterial);
    this.scene.add(this.particleSystem);
  }

  private animate(): void {
    this.ngZone.runOutsideAngular(() => {
      const renderLoop = () => {
        requestAnimationFrame(renderLoop);
        const delta = this.clock.getDelta();

        // Rotación de la llama
        if (this.llama) this.llama.rotation.y += delta * 0.5;

        // Animación de partículas: giran alrededor del modelo
        const positions = this.particles.attributes['position'] as THREE.BufferAttribute;
        const time = this.clock.getElapsedTime();
        for (let i = 0; i < positions.count; i++) {
          const x = positions.getX(i);
          const z = positions.getZ(i);
          const angle = 0.5 * delta; // velocidad de rotación
          positions.setX(i, x * Math.cos(angle) - z * Math.sin(angle));
          positions.setZ(i, x * Math.sin(angle) + z * Math.cos(angle));
        }
        positions.needsUpdate = true;

        this.controls.update();
        this.renderer.render(this.scene, this.camera);
      };
      renderLoop();
    });
  }
}
