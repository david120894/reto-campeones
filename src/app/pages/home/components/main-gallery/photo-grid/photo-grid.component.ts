import { Component, EventEmitter, Input, Output } from '@angular/core'
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
export class PhotoGridComponent {
  @Input() photos: Photo[] = [];
  @Output() photoClick = new EventEmitter<string>();

  visibleCount: number = 12;
  isLoading: boolean = false;

  get visiblePhotos(): Photo[] {
    return this.photos.slice(0, this.visibleCount);
  }

  get hasMore(): boolean {
    return this.visibleCount < this.photos.length;
  }

  ngOnChanges(): void {
    // Reset pagination when photos change
    this.visibleCount = 12;
  }

  loadMore(): void {
    this.isLoading = true;

    setTimeout(() => {
      this.visibleCount = Math.min(this.visibleCount + 12, this.photos.length);
      this.isLoading = false;
    }, 300);
  }
}
