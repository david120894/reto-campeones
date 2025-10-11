import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-new-register',
  imports: [
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './new-register.component.html',
  styleUrl: './new-register.component.scss'
})
export class NewRegisterComponent implements OnInit{
  constructor() {}
  parentalPermissionRequired: boolean = false;
  formGroupRegister: FormGroup = new FormGroup({
    name: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    dni: new FormControl(),
    phone: new FormControl(),
    gender: new FormControl(),
    birthDate: new FormControl(),
    district: new FormControl(),
    age: new FormControl(),
    emergencyContact: new FormControl(),
    healthInsurance: new FormControl(),
    medicalInfo: new FormControl(),
    shirtSize: new FormControl(),
    category: new FormControl(),
    parentalPermission: new FormControl(),
    parentDetails: new FormControl(),
  });

  ngOnInit() {}

  calculateAge(event: Event): void {
    const input = event.target as HTMLInputElement;
    const birthDate = new Date(input.value);
    const today = new Date();

    if (!isNaN(birthDate.getTime())) {
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();

      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
      }

      this.formGroupRegister.get('age')?.setValue(age);

      // Check if parental permission is required
      this.parentalPermissionRequired = age < 18;

      // Call selectCategory after setting the age
      this.selectCategory();
    } else {
      this.formGroupRegister.get('age')?.setValue(null);
      this.parentalPermissionRequired = false;
    }
  }
  selectCategory(): void {
    const age = this.formGroupRegister.get('age')?.value;
    const gender = this.formGroupRegister.get('gender')?.value;

    if (age && gender) {
      let category = '';

      if (age >= 12 && age <= 17) {
        category = gender === 'Masculino' ? 'Categoria I' : 'Categoria II';
      } else if (age >= 18 && age <= 39) {
        category = gender === 'Masculino' ? 'Categoria III' : 'Categoria IV';
      } else if (age >= 40 && age <= 60) {
        category = gender === 'Femenino' ? 'Categoria V' : 'Categoria VI';
      } else if (age > 60) {
        category = 'Categoria VII';
      }

      // Update the 'category' form control
      this.formGroupRegister.get('category')?.setValue(category);
    }
  }
}
