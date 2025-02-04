import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,CommonModule
  ],
  templateUrl: './email-form.component.html',
  styleUrl: './email-form.component.scss'
})
export class EmailFormComponent {
  formulario: FormGroup;
  
    constructor(private fb: FormBuilder) {
      this.formulario = this.fb.group({
        
        nombres: ['', Validators.required],
        apellidos: ['', Validators.required],
        telefono: ['', [Validators.required, Validators.pattern('[0-9]+')]],
        email: ['', [Validators.required, Validators.email]], 
        mensaje: ['', Validators.required]
      });
    }
  
    onSubmit() {
      if (this.formulario.valid) {
        console.log(this.formulario.value);
      }
    }
}
