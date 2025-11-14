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
  @Output() photoClick = new EventEmitter<string>();

  isLoading: boolean = true;
  imageError: boolean = false;

  onImageLoad(): void {
    this.isLoading = false;
  }

  onImageError(): void {
    this.isLoading = false;
    this.imageError = true;
  }

  onClick(): void {
    this.photoClick.emit(this.photo.url);
  }
}
