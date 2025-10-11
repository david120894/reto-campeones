import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingService } from './core/services/loading.service';
import { Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { NgParticlesModule } from 'ng-particles'

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    AsyncPipe,
    NgIf,
    NgParticlesModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gdur';
loading$: Observable<boolean>;

constructor(private loadingService: LoadingService) {
  this.loading$ = this.loadingService.loading$;
}
}
