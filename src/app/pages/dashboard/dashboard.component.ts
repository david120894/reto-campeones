
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { AsideComponent } from './components/aside/aside.component';
import { NavComponent } from './components/nav/nav.component';
import { NavigationEnd, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

declare function initFlowbite(): void;

const DECLARATIONS = [AsideComponent, NavComponent];

@Component({
  selector: 'app-dashboard',
  standalone: true, // Esto es necesario si usas Angular standalone components
  imports: [...DECLARATIONS],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements AfterViewInit {
  private popstateListener = () => {
    setTimeout(() => this.initializeFlowbite(), 100);
  };
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object // Detecta si está en el navegador
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeFlowbite();

      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.initializeFlowbite();
        }
      });
      // Detectar navegación del botón "atrás" del navegador
      window.addEventListener('popstate', this.popstateListener);
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('popstate', this.popstateListener);
  }

  private initializeFlowbite(): void {
    if (typeof initFlowbite === 'function') {
      initFlowbite();
      console.log('Flowbite initialized after navigation change');
    }
  }
}
