import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

const NG_MODULES = [RouterLink, RouterLinkActive];

@Component({
  selector: 'app-nav',
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {
  user: any = null;
  userPrefix: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUser();
  }

  private loadUser() {
    const token = this.authService.getToken();
    if (token) {
      this.authService.getUserProfile().subscribe(response => {
        this.user = response;
        this.userPrefix = response?.name?.toUpperCase() || '';
      });
    }
  }


  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.authService.removeToken();
        this.authService.removeRefreshToken()
        this.authService.removeUser();
        this.user = null;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al cerrar sesión:', err);
        this.authService.removeToken();
        this.user = null;
        this.router.navigate(['/']);
      }
    });
  }
}
