import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { NgForOf, NgIf } from '@angular/common'

@Component({
  selector: 'app-seminar-registration-form',
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    NgForOf,
  ],
  templateUrl: './seminar-registration-form.component.html',
  styleUrl: './seminar-registration-form.component.scss',
})
export class SeminarRegistrationFormComponent implements OnInit {

  formSeminar: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    dni: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{8}$')]),
    birthDate: new FormControl(null, [Validators.required]),
    age: new FormControl({ value: null, disabled: true }), // Campo calculado
    gender: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{9}$')]),
    academicDegree: new FormControl(null, [Validators.required]),
    profession: new FormControl(null, [Validators.required]),
    workplace: new FormControl(null, [Validators.required]),
    modality: new FormControl(null, [Validators.required]),
    dateStart: new FormControl(null, [Validators.required]),
  })

  // Opciones para los select
  genders = [
    { value: 'M', label: 'Masculino' },
    { value: 'F', label: 'Femenino' },
  ]

  modalities = [
    { value: 'presential', label: 'Presencial' },
    { value: 'hybrid', label: 'Híbrido' },
  ]

  ngOnInit() {
    // Suscribirse a cambios en la fecha de nacimiento
    this.formSeminar.get('birthDate')?.valueChanges.subscribe(birthDate => {
      this.calculateAge(birthDate)
    })
  }

  // Método para obtener mensajes de error específicos para DNI
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
    const value = input.value.replace(/[^0-9]/g, '') // Remover caracteres no numéricos
    input.value = value
    this.formSeminar.get('phone')?.setValue(value)
  }

  // Método para prevenir entrada no numérica
  onDniInput(event: any) {
    const input = event.target
    const value = input.value.replace(/[^0-9]/g, '') // Remover caracteres no numéricos
    input.value = value
    this.formSeminar.get('dni')?.setValue(value)
  }

  calculateAge(birthDate: string) {
    if (birthDate) {
      const today = new Date()
      const birth = new Date(birthDate)

      let age = today.getFullYear() - birth.getFullYear()
      const monthDiff = today.getMonth() - birth.getMonth()

      // Ajustar si aún no ha pasado el mes de cumpleaños este año
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
      // Habilitar el campo age temporalmente para obtener su valor
      this.formSeminar.get('age')?.enable()
      const formData = this.formSeminar.value
      this.formSeminar.get('age')?.disable()

      console.log('Formulario enviado:', formData)
      // Aquí tu lógica de envío
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
}
