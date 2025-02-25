import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';


const NG_MODULES = [ReactiveFormsModule, CommonModule]

@Component({
  selector: 'app-register',
  imports: [...NG_MODULES],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  message = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      role: ['user', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(10), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
      password_confirmation: ['', [Validators.required]],
    });
  }

  register() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (res) => this.message = 'Registro exitoso!',
        error: (err) => this.message = err.error.error || 'Error en el registro',
      });
    }
  }
}
