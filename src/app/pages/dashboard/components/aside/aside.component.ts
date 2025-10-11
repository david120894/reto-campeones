import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

const NG_MODULES = [RouterLink, RouterLinkActive]

@Component({
  selector: 'app-aside',
  imports: [NG_MODULES],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss'
})
export class AsideComponent implements OnInit {
  isAdmin: boolean = false;

  constructor(
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.checkAdminStatus();
  }

  private checkAdminStatus() {
    this.authService.getUser().subscribe((user) => {
      this.isAdmin = this.authService.isAdmin();
    });
  }
}
