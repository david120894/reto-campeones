import { Component, OnInit, signal } from '@angular/core'
import { Router } from '@angular/router'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { DatePipe, NgForOf, NgIf } from '@angular/common'
import { RouterLink } from '@angular/router'
import { ReservationService } from '../../../../../core/services/reservation.service'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'

interface SeminarResponse {
  dni: string
  name: string
  lastName: string
  createAt: string
  qrCode: {
    image: string
    message: string
    error: any
    success: boolean
  }
}

@Component({
  selector: 'app-seminar-registration-form',
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    NgForOf,
    RouterLink,
    DatePipe,
  ],
  templateUrl: './seminar-registration-form.component.html',
  styleUrls: ['./seminar-registration-form.component.scss'],
})
export class SeminarRegistrationFormComponent implements OnInit {
  loading = signal(false)
  showSuccessModal = signal(false)
  seminarResponse = signal<SeminarResponse | null>(null)
  qrImageUrl: SafeUrl = ''
  isRegistrationClosed = signal(false)

  constructor(
    private seminarService: ReservationService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  navigateToSeminar() {
    this.router.navigate(['/main/seminar']);
  }

  formSeminar: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    dni: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{8}$')]),
    birthDate: new FormControl(null, [Validators.required]),
    age: new FormControl({ value: null, disabled: true }),
    gender: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{9}$')]),
    academicDegree: new FormControl(null, [Validators.required]),
    profession: new FormControl(null, [Validators.required]),
    workplace: new FormControl(null, [Validators.required]),
  })

  genders = [
    { value: 'M', label: 'Masculino' },
    { value: 'F', label: 'Femenino' },
  ]

  modalities = [
    { value: 'presential', label: 'Presencial' },
    { value: 'hybrid', label: 'Híbrido' },
  ]

  participant = [
    { value: 'organizer', label: 'Organizador' },
    { value: 'participant', label: 'Participante' },
    { value: 'speaker', label: 'Ponente' }
  ]

  ngOnInit() {
    this.formSeminar.get('birthDate')?.valueChanges.subscribe(birthDate => {
      this.calculateAge(birthDate)
    })
  }

  getDniErrorMessage(): string {
    const dniControl = this.formSeminar.get('dni')
    if (dniControl?.hasError('required')) {
      return 'El DNI es requerido'
    } else if (dniControl?.hasError('pattern')) {
      return 'El DNI debe tener exactamente 8 dígitos numéricos'
    }
    return ''
  }

  getPhoneErrorMessage(): string {
    const phoneControl = this.formSeminar.get('phone')
    if (phoneControl?.hasError('required')) {
      return 'El teléfono es requerido'
    } else if (phoneControl?.hasError('pattern')) {
      return 'El teléfono debe tener exactamente 9 dígitos numéricos'
    }
    return ''
  }

  onPhoneInput(event: any) {
    const input = event.target
    const value = input.value.replace(/[^0-9]/g, '')
    input.value = value
    this.formSeminar.get('phone')?.setValue(value)
  }

  onDniInput(event: any) {
    const input = event.target
    const value = input.value.replace(/[^0-9]/g, '')
    input.value = value
    this.formSeminar.get('dni')?.setValue(value)
  }

  calculateAge(birthDate: string) {
    if (birthDate) {
      const today = new Date()
      const birth = new Date(birthDate)
      let age = today.getFullYear() - birth.getFullYear()
      const monthDiff = today.getMonth() - birth.getMonth()
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--
      }
      this.formSeminar.get('age')?.setValue(age)
    } else {
      this.formSeminar.get('age')?.setValue(null)
    }
  }

  onSubmit() {
    if (this.formSeminar.valid) {
      this.formSeminar.get('age')?.enable()
      const formData = this.formSeminar.value
      this.formSeminar.get('age')?.disable()

      this.loading.set(true)
      this.seminarService.saveSeminar(formData).subscribe({
        next: (res: SeminarResponse) => {
          this.loading.set(false)
          this.seminarResponse.set(res)
          this.qrImageUrl = this.sanitizer.bypassSecurityTrustUrl(res.qrCode.image)
          this.showSuccessModal.set(true)
          this.resetForm()
        },
        error: (err: any) => {
          this.loading.set(false)
          if (err.status === 409) {
            alert('El DNI ya se encuentra registrado')
          } else if (err.status === 400) {
            this.isRegistrationClosed.set(true)
          }
        }
      })
    } else {
      this.markAllFieldsAsTouched()
    }
  }

  markAllFieldsAsTouched() {
    Object.keys(this.formSeminar.controls).forEach(field => {
      const control = this.formSeminar.get(field)
      control?.markAsTouched()
    })
  }

  hasError(controlName: string, errorType: string): boolean {
    const control = this.formSeminar.get(controlName)
    return control?.touched && control?.hasError(errorType) || false
  }

  resetForm() {
    this.formSeminar.reset()
    this.formSeminar.get('age')?.disable()
  }

  getAgeText(): string {
    const age = this.formSeminar.get('age')?.value
    if (age === null || age === undefined) {
      return 'Edad'
    }
    return `${age} años`
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  closeModal() {
    this.showSuccessModal.set(false)
    this.seminarResponse.set(null)
  }

  printRegistration() {
    const printContent = document.getElementById('printable-content')
    if (printContent) {
      const originalContents = document.body.innerHTML
      const printContents = printContent.innerHTML

      document.body.innerHTML = printContents
      window.print()
      document.body.innerHTML = originalContents
      window.location.reload()
    }
  }

  downloadQRCode() {
    if (this.seminarResponse()) {
      const link = document.createElement('a')
      link.href = this.seminarResponse()!.qrCode.image
      link.download = `QR-${this.seminarResponse()!.dni}-${this.seminarResponse()!.lastName}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }
}
