import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: any = null;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loadUser();
  }

  private loadUser() {
    const token = this.authService.getToken();
    if (token) {
      this.authService.getUserProfile().subscribe(response => {
        this.user = response; 
      });
    }
  }
}