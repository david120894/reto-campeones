import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreModule } from '../../../core/core.module';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    CoreModule
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

}
