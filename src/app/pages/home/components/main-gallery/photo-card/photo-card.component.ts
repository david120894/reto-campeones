import { Component, EventEmitter, Input, Output } from '@angular/core'
import { NgIf } from '@angular/common'
import { Photo } from '../photo.service'

@Component({
  selector: 'app-photo-card',
  imports: [
    NgIf,
  ],
  templateUrl: './photo-card.component.html',
  styleUrl: './photo-card.component.scss'
})
export class PhotoCardComponent {
  @Input() photo!: Photo;
  @Input() isLoading: boolean = true; // Estado desde el grid (para nuevas fotos)
  @Output() photoClick = new EventEmitter<string>();

  imageLoaded: boolean = false; // Estado interno de carga de imagen
  imageError: boolean = false;

  get showLoading(): boolean {
    return this.isLoading || !this.imageLoaded;
  }

  onImageLoad(): void {
    this.imageLoaded = true;
  }

  onImageError(): void {
    this.imageLoaded = true;
    this.imageError = true;
  }

  onClick(): void {
    if (this.imageLoaded && !this.imageError) {
      this.photoClick.emit(this.photo.url);
    }
  }
}
