// pages/gallery/gallery.component.ts
import { Component, OnInit } from '@angular/core';
import { Category, Photo, PhotoService } from '../../main-gallery/photo.service'
import { HeaderComponent } from '../../main-gallery/header/header.component'
import { CategoryTabsComponent } from '../../main-gallery/category-tabs/category-tabs.component'
import { PhotoGridComponent } from '../../main-gallery/photo-grid/photo-grid.component'
import { LightBoxModalComponent } from '../../main-gallery/light-box-modal/light-box-modal.component'
import { NgIf } from '@angular/common'

@Component({
  selector: 'app-gallery',
  imports: [
    HeaderComponent,
    CategoryTabsComponent,
    PhotoGridComponent,
    LightBoxModalComponent,
    NgIf,
  ],
  templateUrl: './gallery.component.html',
  // styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit {
  categories: Category[] = [];
  activeCategory: string = '';
  photos: Photo[] = [];
  selectedPhoto: string | null = null;
  lightboxOpen: boolean = false;

  constructor(private photoService: PhotoService) {}

  ngOnInit(): void {
    this.categories = this.photoService.getCategories();
    this.activeCategory = this.categories[0].id;
    this.loadPhotos();
  }

  onCategoryChange(categoryId: string): void {
    this.activeCategory = categoryId;
    this.loadPhotos();
  }

  onPhotoClick(photoUrl: string): void {
    this.selectedPhoto = photoUrl;
    this.lightboxOpen = true;
  }

  onLightboxClose(): void {
    this.lightboxOpen = false;
    this.selectedPhoto = null;
  }

  private loadPhotos(): void {
    this.photoService.generateMockPhotos(this.activeCategory).subscribe({
      next: (photos) => {
        this.photos = photos;
      },
      error: (error) => {
        console.error('Error loading photos:', error);
      }
    });
  }
}
