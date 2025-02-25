import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

const NG_MODULES = [ReactiveFormsModule, CommonModule]

@Component({
  selector: 'app-login',
  imports: [
    ...NG_MODULES
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  message = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(10), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          if (res && res.token) {  // 🔹 Verificamos si el token existe
            localStorage.setItem('token', res.token);
            this.router.navigate(['/auth/dashboard']);
          } else {
            this.message = 'Error: No se recibió un token.';
          }
        },
        error: (err) => {
          console.error('Error en login:', err);
          this.message = err.error?.error || 'Error en el inicio de sesión';
        }
      });
    }
  } 
}
