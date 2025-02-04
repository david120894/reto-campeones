import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreModule } from './core/core.module';
import { HomeModule } from './pages/home/home.module';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    CoreModule,
    HomeModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gdur';
}
