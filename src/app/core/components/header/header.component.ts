import { Component, Input, OnInit } from '@angular/core'
import { Router, RouterLink, RouterLinkActive } from '@angular/router'
import { initFlowbite } from 'flowbite'
import { AuthService } from '../../services/auth.service'
import { IUserInfo } from '../../models/userInfo.model'


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {

  @Input() typeSection: string = ''

  user: IUserInfo | null = null
  userPrefix: string = ''
  isAuth: boolean = false

  constructor(
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    initFlowbite()
    this.loadUser()
    this.userAutenticate()
  }

  private loadUser() {
    const token = this.authService.getToken()
    if (token) {
      this.authService.getUserProfile().subscribe(response => {
        this.user = response
        this.userPrefix = response?.name?.slice(0, 3).toUpperCase() || ''
      })
    }
  }

  private userAutenticate() {
    const Auth = this.authService.isAuthenticated()
    if (Auth === true) {
      this.isAuth = true
    }
  }

  scrollToHome() {
    const homeSection = document.getElementById('first-view')
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  scrollTablePositions() {
    const tablePositions = document.getElementById('table-positions')
    if (tablePositions) {
      tablePositions.scrollIntoView({ behavior: 'smooth' })
    }
  }

  scrollSeminarCourses() {
    const tablePositions = document.getElementById('seminar-courses')
    if (tablePositions) {
      tablePositions.scrollIntoView({ behavior: 'smooth' })
    }
  }

  scrollSeminarBenefits() {
    const tablePositions = document.getElementById('seminar-benefits')
    if (tablePositions) {
      tablePositions.scrollIntoView({ behavior: 'smooth' })
    }
  }

  scrollSeminarInscriptions() {
    const tablePositions = document.getElementById('seminar-inscriptions')
    if (tablePositions) {
      tablePositions.scrollIntoView({ behavior: 'smooth' })
    }
  }

  scrollSeminarContact() {
    const tablePositions = document.getElementById('seminar-contact')
    if (tablePositions) {
      tablePositions.scrollIntoView({ behavior: 'smooth' })
    }
  }

  scrollToService() {
    const serviceSection = document.getElementById('home')
    if (serviceSection) {
      serviceSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  scrollToGallery() {
    const gallerySection = document.getElementById('services')
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  scrollToAbout() {
    const aboutSection = document.getElementById('nosotros')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  scrollToContacts() {
    const contactSection = document.getElementById('fixture')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  scrollRegister() {
    const registerSection = document.getElementById('discipline')
    if (registerSection) {
      registerSection.scrollIntoView({ behavior: 'smooth' })
    }
  }
}
