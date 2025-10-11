import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Participant } from '../lottery.model'
import { LotteryService } from '../lottery.service'
import { NgForOf } from '@angular/common'
import { WinnerCardComponent } from '../winner-card/winner-card.component'

interface Ball {
  element: HTMLElement;
  id: number;
  participant: Participant;
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  active: boolean;
}

@Component({
  selector: 'app-lottery-machine',
  imports: [
    NgForOf,
    WinnerCardComponent,
  ],
  templateUrl: './lottery-machine.component.html',
  styleUrl: './lottery-machine.component.scss',
})
export class LotteryMachineComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('lotteryMachine') lotteryMachineRef!: ElementRef;

  participants: Participant[] = [];
  balls: Ball[] = [];
  isRunning: boolean = false;
  winner: Participant | null = null;
  showWinnerCard: boolean = false;
  private animationFrameId: number = 0;

  constructor(readonly lotteryService: LotteryService) {
  }

  ngOnInit(): void {
    this.participants = this.lotteryService.getParticipants();
  }

  ngAfterViewInit(): void {
    // Ahora sí el elemento del DOM existe
    this.createBalls();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }


  createBalls(): void {
    this.balls = [];
    const machineElement = this.lotteryMachineRef.nativeElement;

    // Limpiar máquina
    const existingBalls = machineElement.querySelectorAll('.ball');
    existingBalls.forEach((ball: HTMLElement) => ball.remove());

    this.participants.forEach((participant, index) => {
      const ballElement = document.createElement('div');
      ballElement.className = 'ball';
      ballElement.setAttribute('data-id', participant.id.toString());

      const ballContent = document.createElement('div');
      ballContent.className = 'ball-content';
      ballContent.textContent = participant.number;

      ballElement.appendChild(ballContent);
      machineElement.appendChild(ballElement);

      // Posición inicial
      const baseWidth = machineElement.offsetWidth;
      const baseHeight = 100;
      const ballSize = 50;

      const leftPosition = (baseWidth / 2) - (ballSize / 2) + (Math.random() * 40 - 20);
      const bottomPosition = baseHeight + (Math.random() * 20);

      ballElement.style.left = `${leftPosition}px`;
      ballElement.style.bottom = `${bottomPosition}px`;

      // Color aleatorio
      const hue = Math.floor(Math.random() * 360);
      ballElement.style.background = `linear-gradient(135deg, hsl(${hue}, 70%, 60%), hsl(${hue}, 70%, 40%))`;

      this.balls.push({
        element: ballElement,
        id: participant.id,
        participant: participant,
        position: { x: leftPosition, y: bottomPosition },
        velocity: { x: 0, y: 0 },
        active: true,
      });

      // Event listener para click en la bola
      ballElement.addEventListener('click', () => this.onBallClick(participant.id));
    });
  }

  startLottery(): void {
    if (this.isRunning) return;

    this.isRunning = true;
    this.winner = null;
    this.showWinnerCard = false;

    // Disparar todas las bolas
    this.balls.forEach(ball => {
      if (ball.active) {
        ball.velocity.x = (Math.random() - 0.5) * 4;
        ball.velocity.y = 10 + Math.random() * 5;
        this.animateBall(ball);
      }
    });

    // Comenzar eliminación después de 3 segundos
    setTimeout(() => {
      this.eliminateBalls();
    }, 3000);
  }

  animateBall(ball: Ball): void {
    if (!ball.active) return;

    ball.velocity.y -= 0.1;
    ball.position.x += ball.velocity.x;
    ball.position.y += ball.velocity.y;

    const machineWidth = this.lotteryMachineRef.nativeElement.offsetWidth;

    // Rebotes en bordes
    if (ball.position.x < 0 || ball.position.x > machineWidth - 50) {
      ball.velocity.x *= -0.8;
      ball.position.x = ball.position.x < 0 ? 0 : machineWidth - 50;
    }

    // Rebote en el suelo
    if (ball.position.y < 100) {
      ball.velocity.y *= -0.7;
      ball.position.y = 100;

      if (Math.abs(ball.velocity.y) < 0.5) {
        ball.velocity.y = 0;
      }
    }

    // Actualizar posición
    ball.element.style.left = `${ball.position.x}px`;
    ball.element.style.bottom = `${ball.position.y}px`;

    // Continuar animación si es necesario
    if (ball.active && (Math.abs(ball.velocity.x) > 0.1 || Math.abs(ball.velocity.y) > 0.1)) {
      this.animationFrameId = requestAnimationFrame(() => this.animateBall(ball));
    }
  }

  eliminateBalls(): void {
    if (!this.isRunning) return;

    const activeBalls = this.balls.filter(ball => ball.active);

    if (activeBalls.length > 1) {
      const randomIndex = Math.floor(Math.random() * activeBalls.length);
      const ballToRemove = activeBalls[randomIndex];

      ballToRemove.active = false;
      ballToRemove.element.style.transition = 'opacity 1s ease, transform 1s ease';
      ballToRemove.element.style.opacity = '0';
      ballToRemove.element.style.transform = 'scale(0)';

      setTimeout(() => {
        if (ballToRemove.element.parentNode) {
          ballToRemove.element.parentNode.removeChild(ballToRemove.element);
        }
      }, 1000);

      setTimeout(() => {
        this.eliminateBalls();
      }, 500);
    } else if (activeBalls.length === 1) {
      this.winner = activeBalls[0].participant;
      this.isRunning = false;

      const winnerBall = activeBalls[0].element;
      winnerBall.style.transition = 'all 0.5s ease';
      winnerBall.style.transform = 'scale(1.2)';
      winnerBall.style.boxShadow = '0 0 20px gold, 0 0 30px gold';

      this.createConfetti();
    }
  }

  createConfetti(): void {
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';

      const left = Math.random() * 100;
      confetti.style.left = `${left}%`;
      confetti.style.bottom = '0';

      const hue = Math.floor(Math.random() * 360);
      confetti.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;

      const size = 5 + Math.random() * 10;
      confetti.style.width = `${size}px`;
      confetti.style.height = `${size}px`;

      document.body.appendChild(confetti);

      const animation = confetti.animate([
        { transform: 'translateY(0) rotate(0)', opacity: 1 },
        { transform: `translateY(-${100 + Math.random() * 50}vh) rotate(${360 + Math.random() * 360}deg)`, opacity: 0 },
      ], {
        duration: 2000 + Math.random() * 2000,
        easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)',
      });

      animation.onfinish = () => {
        confetti.remove();
      };
    }
  }

  onBallClick(participantId: number): void {
    if (this.winner && this.winner.id === participantId) {
      this.showWinnerCard = true;
    }
  }

  resetLottery(): void {
    this.isRunning = false;
    this.winner = null;
    this.showWinnerCard = false;

    // Limpiar confeti
    document.querySelectorAll('.confetti').forEach(confetti => confetti.remove());

    // Recrear bolas
    this.createBalls();
  }

  onCloseWinnerCard(): void {
    this.showWinnerCard = false;
  }
}
