import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

const NG_MODULES = [ReactiveFormsModule, CommonModule]

@Component({
  selector: 'app-login',
  imports: [...NG_MODULES],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  message = '';
  showMessage = false;

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
          this.message = 'Inicio de sesión exitoso';
          this.showMessage = true;
          this.loginForm.reset();
          setTimeout(() => {
            this.showMessage = false;
            this.navigateToDashboard();
          }, 2000);
        },
        error: (err) => {
          this.message = 'No existe el usuario o sus credenciales son incorrectas';
          this.showMessage = true;
          this.loginForm.reset();
          setTimeout(() => this.showMessage = false, 3000);
        }
      });
    }
  }

  navigateToDashboard() {
    this.router.navigate(['/auth/dashboard']); 
  }

  navigateToRegister() {
    this.router.navigate(['/auth/register']); 
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
