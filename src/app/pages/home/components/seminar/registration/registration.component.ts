import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { NgForOf, NgIf } from '@angular/common'

@Component({
  selector: 'app-registration',
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgForOf,
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  submitted = false;

  disciplinas: { [key: string]: { [key: string]: string[] } } = {
    "6-9": {
      CULTURAL: ["Ballet", "Música Canto", "Dibujo, Pintura y Manualidad"],
      DEPORTIVO: ["Fútbol", "Vóley", "Ajedrez", "Karate", "Básquet", "Gimnasia Rítmica", "Atletismo", "Ciclismo"],
      "DE DESARROLLO": ["Mini Periodistas", "Mini Guía de Turismo", "Mini Científicos"],
    },
    "10-12": {
      CULTURAL: ["Danza Contemporánea (Marinera)", "Música Canto", "Dibujo, Pintura y Manualidad"],
      DEPORTIVO: ["Fútbol", "Vóley", "Ajedrez", "Karate", "Básquet", "Gimnasia Rítmica", "Atletismo", "Ciclismo"],
      "DE DESARROLLO": ["Robótica"],
    },
    "13-16": {
      CULTURAL: ["Danza Urbana", "Música Canto", "Dibujo, Pintura y Manualidad"],
      DEPORTIVO: ["Fútbol", "Vóley", "Ajedrez", "Karate", "Básquet", "Gimnasia Rítmica", "Atletismo", "Ciclismo"],
      "DE DESARROLLO": ["Robótica"],
    },
  };

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      edad: ['', Validators.required],
      grupoEdad: ['', Validators.required],
      categoria: ['', Validators.required],
      disciplina: ['', Validators.required],
      padre: ['', Validators.required],
      aceptaTerminos: [false, Validators.requiredTrue]
    });

    // Watch for grupoEdad changes
    this.registrationForm.get('grupoEdad')?.valueChanges.subscribe(() => {
      this.registrationForm.patchValue({ categoria: '', disciplina: '' });
    });

    // Watch for categoria changes
    this.registrationForm.get('categoria')?.valueChanges.subscribe(() => {
      this.registrationForm.patchValue({ disciplina: '' });
    });
  }

  get availableDisciplinas(): string[] {
    const grupoEdad = this.registrationForm.get('grupoEdad')?.value;
    const categoria = this.registrationForm.get('categoria')?.value;

    if (grupoEdad && categoria) {
      return this.disciplinas[grupoEdad]?.[categoria] || [];
    }
    return [];
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.submitted = true;
      setTimeout(() => {
        this.submitted = false;
        this.registrationForm.reset();
      }, 3000);
    }
  }
}
