import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { PhotoCardComponent } from '../photo-card/photo-card.component'
import { Photo } from '../photo.service'
import { NgForOf, NgIf } from '@angular/common'

@Component({
  selector: 'app-photo-grid',
  imports: [
    PhotoCardComponent,
    NgIf,
    NgForOf,
  ],
  templateUrl: './photo-grid.component.html',
  styleUrl: './photo-grid.component.scss'
})
// photo-grid.component.ts
export class PhotoGridComponent {
  @Input() photos: Photo[] = [];
  @Output() photoClick = new EventEmitter<string>();

  visibleCount: number = 15;
  isLoading: boolean = false;
  loadingPhotos: number[] = []; // Array para trackear fotos en carga

  get visiblePhotos(): Photo[] {
    return this.photos.slice(0, this.visibleCount);
  }

  get hasMore(): boolean {
    return this.visibleCount < this.photos.length;
  }

  ngOnChanges(): void {
    this.visibleCount = 15;
    this.loadingPhotos = []; // Reset loading al cambiar fotos
  }

  loadMore(): void {
    this.isLoading = true;

    // Simular carga de nuevas fotos
    const currentCount = this.visibleCount;
    const newPhotosCount = Math.min(15, this.photos.length - this.visibleCount);
    this.simulatePhotoLoading(currentCount, newPhotosCount);

    setTimeout(() => {
      this.visibleCount = Math.min(this.visibleCount + 15, this.photos.length);
      this.isLoading = false;
      // No limpiar loadingPhotos aquí, las tarjetas individuales manejan su propio estado
    }, 300);
  }

  private simulatePhotoLoading(startIndex: number, count: number): void {
    this.loadingPhotos = Array.from({length: count}, (_, i) => startIndex + i);
  }

  isPhotoLoading(index: number): boolean {
    return this.loadingPhotos.includes(index);
  }
}
