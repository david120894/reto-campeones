import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { requestStatus } from '../../../../core/models';
import { Place } from '../../../../core/models/place';
import { AuthService } from '../../../../core/services/auth.service';
import { PlaceService } from '../../../../core/services/place.service';
import { ReservationService } from '../../../../core/services/reservation.service';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

const NG_MODULES = [ReactiveFormsModule, CommonModule];

@Component({
  selector: 'app-email-form',
  standalone: true,
  imports: [...NG_MODULES, RouterLink],
  templateUrl: './email-form.component.html',
  styleUrl: './email-form.component.scss',
})
export class EmailFormComponent implements OnInit {
  showTerms = false;
  mensajeExito: string | null = null;

  archivoParentalBase64: string | null = null;

  places: Place[] = [];
  formulario: FormGroup;
  formTypeToggle = new FormControl(false);
  message = '';
  success = false;
  status: requestStatus = 'init';
  isVisible: boolean = true;
  userData: any = null;
  private hideTimeout: any;
  parentalPermissionRequired: boolean = false;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private placeService: PlaceService,
    private authService: AuthService,
  ) {
    this.formulario = this.fb.group({
      dni: ['', [Validators.required, Validators.maxLength(87)]],
      name: ['', [Validators.required, Validators.maxLength(30)]],
      lastName: ['', [Validators.required, Validators.maxLength(30)]],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('[0-9]+'),
          Validators.minLength(6),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(50)],
      ],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      birthDate: ['', Validators.required],
      district: ['', Validators.required],
      category: ['', Validators.required],
      emergencyContact: ['', Validators.required],
      healthInsurance: ['', Validators.required],
      medicalInfo: ['', Validators.required],
      shirtSize: ['', Validators.required],
      file: [''],
      parentDetails: [''],
      underage: [false],
      auxUnderage: [''],
      termsAndConditions: [false, Validators.requiredTrue],
    });

    this.formTypeToggle.valueChanges.subscribe(
      (isReservation: boolean | null) => {
        this.updateFormValidations(isReservation ?? false);
      },
    );
  }

  ngOnInit(): void {
    this.placeService.getPlaces().subscribe((places) => {
      this.places = places;
      this.formWithUserData();
    });
    // this.getUnderage()
  }

  getUnderage() {
    const aux = this.formulario.get('underage')?.value;
    console.log(aux);
    if (aux === 'Si') {
      this.parentalPermissionRequired = true;
    } else {
      this.parentalPermissionRequired = false;
    }
  }

  calculateAge(event: Event): void {
    const input = event.target as HTMLInputElement;
    const birthDate = new Date(input.value);
    const today = new Date();

    if (!isNaN(birthDate.getTime())) {
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();

      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
      }

      this.formulario.get('age')?.setValue(age);

      // Check if parental permission is required
      this.parentalPermissionRequired = age < 18;

      // Call selectCategory after setting the age
      this.selectCategory();
    } else {
      this.formulario.get('age')?.setValue(null);
      this.parentalPermissionRequired = false;
    }
  }

  selectCategory(): void {
    const age = this.formulario.get('age')?.value;
    const gender = this.formulario.get('gender')?.value;
    console.log(this.formulario);
    if (age && gender) {
      let category = '';

      if (age >= 12 && age <= 17) {
        category = gender === 'Masculino' ? 'Categoria I' : 'Categoria II';
      } else if (age >= 18 && age <= 39) {
        category = gender === 'Masculino' ? 'Categoria III' : 'Categoria IV';
      } else if (age >= 40 && age <= 60) {
        category = gender === 'Femenino' ? 'Categoria V' : 'Categoria VI';
      } else if (age > 60) {
        category = 'Categoria VII';
      }

      this.formulario.get('category')?.setValue(category);
    }
  }

  private formWithUserData(): void {
    const token = this.authService.getToken();
    if (token && this.authService.isAuthenticated()) {
      this.authService.getUser().subscribe({
        next: (response) => {
          this.userData = response;
          if (this.userData && this.userData.email) {
            this.formulario.patchValue({
              email: this.userData.email,
            });
          }
        },
        error: (err) =>
          console.error('Error al obtener datos del usuario:', err),
      });
    }
  }

  private updateFormValidations(isReservation: boolean) {
    const controls = ['institution_name', 'event_name', 'event_date'];

    controls.forEach((controlName) => {
      const control = this.formulario.get(controlName);
      if (isReservation) {
        control?.setValidators([Validators.required]);
      } else {
        control?.clearValidators();
      }
      control?.updateValueAndValidity();
    });
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      const reader = new FileReader();

      reader.onloadend = () => {
        this.archivoParentalBase64 = reader.result as string;
        this.formulario.get('file')?.setValue(reader.result as string);
        console.log(this.archivoParentalBase64);
      };

      reader.readAsDataURL(file); // Leer como Data URL (Base64)
    }
  }

  saveRegistration() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const params = {
      age: this.formulario.get('age')?.value,
      birthDate: this.formulario.get('birthDate')?.value,
      category: this.formulario.get('category')?.value,
      district: this.formulario.get('district')?.value,
      dni: this.formulario.get('dni')?.value,
      email: this.formulario.get('email')?.value,
      emergencyContact: this.formulario.get('emergencyContact')?.value,
      file: this.formulario.get('file')?.value,
      gender: this.formulario.get('gender')?.value,
      healthInsurance: this.formulario.get('healthInsurance')?.value,
      lastName: this.formulario.get('lastName')?.value,
      medicalInfo: this.formulario.get('medicalInfo')?.value,
      name: this.formulario.get('name')?.value,
      parentDetails: this.formulario.get('parentDetails')?.value,
      phone: this.formulario.get('phone')?.value,
      shirtSize: this.formulario.get('shirtSize')?.value,
      termsAndConditions: this.formulario.get('termsAndConditions')?.value,
      underage: this.formulario.get('underage')?.value,
    };
    console.log(params);
    this.mensajeExito = 'Aun no esta disponible';
    this.formulario.reset();
    setTimeout(() => {
      this.mensajeExito = null;
    }, 3000);
    // this.reservationService.saveRegister(params).subscribe({
    //   next: (response) => {
    //     this.mensajeExito = 'Se guardó correctamente';
    //     this.formulario.reset();
    //     setTimeout(() => {
    //       this.mensajeExito = null;
    //     }, 3000); // Oculta el mensaje después de 3 segundos
    //   },
    //   error: (err) => {
    //     // Puedes también mostrar un mensaje de error si quieres
    //   },
    // });


  }

  onSubmit() {
    this.getUnderage();
    const authTokenToSend = this.authService.getToken();
    /*
    if (!authTokenToSend) {
      console.warn('Usuario no logueado. No se puede realizar la reserva.');
      this.message = 'Debe iniciar sesión para realizar una reserva.';
      this.status = 'failed';
      this.isVisible = true;
      this.hideAlert();
      return;
    }
*/
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
      type: isReservation ? 'reservation' : 'consultation',
    };

    const formData = isReservation
      ? {
        ...formDataBase,
        institution_name: formValue.institution_name,
        event_name: formValue.event_name,
        event_date: formValue.event_date,
        place: formValue.place,
        req_state: formValue.req_state,
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
      },
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
      req_state: 'pending',
    });
  }

  downloadParentalPermission() {
    const parentalPermissionUrl = 'https://taqe.cusco.gob.pe/publico/eventos/2025/hatun-phaway/anxo2.docx';
    const link = document.createElement('a');
    link.href = parentalPermissionUrl;
    link.download = 'parental-permission.pdf';
    link.click();
  }

  protected readonly Event = Event;
}
