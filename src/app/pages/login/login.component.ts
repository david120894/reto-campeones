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
  isLoading = false;
  loginForm: FormGroup;
  message = '';
  showMessage = false;

  // [Validators.required, Validators.email, Validators.minLength(10), Validators.maxLength(50)]
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  get groupLogin() {
    return this.loginForm.controls;
  }

  login() {
    this.isLoading = true;
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          if (res) {
            this.isLoading = false;
            this.message = 'Inicio de sesión exitoso';
            this.showMessage = true;
            this.loginForm.reset();
            this.navigateToDashboard();
          } else {
            this.isLoading = false;
            this.message = 'No existe el usuario o sus credenciales son incorrectas';
            this.showMessage = true;
            this.loginForm.reset();
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.message = 'No existe el usuario o sus credenciales son incorrectas';
          this.showMessage = true;
          this.loginForm.reset();
        }, complete: () => {
          this.isLoading = false;
        }
      });
    }
  }

  navigateToDashboard() {
    this.router.navigate(['auth/dashboard/participants']);
  }

  navigateToRegister() {
    this.router.navigate(['/auth/register']);
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
