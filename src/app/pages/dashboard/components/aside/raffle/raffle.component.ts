import { Component, OnInit } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import confetti from 'canvas-confetti';

interface Participant {
  id: number;
  name: string;
  email: string;
  orbit: number;
  angle: number;
}

@Component({
  selector: 'app-raffle',
  imports: [NgIf, NgForOf, NgClass],
  templateUrl: './raffle.component.html',
  styleUrl: './raffle.component.scss',
})
export class RaffleComponent implements OnInit {
  participants: Participant[] = [];
  visibleBalls: Participant[] = [];
  winner: Participant | null = null;

  phase: 'idle' | 'spin' | 'explode' | 'moveToCenter' | 'winner' = 'idle';
  isRunning = false;
  orbitCount = 7;
  showWinnerModal = false;
  confettiInterval: any;

  ngOnInit() {
    this.generateParticipants();
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
        });
      }
    }
  }

  startRaffle() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.showWinnerModal = false;
    this.stopConfetti(); // Detener confeti si estaba activo

    this.winner = null;
    this.visibleBalls = [...this.participants];
    this.phase = 'spin';

    // Fase 1: giran durante 5s
    setTimeout(() => {
      this.phase = 'explode';

      // Seleccionar ganador
      this.winner = this.getRandomWinner();

      // Fase 2: después de la explosión, mostrar solo el ganador
      setTimeout(() => {
        this.visibleBalls = [this.winner!];
        this.phase = 'moveToCenter';

        // Fase 3: después de moverse al centro, mostrar como ganador
        setTimeout(() => {
          this.phase = 'winner';
          this.isRunning = false;
        }, 2000);
      }, 1500);
    }, 5000);
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
    this.startConfetti();
  }

  closeWinnerModal() {
    this.showWinnerModal = false;
    this.stopConfetti();
  }

  startConfetti() {
    // Configuración del confeti más visible
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

    // Disparar confeti inmediatamente
    confetti(confettiConfig);

    // Disparar confeti desde la izquierda
    this.confettiInterval = setInterval(() => {
      // Confeti desde izquierda
      confetti({
        ...confettiConfig,
        angle: 60,
        spread: 80,
        particleCount: 80,
        origin: { x: 0, y: 0.7 }
      });

      // Confeti desde derecha
      confetti({
        ...confettiConfig,
        angle: 120,
        spread: 80,
        particleCount: 80,
        origin: { x: 1, y: 0.7 }
      });

      // Confeti adicional del centro
      confetti({
        particleCount: 50,
        spread: 120,
        startVelocity: 35,
        origin: { y: 0.6 },
        colors: ['#ff0000', '#ffff00', '#00ffff'],
        gravity: 0.5
      });

      // Confeti de estrella ocasional
      if (Math.random() > 0.7) {
        confetti({
          particleCount: 30,
          spread: 100,
          origin: { y: 0.6 },
          shapes: ['star'],
          colors: ['#FFE400', '#FFBD00', '#E89400', '#FFCA6C', '#FDFFB8'],
        });
      }

    }, 400); // Más frecuente
  }

  stopConfetti() {
    if (this.confettiInterval) {
      clearInterval(this.confettiInterval);
      this.confettiInterval = null;
    }

    // Limpiar cualquier confeti restante
    confetti.reset();
  }

  ngOnDestroy() {
    this.stopConfetti();
  }
}
//
