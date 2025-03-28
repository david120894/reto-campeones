
import { AfterViewInit, Component, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { AsideComponent } from './components/aside/aside.component';
import { NavComponent } from './components/nav/nav.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

declare function initFlowbite(): void;

const NG_DECLARATIONS = [AsideComponent, NavComponent];
const NG_MODULES = [RouterOutlet];

@Component({
  selector: 'app-dashboard',
  imports: [...NG_DECLARATIONS, ...NG_MODULES],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  private popstateListener: (() => void) | null = null;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeFlowbite();

      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.initializeFlowbite();
        }
      });

      // Solo agregar el event listener en el navegador
      this.popstateListener = () => {
        setTimeout(() => this.initializeFlowbite(), 100);
      };
      window.addEventListener('popstate', this.popstateListener);
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId) && this.popstateListener) {
      window.removeEventListener('popstate', this.popstateListener);
    }
  }

  private initializeFlowbite(): void {
    if (isPlatformBrowser(this.platformId) && typeof initFlowbite === 'function') {
      initFlowbite();
    }
  }
}