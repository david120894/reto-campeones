import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sections-subtitles',
  standalone: true,
  imports: [],
  templateUrl: './sections-subtitles.component.html',
  styleUrl: './sections-subtitles.component.scss'
})
export class SectionsSubtitlesComponent {
  @Input() smallText: string = '';
  @Input() bigText: string = '';
}
