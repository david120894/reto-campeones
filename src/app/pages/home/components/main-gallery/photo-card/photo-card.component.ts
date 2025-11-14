import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core'
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
export class PhotoCardComponent implements OnChanges {
  @Input() photo!: Photo;
  @Output() photoClick = new EventEmitter<string>();

  isLoading: boolean = true;
  imageError: boolean = false;
  imageSrc: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['photo']) {
      // Resetear estado cuando cambia la foto
      this.isLoading = true;
      this.imageError = false;

      // Forzar recarga de la imagen añadiendo timestamp
      this.imageSrc = this.photo.url + '?t=' + new Date().getTime();
    }
  }

  onImageLoad(): void {
    this.isLoading = false;
  }

  onImageError(): void {
    this.isLoading = false;
    this.imageError = true;
  }

  onClick(): void {
    if (!this.isLoading && !this.imageError) {
      this.photoClick.emit(this.photo.url);
    }
  }
}
