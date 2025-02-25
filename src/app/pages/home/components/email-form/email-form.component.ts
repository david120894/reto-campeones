import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservationService } from '../../../../core/services/reservation.service';
import { ActivatedRoute } from '@angular/router';

interface Room {
  title: string;
}

const NG_MODULES = [ReactiveFormsModule, CommonModule]
@Component({
  selector: 'app-email-form',
  standalone: true,
  imports: [...NG_MODULES],
  templateUrl: './email-form.component.html',
  styleUrl: './email-form.component.scss'
})
export class EmailFormComponent {
  rooms: Room[] = [
    {
      title: "MACHUPICCHU",
    },
    {
      title: "OLLANTAYTAMBO",
    },
    {
      title: "PISAQ",
    },
    {
      title: "SAQSAYHUAMÁN",
    },
    {
      title: "TIPÓN",
    },
    {
      title: "Q'ENQO",
    },
    {
      title: "PATIO PRINCIPAL",
    },
    {
      title: "PATIO PARA STANDS",
    }
  ];

  formulario: FormGroup;
  message = '';
  success = false;

  constructor(private fb: FormBuilder, private reservationService: ReservationService, private route: ActivatedRoute) {
    this.formulario = this.fb.group({
      nombres: ['', [Validators.required, Validators.maxLength(30)]],
      apellidos: ['', [Validators.required, Validators.maxLength(30)]],
      pais: ['', [Validators.required, Validators.pattern(/^\+[0-9]{1,4}$/)]],
      telefono: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      room: [''],
      mensaje: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const selectedRoom = params['room'];
      if (selectedRoom) {
        this.formulario.patchValue({ room: selectedRoom });
      }
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      this.reservationService.sendReservation(this.formulario.value).subscribe({
        next: (res) => {
          this.message = 'Registro exitoso!';
          this.success = true;
          this.formulario.reset();
          this.hideAlert();
        },
        error: (err) => {
          this.message = err.error?.error || 'Error en el registro';
          this.success = false;
          this.hideAlert();
        },
      });
    }
  }

  hideAlert() {
    setTimeout(() => {
      this.message = '';
    }, 2000); 
  }
}