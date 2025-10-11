import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../pages/login/components/footer/footer.component';
import { HeaderComponent } from '../pages/login/components/header/header.component';

const NG_MODULES = [RouterModule];
@Component({
  selector: 'app-shared',
  imports: [...NG_MODULES],
  templateUrl: './shared.component.html',
  styleUrl: './shared.component.scss'
})
export class SharedComponent {

}
