import { Component } from '@angular/core';
import { ResponseRegisterModels } from '../../../../core/models/response.register.models'
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { requestStatus } from '../../../../core/models'
import { HttpClient } from '@angular/common/http'
import { AuthService } from '../../../../core/services/auth.service'
import { PlaceService } from '../../../../core/services/place.service'
import { ReservationService } from '../../../../core/services/reservation.service'
import { DatePipe, NgClass, NgIf } from '@angular/common'
import { RouterLink } from '@angular/router'
import { jsPDF } from 'jspdf';


@Component({
  selector: 'app-user-register',
  imports: [
    DatePipe,
    NgIf,
    NgClass,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.scss'
})
export class UserRegisterComponent {

  isSave   = false
  isModalOpen = false
  showModal = false
  imageModal = ''
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

      if (age < 18) {
        this.formulario.get('file')?.setValidators([Validators.required])
      }
      // Check if parental permission is required
      this.parentalPermissionRequired = age < 18

      // Call selectCategory after setting the age
      // this.selectCategory()
    } else {
      this.formulario.get('age')?.setValue(null)
      this.parentalPermissionRequired = false
    }
  }

  selectCategory(): void {
    const age = this.formulario.get('age')?.value
    const gender = this.formulario.get('gender')?.value
    if (age && gender) {
      let category = ''
      if (age >= 12) {
        category = gender === 'Masculino' ? 'Categoria I' : 'Categoria II'
      } else if (age >= 8 && age <= 11) {
        category = gender === 'Masculino' ? 'Categoria II' : 'Categoria III'
      } else {
        category = gender === 'Femenino' ? 'Categoria III' : 'Categoria III'
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

  nombreArchivo: string | null = null;

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.nombreArchivo = file.name; // 👈 Guardamos el nombre para mostrarlo

      if (file.type === 'application/pdf') {
        const reader = new FileReader();
        reader.onloadend = () => {
          const pdfBase64 = reader.result as string;
          this.archivoParentalBase64 = pdfBase64;
          this.formulario.get('file')?.setValue(pdfBase64);

          if (file.size > 2 * 1024 * 1024) {
            alert('El PDF supera los 2MB, por favor suba un archivo más ligero.');
          }
        };
        reader.readAsDataURL(file);
      } else if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageBase64 = reader.result as string;
          const img = new Image();
          img.src = imageBase64;

          img.onload = () => {
            const pdf = new jsPDF({
              orientation: img.width > img.height ? 'l' : 'p',
              unit: 'px',
              format: [600, 800]
            });

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            let imgWidth = img.width;
            let imgHeight = img.height;

            if (imgWidth > pageWidth) {
              imgHeight = (pageWidth / imgWidth) * imgHeight;
              imgWidth = pageWidth;
            }
            if (imgHeight > pageHeight) {
              imgWidth = (pageHeight / imgHeight) * imgWidth;
              imgHeight = pageHeight;
            }

            pdf.addImage(img, 'JPEG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
            const pdfBlob = pdf.output('blob');

            const pdfBase64Promise = new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result as string);
              reader.readAsDataURL(pdfBlob);
            });

            pdfBase64Promise.then((pdfBase64) => {
              this.archivoParentalBase64 = pdfBase64;
              this.formulario.get('file')?.setValue(pdfBase64);

              if (pdfBlob.size > 4 * 1024 * 1024) {
                alert('El archivo convertido supera los 4MB, intenta con una imagen más ligera.');
              }
            });
          };
        };
        reader.readAsDataURL(file);
      } else {
        alert('Solo se aceptan imágenes o archivos PDF.');
        this.nombreArchivo = null;
      }
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault(); // Previene el comportamiento por defecto
    event.stopPropagation(); // Evita conflictos con Safari
    this.saveRegistration(); // Llama a tu método original
  }

  saveRegistration() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched()
      return
    }
    this.isSave = true
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
    this.reservationService.saveRegister(params).subscribe({
      next: (response) => {
        this.isSave = false
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
        this.isSave = false
        console.error(err)
      },
      complete: () => {
        this.isSave = false
      }
    })
  }

  downloadParentalPermission() {
    const parentalPermissionUrl = 'https://taqe.cusco.gob.pe/publico/web/campeonato/autorizacion-anexo2(2).docx'
    const link = document.createElement('a')
    link.href = parentalPermissionUrl
    link.download = 'parental-permission.pdf'
    link.click()
  }

  searchByDni() {
    const dni = this.search['searchDni'].value
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

  abrirCamara(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment'; // abre cámara trasera
    input.onchange = (event: any) => this.onFileSelected(event);
    input.click();
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
