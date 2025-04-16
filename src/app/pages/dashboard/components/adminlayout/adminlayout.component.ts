import { Component, OnInit } from '@angular/core';
import { DatepickerComponent } from '../partials/datepicker/datepicker.component';
import { ProfileComponent } from "../partials/profile/profile.component";
import { DatadashboardComponent } from "../partials/datadashboard/datadashboard.component";
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';

const NG_DECLARATIONS = [
  DatepickerComponent, 
  ProfileComponent, 
  DatadashboardComponent];


const NG_MODULES = [
  CommonModule
]

@Component({
  selector: 'app-adminlayout',
  imports: [...NG_DECLARATIONS, ...NG_MODULES],
  templateUrl: './adminlayout.component.html',
  styleUrl: './adminlayout.component.scss'
})
export class AdminlayoutComponent implements OnInit {
  isAdmin: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.checkAdminStatus();
  }

  private checkAdminStatus() {
    // Suscribirse al usuario actual
    this.authService.getUser().subscribe((user) => {
      this.isAdmin = this.authService.isAdmin();
      // Si no hay usuario cargado y está autenticado, obtener el perfil
      if (this.authService.isAuthenticated() && !user) {
        this.authService.getUserProfile().subscribe();
      }
    });
  }
}
