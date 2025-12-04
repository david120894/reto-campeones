import { AfterViewInit, Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import confetti from 'canvas-confetti';
import { ParticipantsService } from '../../../../../core/services/participants.service'
import { ParticipantsModel } from '../../../../../core/models/participants.model'

interface Participant {
  id: number;
  name: string;
  email: string;
  orbit: number;
  angle: number;
  color: string;
}

@Component({
  selector: 'app-raffle',
  imports: [NgIf, NgForOf, NgClass],
  templateUrl: './raffle.component.html',
  styleUrl: './raffle.component.scss',
})
export class RaffleComponent implements OnInit,AfterViewInit{
  @ViewChild('videoPlayer', { static: false }) videoPlayer!: ElementRef<HTMLVideoElement>;
  participantsService = inject(ParticipantsService)
  currentWinner = signal<ParticipantsModel | null>(null)
  loadingWinner = signal(false);

  // Para la opción 2 - Partículas flotantes
  floatingParticles: any[] = [];
  participants: Participant[] = [];
  visibleBalls: Participant[] = [];
  winner: Participant | null = null;

  phase: 'idle' | 'spin' | 'explode' | 'moveToCenter' | 'winner' = 'idle';
  isRunning = false;
  orbitCount = 7;
  showWinnerModal = false;
  confettiInterval: any;
  ngAfterViewInit(): void {
    if (this.videoPlayer) {
      const video = this.videoPlayer.nativeElement;
      video.muted = true;
      video.playsInline = true;
      video.play().catch(err => console.warn('Autoplay bloqueado:', err));
    }
  }
  // Paleta de colores vibrantes para las bolas
  private colorPalette = [
    '#FF0000', // ROJO NEÓN
    '#00FF00', // VERDE NEÓN
    '#0000FF', // AZUL NEÓN
    '#FFFF00', // AMARILLO NEÓN
    '#FF00FF', // MAGENTA NEÓN
    '#00FFFF', // CIAN NEÓN
    '#FF007F', // ROSA NEÓN
    '#7FFF00', // CHARTREUSE NEÓN
    '#007FFF', // AZUL CIELO NEÓN
    '#FF7F00', // NARANJA NEÓN
    '#8F00FF', // VIOLETA NEÓN
    '#00FF7F', // VERDE PRIMAVERA NEÓN
    '#FF00AA', // ROSA FUCSIA
    '#AA00FF', // PÚRPURA ELÉCTRICO
    '#00AAFF', // AZUL CELESTE
    '#FFAA00', // AMARILLO NARANJA
    '#7F00FF', // VIOLETA AZUL
    '#00FFAA', // TURQUESA NEÓN
    '#FF007F', // ROSA INTENSO
    '#FF5500', // NARANJA ROJIZO
    '#00FF55', // VERDE LIMA
    '#5500FF', // AZUL VIOLETA
    '#FF0055', // ROSA ROJIZO
    '#55FF00', // VERDE AMARILLENTO
    '#0055FF', // AZUL PURPURA
    '#FF5500', // NARANJA FUEGO
    '#00FF55', // VERDE AGUA
    '#FF00AA', // MAGENTA ROSADO
    '#AAFF00', // AMARILLO VERDE
    '#FFAA00'  // NARANJA DORADO
  ];

  ngOnInit() {
    console.log(this.phase)
    this.generateParticipants();
    this.generateFloatingParticles();
  }
  private generateFloatingParticles() {
    this.floatingParticles = [];
    for (let i = 0; i < 15; i++) {
      this.floatingParticles.push({
        x: Math.random() * 100,
        delay: Math.random() * 5,
        color: this.colorPalette[Math.floor(Math.random() * this.colorPalette.length)]
      });
    }
  }
  generateParticipants() {
    this.participants = [];

    const orbitConfig = [6, 12, 18, 25, 30, 35, 40];

    let id = 1;
    for (let orbit = 1; orbit <= this.orbitCount; orbit++) {
      const ballsInOrbit = orbitConfig[orbit - 1];
      for (let i = 0; i < ballsInOrbit; i++) {
        this.participants.push({
          id: id++,
          name: `Participante ${id}`,
          email: `user${id}@correo.com`,
          orbit,
          angle: (i / ballsInOrbit) * 360,
          color: this.getRandomColor() // Asignar color aleatorio
        });
      }
    }
  }

  gerWinner() {
    this.loadingWinner.set(true)
    this.participantsService.getWinner().subscribe({
      next: (winner: ParticipantsModel) => {
        if (winner) {
          console.log(winner)
          this.loadingWinner.set(false)
          this.currentWinner.set(winner)
        }
      } ,
      error: (err) => {
        if (err.status === 404) {
          this.loadingWinner.set(false)
        }
      },
      complete: () => {
        this.loadingWinner.set(false)
      }
    })
  }
  private getRandomColor(): string {
    const randomIndex = Math.floor(Math.random() * this.colorPalette.length);
    return this.colorPalette[randomIndex];
  }

  startRaffle() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.showWinnerModal = false;
    this.stopConfetti();

    this.winner = null;
    this.visibleBalls = [...this.participants];
    this.phase = 'spin';

    setTimeout(() => {
      this.phase = 'explode';
      this.winner = this.getRandomWinner();

      setTimeout(() => {
        this.visibleBalls = [this.winner!];
        this.phase = 'moveToCenter';

        setTimeout(() => {
          this.phase = 'winner';
          this.isRunning = false;
        }, 2000);
      }, 1500);
    }, 10000);
  }

  reset() {
    this.phase = 'idle';
    this.visibleBalls = [];
    this.winner = null;
    this.isRunning = false;
    this.showWinnerModal = false;
    this.stopConfetti();
  }

  getRandomWinner(): Participant {
    const randomIndex = Math.floor(Math.random() * this.participants.length);
    return this.participants[randomIndex];
  }

  showWinnerInfo() {
    this.showWinnerModal = true;
    this.gerWinner()
    this.startConfetti();
  }

  closeWinnerModal() {
    this.showWinnerModal = false;
    this.stopConfetti();
    this.reset()
  }

  startConfetti() {
    const confettiConfig = {
      particleCount: 150,
      spread: 100,
      startVelocity: 30,
      origin: { y: 0.6 },
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff', '#ffa500', '#ff69b4'],
      gravity: 0.8,
      scalar: 1.2,
      ticks: 200
    };

    confetti(confettiConfig);

    this.confettiInterval = setInterval(() => {
      confetti({
        ...confettiConfig,
        angle: 60,
        spread: 80,
        particleCount: 80,
        origin: { x: 0, y: 0.7 }
      });

      confetti({
        ...confettiConfig,
        angle: 120,
        spread: 80,
        particleCount: 80,
        origin: { x: 1, y: 0.7 }
      });

      confetti({
        particleCount: 50,
        spread: 120,
        startVelocity: 35,
        origin: { y: 0.6 },
        colors: ['#ff0000', '#ffff00', '#00ffff'],
        gravity: 0.5
      });

      if (Math.random() > 0.7) {
        confetti({
          particleCount: 30,
          spread: 100,
          origin: { y: 0.6 },
          shapes: ['star'],
          colors: ['#FFE400', '#FFBD00', '#E89400', '#FFCA6C', '#FDFFB8'],
        });
      }
    }, 400);
  }

  stopConfetti() {
    if (this.confettiInterval) {
      // this.reset()
      clearInterval(this.confettiInterval);
      this.confettiInterval = null;
    }
    confetti.reset();
  }

  ngOnDestroy() {
    this.stopConfetti();
  }
}
