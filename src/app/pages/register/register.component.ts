import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';


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
  showMessage = false;
  errors: any = {};

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      role: [{ value: 'user', disabled: true }],
      email: ['', [Validators.required, Validators.email, Validators.minLength(10), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
      password_confirmation: ['', [Validators.required]],
    });
  }

  register() {
    if (this.registerForm.valid) {
      const formData = {
        ...this.registerForm.getRawValue(),
        role: 'user'
      };
  
      this.authService.register(formData).subscribe({
        next: (response) => {
          this.message = 'Registro exitoso!';
          this.showMessage = true;
          // console.log("log de registro exitoso", response);
          this.registerForm.reset();
  
          setTimeout(() => {
            this.showMessage = false;
            this.navigateToLogin();
          }, 3000);
        },
        error: (err) => {
          this.errors = err;
          // console.log("error de registro", err);
          this.message = 'El usuario ya existe';
          this.showMessage = true;
          setTimeout(() => this.showMessage = false, 3000);
        }
      });
    }
  }

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
