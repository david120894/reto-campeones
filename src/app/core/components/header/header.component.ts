import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Dropdown, Collapse  } from 'flowbite';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const dropdownToggleButton = document.getElementById('dropdownMenuIconHorizontalButton');
      const dropdownMenu = document.getElementById('dropdownDotsHorizontal');

      if (dropdownToggleButton && dropdownMenu) {
        new Dropdown(dropdownMenu, dropdownToggleButton);
      }
    }

    if (isPlatformBrowser(this.platformId)) {
      const menuButton = document.querySelector('[data-collapse-toggle="navbar-sticky"]') as HTMLElement;
      const menu = document.getElementById('navbar-sticky') as HTMLElement;

      if (menuButton && menu) {
        new Collapse(menu, menuButton);
      }
    }
  }
}
