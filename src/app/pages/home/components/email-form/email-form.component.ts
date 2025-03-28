import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ReservationService } from '../../../../core/services/reservation.service';
import { Place } from '../../../../core/models/place';
import { PlaceService } from '../../../../core/services/place.service';
import {
  RequestState,
  requestStatus,
  User
} from '../../../../core/models';
import { AuthService } from '../../../../core/services/auth.service';

const NG_MODULES = [
  ReactiveFormsModule,
  CommonModule
]

@Component({
  selector: 'app-email-form',
  standalone: true,
  imports: [...NG_MODULES],
  templateUrl: './email-form.component.html',
  styleUrl: './email-form.component.scss'
})
export class EmailFormComponent implements OnInit {

  places: Place[] = [];
  formulario: FormGroup;
  formTypeToggle = new FormControl(false);
  message = '';
  success = false;
  status: requestStatus = 'init';
  isVisible: boolean = true;
  userData: any = null;
  private hideTimeout: any;

  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private placeService: PlaceService,
    private authService: AuthService
  ) {
    this.formulario = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      surnames: ['', [Validators.required, Validators.maxLength(30)]],
      country: ['', [Validators.required, Validators.pattern(/^\+[0-9]{1,4}$/)]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      message: ['', Validators.required],
      institution_name: [''],
      event_name: [''],
      event_date: [''],
      place: [''],
      req_state: ['pending' as RequestState]
    });

    this.formTypeToggle.valueChanges.subscribe((isReservation: boolean | null) => {
      this.updateFormValidations(isReservation ?? false);
    });
  }

  ngOnInit(): void {
    this.placeService.getPlaces().subscribe(places => {
      this.places = places;
      this.formWithUserData()
    });
  }

  private formWithUserData(): void {
    const token = this.authService.getToken();
    if (token && this.authService.isAuthenticated()) {
      this.authService.getUser().subscribe({
        next: (response) => {
          this.userData = response;
          if (this.userData && this.userData.email) {
            this.formulario.patchValue({
              email: this.userData.email
            });
          }
        },
        error: (err) => console.error('Error al obtener datos del usuario:', err)
      });
    }
  }

  private updateFormValidations(isReservation: boolean) {
    const controls = ['institution_name', 'event_name', 'event_date'];

    controls.forEach(controlName => {
      const control = this.formulario.get(controlName);
      if (isReservation) {
        control?.setValidators([Validators.required]);
      } else {
        control?.clearValidators();
      }
      control?.updateValueAndValidity();
    });
  }

  onSubmit() {
    const authTokenToSend = this.authService.getToken()

    if (!authTokenToSend) {
      console.warn('Usuario no logueado. No se puede realizar la reserva.');
      this.message = 'Debe iniciar sesión para realizar una reserva.';
      this.status = 'failed';
      this.isVisible = true;
      this.hideAlert();
      return;
    }

    this.isVisible = true;
    this.status = 'loading';
    const isReservation = this.formTypeToggle.value;
    const formValue = this.formulario.value;

    // form to "consultation"
    const formDataBase = {
      name: formValue.name.toUpperCase(),
      surnames: formValue.surnames.toUpperCase(),
      country: formValue.country,
      phone: formValue.phone,
      email: formValue.email,
      message: formValue.message,
      type: isReservation ? 'reservation' : 'consultation'
    };

    const formData = isReservation
      ? {
        ...formDataBase,
        institution_name: formValue.institution_name,
        event_name: formValue.event_name,
        event_date: formValue.event_date,
        place: formValue.place,
        req_state: formValue.req_state
      }
      : formDataBase;

    this.reservationService.sendReservation(formData).subscribe({
      next: () => {
        this.message = isReservation
          ? 'Reserva enviada exitosamente. Verifique su email.'
          : 'Consulta enviada exitosamente. Verifique su email.';
        this.status = 'success';
        this.hideAlert();
        this.formulario.reset();
        this.formTypeToggle.setValue(false);
        this.formulario.patchValue({ req_state: 'pending' });
      },
      error: (err) => {
        this.message = err.error?.error || 'Error al procesar la solicitud';
        this.status = 'failed';
        this.hideAlert();
      }
    });
  }

  hideAlert() {
    setTimeout(() => {
      this.message = '';
      this.isVisible = false;
      this.status = 'init';
    }, 3000);
  }

  resetData() {
    this.formulario.patchValue({
      institution_name: '',
      event_name: '',
      event_date: '',
      place: '',
      req_state: 'pending'
    });
  }
}

