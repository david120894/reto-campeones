import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  user: any = null;
  userPrefix: string = '';
  isAuth: boolean = false;

  constructor(
    private authService: AuthService,
  ){}

  ngOnInit(): void {
    initFlowbite();
    this.loadUser();
    this.userAutenticate();
  }

  private loadUser(){
    const token = this.authService.getToken();
    if (token) {
      this.authService.getUserProfile().subscribe(response => {
        this.user = response;
        this.userPrefix = response?.name?.slice(0, 3).toUpperCase() || '';
      });
    }
  }

  private userAutenticate(){
    const Auth = this.authService.isAuthenticated();
    if (Auth === true){
      this.isAuth = true;
    }
  }

  scrollToHome() {
    const homeSection = document.getElementById('first-view');
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToService() {
    const serviceSection = document.getElementById('gallery');
    if (serviceSection) {
      serviceSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToGallery() {
    const gallerySection = document.getElementById('services');
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToAbout() {
    const aboutSection = document.getElementById('nosotros');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToContacts() {
    const contactSection = document.getElementById('contacts');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollRegister()
  {
    const registerSection = document.getElementById('register');
    if (registerSection) {
      registerSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
