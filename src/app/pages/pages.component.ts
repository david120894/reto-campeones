import { Component, Input, OnInit } from '@angular/core'
import { HeaderComponent } from '../core/components/header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../core/components/footer/footer.component';
import { Observable } from 'rxjs';
import { LoadingService } from '../core/services/loading.service';
import { AsyncPipe, NgIf } from '@angular/common';

const NG_MODULES = [RouterModule];
const DECLARATIONS = [HeaderComponent, FooterComponent];

@Component({
  selector: 'app-pages',
  imports: [...NG_MODULES, ...DECLARATIONS, AsyncPipe, NgIf],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss',
})
export class PagesComponent implements OnInit{
  @Input() typeSection!: string;

  loading$: Observable<boolean>;

  constructor(private loadingService: LoadingService) {
    this.loading$ = this.loadingService.loading$;
  }

  ngOnInit(): void {
    console.log(this.typeSection);
  }
}

