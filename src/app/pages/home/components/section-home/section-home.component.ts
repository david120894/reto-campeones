import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, NgIf } from '@angular/common';
import { ResponseRegisterModels } from '../../../../core/models/response.register.models';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ReservationService } from '../../../../core/services/reservation.service';

@Component({
  selector: 'app-section-home',
  imports: [
    RouterLink,
    DatePipe,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './section-home.component.html',
  styleUrl: './section-home.component.scss',
})
export class SectionHomeComponent implements OnInit {

  isModalOpen = false;
  imageModal: string = '';
  showModal = false;
  objectRegister: ResponseRegisterModels | null = null;
  mensajeExito: string | null = null;


  formSearchDni: FormGroup = new FormGroup({
    searchDni: new FormControl(''),
  });

  constructor(private reservationService: ReservationService) {
  }

  get search() {
    return this.formSearchDni.controls;
  }

  ngOnInit() {
  }

  scrollToEmail() {
    const emailSection = document.getElementById('email');
    if (emailSection) {
      emailSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToContacts() {
    const emailSection = document.getElementById('contacts');
    if (emailSection) {
      emailSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  searchByDni() {
    const dni = this.search['searchDni'].value;
    console.log(dni);
    this.reservationService.searchByDni(dni).subscribe({
      next: (response) => {
        this.objectRegister = response;
        this.imageModal = this.objectRegister.qrCode.image;
        this.showModal = true;
        this.formSearchDni.reset();
        this.closeModal();
      },
      error: (error) => {
        console.error('Usuario no registrado aun');
        this.mensajeExito = 'El DNI ingresado no está registrado.';
      },
    });
  }

  printModal() {
    const modalContentElement = document.querySelector('.modal-content');

    if (modalContentElement) {
      const clonedContent = modalContentElement.cloneNode(true) as HTMLElement;

      const noPrintElements = clonedContent.querySelectorAll('.no-print');
      noPrintElements.forEach(el => el.remove());

      const originalContent = document.body.innerHTML;

      document.body.innerHTML = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              text-align: center;
              margin: 0;
              padding: 0;
              height: 100vh;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
            img {
              max-width: 300px;
              margin-bottom: 20px;
              display: block;
            }
            h5 {
              margin: 8px 0;
              font-size: 16px;
            }
            .content-wrapper {
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="content-wrapper">
            ${clonedContent.innerHTML}
          </div>
        </body>
      </html>
    `;

      window.print();

      setTimeout(() => {
        document.body.innerHTML = originalContent;
        window.location.reload();
      }, 1000);
    }
  }


  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  closeModalPrint() {
    this.showModal = false;
  }

}
