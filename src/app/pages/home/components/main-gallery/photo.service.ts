// services/photo.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// models/photo.model.ts
export interface Photo {
  id: string;
  url: string;
  alt: string;
  category?: string;
}

export interface Category {
  id: string;
  label: string;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private categories: Category[] = [
    { id: 'football-men', label: 'Fútbol Varones', icon: '⚽' },
    { id: 'football-primary', label: 'Fútbol Primaria', icon: '⚽' },
    { id: 'football-secondary', label: 'Fútbol Secundaria', icon: '⚽' },
    { id: 'volleyball', label: 'Vóley', icon: '🏐' },
  ];

  getCategories(): Category[] {
    return this.categories;
  }

  generateMockPhotos(category: string): Observable<Photo[]> {
    const baseUrls: Record<string, string[]> = {
      'football-men': [
        '/children/ajedrez.jpg',
        '/children/ajedrezMujeres.webp',
        'https://images.unsplash.com/photo-1689308271305-58e75832289b?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        '/children/football-training.png',
        '/children/soccer-team-formation.jpg',
        '/children/football-match-evening.jpg',
        '/children/soccer-players-jumping.jpg',
        '/children/football-goalkeeper-save.jpg',
        '/children/soccer-players-passing.jpg',
        '/children/football-match-scoreboard.jpg',
        '/children/soccer-celebration-fans.jpg',
        '/children/football-training-drill.jpg',
        '/children/soccer-stadium-crowd.png',
        '/children/football-players-warming-up.jpg',
        '/children/soccer-ball-action-shot.jpg',
        '/children/placeholder.jpg',
      ],
      'football-primary': [
        '/children/placeholder.jpg',
        '/children/primary-football-clinic.jpg',
        '/children/elementary-tournament-final.jpg',
        // ... más URLs
      ],
      'football-secondary': [
        '/children/placeholder.jpg',
        // ... más URLs
      ],
      'volleyball': [
        '/children/placeholder.jpg',
        // ... más URLs
      ],
    };

    const urls = baseUrls[category] || baseUrls['football-men'];
    const photos: Photo[] = Array.from({ length: 50 }, (_, i) => ({
      id: `${category}-${i}`,
      url: urls[i % urls.length],
      alt: `Foto deportiva ${i + 1} - ${this.getCategoryName(category)}`,
      category: category
    }));

    return of(photos);
  }

  private getCategoryName(categoryId: string): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.label : 'Deportes';
  }
}
