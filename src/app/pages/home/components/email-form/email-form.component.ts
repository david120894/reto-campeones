import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { requestStatus } from '../../../../core/models'
import { AuthService } from '../../../../core/services/auth.service'
import { PlaceService } from '../../../../core/services/place.service'
import { ReservationService } from '../../../../core/services/reservation.service'
import { RouterLink } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { ResponseRegisterModels } from '../../../../core/models/response.register.models'

const NG_MODULES = [ReactiveFormsModule, CommonModule]

@Component({
  selector: 'app-email-form',
  standalone: true,
  imports: [...NG_MODULES, RouterLink],
  templateUrl: './email-form.component.html',
  styleUrl: './email-form.component.scss',
})
export class EmailFormComponent implements OnInit {

  isModalOpen = false
  showModal: boolean = false
  imageModal: string = ''
  objectRegister: ResponseRegisterModels | null = null
  showTerms = false
  mensajeExito: string | null = null

  archivoParentalBase64: string | null = null

  formulario: FormGroup
  formTypeToggle = new FormControl(false)
  message = ''
  success = false
  status: requestStatus = 'init'
  isVisible: boolean = true
  userData: any = null
  private hideTimeout: any
  parentalPermissionRequired: boolean = false

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
        [Validators.email, Validators.maxLength(50)],
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
    })

    this.formTypeToggle.valueChanges.subscribe(
      (isReservation: boolean | null) => {
        this.updateFormValidations(isReservation ?? false)
      },
    )
  }

  formSearchDni: FormGroup = new FormGroup({
    searchDni: new FormControl(''),
  })

  get search() {
    return this.formSearchDni.controls
  }

  ngOnInit(): void {
  }

  calculateAge(event: Event): void {
    const input = event.target as HTMLInputElement
    const birthDate = new Date(input.value)
    const today = new Date()

    if (!isNaN(birthDate.getTime())) {
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      const dayDiff = today.getDate() - birthDate.getDate()

      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--
      }

      this.formulario.get('age')?.setValue(age)

      // Check if parental permission is required
      this.parentalPermissionRequired = age < 18
      if (this.parentalPermissionRequired) {
        this.formulario.get('file')?.setValidators(Validators.required);
      } else {
        this.formulario.get('file')?.clearValidators();
      }
      this.formulario.get('file')?.updateValueAndValidity();

      // Call selectCategory after setting the age
      this.selectCategory()
    } else {
      this.formulario.get('age')?.setValue(null)
      this.parentalPermissionRequired = false
    }
  }

  selectCategory(): void {
    const age = this.formulario.get('age')?.value
    const gender = this.formulario.get('gender')?.value
    console.log(this.formulario)
    if (age && gender) {
      let category = ''

      if (age >= 12 && age <= 17) {
        category = gender === 'Masculino' ? 'Categoria I' : 'Categoria II'
      } else if (age >= 18 && age <= 39) {
        category = gender === 'Masculino' ? 'Categoria III' : 'Categoria IV'
      } else if (age >= 40 && age <= 60) {
        category = gender === 'Femenino' ? 'Categoria V' : 'Categoria VI'
      } else if (age > 60) {
        category = 'Categoria VII'
      }

      this.formulario.get('category')?.setValue(category)
    }
  }

  private updateFormValidations(isReservation: boolean) {
    const controls = ['institution_name', 'event_name', 'event_date']

    controls.forEach((controlName) => {
      const control = this.formulario.get(controlName)
      if (isReservation) {
        control?.setValidators([Validators.required])
      } else {
        control?.clearValidators()
      }
      control?.updateValueAndValidity()
    })
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0]

      const reader = new FileReader()

      reader.onloadend = () => {
        this.archivoParentalBase64 = reader.result as string
        this.formulario.get('file')?.setValue(reader.result as string)
        console.log(this.archivoParentalBase64)
      }

      reader.readAsDataURL(file) // Leer como Data URL (Base64)
    }
  }

  saveRegistration() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched()
      return
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
    }
    console.log(params);
    this.reservationService.saveRegister(params).subscribe({
      next: (response) => {
        console.log(response)
        this.objectRegister = response
        const nameImg = this.objectRegister.qrCode.image
        this.formulario.reset()

        this.mensajeExito = 'Se guardó correctamente'
        setTimeout(() => {
          this.mensajeExito = null
        }, 3000)

        this.imageModal = nameImg
        this.showModal = true
      },
      error: (err) => {
        console.error(err)
      },
    })
  }

  downloadParentalPermission() {
    const parentalPermissionUrl = 'https://taqe.cusco.gob.pe/publico/eventos/2025/hatun-phaway/anxo2.docx'
    const link = document.createElement('a')
    link.href = parentalPermissionUrl
    link.download = 'parental-permission.pdf'
    link.click()
  }

  searchByDni() {
    const dni = this.search['searchDni'].value
    console.log(dni)
    this.reservationService.searchByDni(dni).subscribe({
      next: (response) => {
        this.objectRegister = response
        this.imageModal = this.objectRegister.qrCode.image
        this.showModal = true
        this.formSearchDni.reset()
        this.closeModal()
      },
      error:(error) => {
        console.error('Usuario no registrado aun')
        this.mensajeExito = 'El DNI ingresado no está registrado.'
      }
    })
  }

  printModal() {
    const modalContentElement = document.querySelector('.modal-content')

    if (modalContentElement) {
      const clonedContent = modalContentElement.cloneNode(true) as HTMLElement

      const noPrintElements = clonedContent.querySelectorAll('.no-print')
      noPrintElements.forEach(el => el.remove())

      const originalContent = document.body.innerHTML

      document.body.innerHTML = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif
              text-align: center
              margin: 0
              padding: 0
              height: 100vh
              display: flex
              flex-direction: column
              justify-content: center
              align-items: center
            }
            img {
              max-width: 300px
              margin-bottom: 20px
              display: block
            }
            h5 {
              margin: 8px 0
              font-size: 16px
            }
            .content-wrapper {
              text-align: center
            }
          </style>
        </head>
        <body>
          <div class="content-wrapper">
            ${clonedContent.innerHTML}
          </div>
        </body>
      </html>
    `

      window.print()

      setTimeout(() => {
        document.body.innerHTML = originalContent
        window.location.reload()
      }, 1000)
    }
  }

  openModal() {
    this.isModalOpen = true
  }

  closeModal() {
    this.isModalOpen = false
  }

  closeModalPrint() {
    this.showModal = false
  }
}
