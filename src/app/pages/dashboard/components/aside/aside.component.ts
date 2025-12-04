import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core'
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router'
import { AuthService } from '../../../../core/services/auth.service';
import { NgIf } from '@angular/common'

const NG_MODULES = [RouterLink, RouterLinkActive]

@Component({
  selector: 'app-aside',
  imports: [NG_MODULES, NgIf],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss'
})
export class AsideComponent implements OnInit {
  isAdmin: boolean = false;
  isSidebarHidden = false;

  sidebarOpen = true; // Controla si el sidebar está abierto/cerrado (móviles)
  sidebarExpanded = true; // Controla si está expandido/contraído (todos los dispositivos)

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.checkAdminStatus();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && window.innerWidth < 640) {
        this.sidebarOpen = false;
      }
    });

    // Estado inicial basado en tamaño de pantalla
    this.checkScreenSize();
  }

  private checkAdminStatus() {
    this.authService.getUser().subscribe((user) => {
      this.isAdmin = this.authService.isAdmin();
    });
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    const isMobile = window.innerWidth < 640;

    if (isMobile) {
      // En móviles, sidebar cerrado por defecto
      this.sidebarOpen = false;
      this.sidebarExpanded = true; // Siempre expandido en móviles cuando se abre
    } else {
      // En escritorio, sidebar abierto por defecto
      this.sidebarOpen = true;
    }
  }

  toggleSidebar() {
    // Para móviles: abrir/cerrar completamente
    this.sidebarOpen = !this.sidebarOpen;

    // Si se abre en móvil, asegurar que esté expandido
    if (this.sidebarOpen && window.innerWidth < 640) {
      this.sidebarExpanded = true;
    }
  }

  toggleSidebarExpand() {
    // Para escritorio: expandir/contraer
    this.sidebarExpanded = !this.sidebarExpanded;
  }

  // Método para controlar ambos estados
  handleSidebarAction() {
    const isMobile = window.innerWidth < 640;

    if (isMobile) {
      this.toggleSidebar();
    } else {
      this.toggleSidebarExpand();
    }
  }
}
