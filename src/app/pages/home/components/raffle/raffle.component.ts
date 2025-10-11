import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipantsService } from '../../../../core/services/participants.service'
import { ParticipantsModel } from '../../../../core/models/participants.model'

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-raffle',
  templateUrl: './raffle.component.html',
  styleUrls: ['./raffle.component.scss'],
})
export class RaffleComponent implements OnInit {

  showWinners = false
  errorMessage = ''
  currentWinner:ParticipantsModel | null = null
  ganadora: any = null;
  showConfetti = false;

  confettiArray = Array.from({ length: 1000 }, () => this.createConfetti());

  balls: any[] = [];
  allBalls = Array.from({ length: 50 }, (_, i) => ({ label: (i + 1).toString() }));

  constructor(private readonly participantsService: ParticipantsService) {
  }

  ngOnInit() {
  }

  getRandomColor(): string {
    const colors = ['#e74c3c', '#3498db', '#f1c40f', '#9b59b6', '#1abc9c', '#ff4081', '#ff6347', '#2ecc71'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  createConfetti() {
    const left = Math.random() * 100; // porcentaje ancho pantalla
    const delay = Math.random() * 10; // delay para que caigan desfasados
    const duration = 3 + Math.random() * 3; // duración variable
    const size = 5 + Math.random() * 10; // tamaño confeti
    const color = this.getRandomColor();
    const rotate = Math.random() * 360;

    return {
      style: {
        left: `${left}vw`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        transform: `rotate(${rotate}deg)`,
      },
    };
  }

  sortear() {
    this.balls = [];
    this.ganadora = null;
    this.showConfetti = false;

    this.allBalls.forEach((ball, index) => {
      setTimeout(() => {
        const sideForce = Math.random() > 0.5 ? 1 : -1;
        const horizontalSpread = 50 + Math.random() * 300;
        const verticalForce = 100 + Math.random() * 300;
        const gravity = 50 + Math.random() * 300;
        const rotation = (Math.random() * 360) * (sideForce > 0 ? 1 : -1);
        const duration = 1 + Math.random() * 2;
        const color = this.getRandomColor();

        const spreadX = sideForce * horizontalSpread;
        const spreadYUp = -verticalForce;
        const spreadYDown = gravity;
        const rot = rotation;

        const style = {
          '--spreadX': `${spreadX}`,
          '--spreadY-up': `${spreadYUp}`,
          '--spreadY-down': `${spreadYDown}`,
          '--rotation': `${rot}`,
          '--duration': `${duration}s`,
          animationDelay: `${index * 0.1}s`,
          backgroundColor: color,
        };

        this.balls.push({
          label: ball.label,
          style: style,
        });

        if (index === this.allBalls.length - 1) {
          const totalTime = index * 100 + duration * 1000 + 200;
          setTimeout(() => {
            const translateX = 1.1 * spreadX;
            const translateY = spreadYUp + spreadYDown;
            this.ganadora = {
              label: `🎉 ${ball.label}`,
              style: {
                backgroundColor: color,
                position: 'absolute',
                bottom: '50%',
                left: 'calc(50% - 30px)',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight: 'bold',
                color: 'white',
                text: 'Ganador',
                zIndex: 10,
                transform: `translate(${translateX}px, ${translateY}px) rotate(${rot}deg) scale(1)`,
                animation: 'none',
              },
            };

            this.balls = [];

            // Mostrar confetti por 5 segundos
            this.showConfetti = true;
            // setTimeout(() => this.showConfetti = false, 20000);

          }, totalTime);
        }
      }, index * 100);
    });
  }

  ganador: { categoria: string; nombre: string; dni: string } | null = null;
  showWinnerModal = false;

  onGanadoraClick() {
    // this.participantsService.getWinner().subscribe({
    //   next: (winner: ParticipantsModel) => {
    //     if (winner) {
    //       this.showWinners = true
    //       this.currentWinner = winner
    //       this.showWinner()
    //     }
    //   } ,
    //   error: (err) => {
    //     if (err.status === 404) {
    //       this.showWinners = false
    //       this.errorMessage="No tenemos ganador"
    //     }
    //     // this.sshowWinners = true
    //   }
    // })
    // this.showWinnerModal = true;
  }
  showWinner() {
    this.ganador = {
      categoria: this.currentWinner?.category as string,
      nombre: `${ this.currentWinner?.name} ${this.currentWinner?.lastName }`,
      dni: this.currentWinner?.dni as string,
    };
  }

  cerrarModal() {
    this.showWinnerModal = false;
  }
}
