import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-titles',
  standalone: true,
  imports: [],
  templateUrl: './titles.component.html',
  styleUrl: './titles.component.scss'
})
export class TitlesComponent {
  @Input() smallText: string = '';
  @Input() bigText: string = '';
}
