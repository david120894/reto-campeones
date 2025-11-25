import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { NgIf } from '@angular/common'
interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  institucion: string;
  cargo: string;
  publicoTarget: string;
  experiencia: string;
  aceptaTerminos: boolean;
}

@Component({
  selector: 'app-seminar-registration-form',
  imports: [
    FormsModule,
    NgIf,
  ],
  templateUrl: './seminar-registration-form.component.html',
  styleUrl: './seminar-registration-form.component.scss'
})
export class SeminarRegistrationFormComponent {
  formData: FormData = {
    nombre: "",
    email: "",
    telefono: "",
    institucion: "",
    cargo: "",
    publicoTarget: "",
    experiencia: "",
    aceptaTerminos: false,
  };

  submitted = false;

  onSubmit() {
    // Aquí puedes agregar la lógica para enviar los datos a tu backend
    console.log('Datos del formulario:', this.formData);

    this.submitted = true;

    // Resetear el formulario después de 3 segundos
    setTimeout(() => {
      this.submitted = false;
      this.resetForm();
    }, 3000);
  }

  private resetForm() {
    this.formData = {
      nombre: "",
      email: "",
      telefono: "",
      institucion: "",
      cargo: "",
      publicoTarget: "",
      experiencia: "",
      aceptaTerminos: false,
    };
  }}
