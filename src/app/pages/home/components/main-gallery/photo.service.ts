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
    { id: 'football-primary', label: 'Fútbol Primaria', icon: '⚽' },
    { id: 'football-secondary', label: 'Fútbol Secundaria', icon: '⚽' },
    { id: 'volleyball-primary', label: 'Vóley Primaria', icon: '🏐' },
    { id: 'volleyball-secondary', label: 'Vóley Secondary', icon: '🏐' },
    { id: 'chess', label: 'Ajedrez', icon: '♟️' }
  ];

  getCategories(): Category[] {
    return this.categories;
  }

  generateMockPhotos(category: string): Observable<Photo[]> {
    const baseUrls: Record<string, string[]> = {
      'football-primary': [
        'https://taqe.cusco.gob.pe/publico/web/deporte/FP/FP1.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FP/FP2.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FP/FP3.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FP/FP4.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FP/FP5.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FP/FP6.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FP/FP7.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FP/FP8.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FP/FP9.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FP/FP10.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FP/FP11.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FP/FP12.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FP/FP13.jpg'
      ],
      'football-secondary': [
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS1.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS2.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS3.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS4.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS5.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS6.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS7.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS8.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS9.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS10.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS11.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS12.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS13.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS14.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS15.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS16.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS17.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS18.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS19.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS20.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS21.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS22.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS23.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS24.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS25.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS26.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS27.jpg',
        // 'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS28.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS29.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS30.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS31.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS32.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS33.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS34.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS35.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS36.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS37.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS38.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS39.jpg',
        // 'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS40.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS41.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS42.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS43.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS44.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS45.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS46.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS47.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS48.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS49.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS50.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS51.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS52.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS53.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS54.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS55.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/FS/FS56.jpg'
      ],

      'volleyball-primary': [
        'https://taqe.cusco.gob.pe/publico/web/deporte/VP/VP1.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VP/VP2.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VP/VP3.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VP/VP4.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VP/VP5.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VP/VP6.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VP/VP7.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VP/VP8.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VP/VP9.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VP/VP10.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VP/VP11.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VP/VP12.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VP/VP13.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VP/VP14.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VP/VP15.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VP/VP16.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VP/VP17.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VP/VP18.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VP/VP19.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VP/VP20.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VP/VP21.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VP/VP22.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VP/VP23.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VP/VP24.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VP/VP25.jpg',
        // 'https://taqe.cusco.gob.pe/publico/web/deporte/VP/VP26.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VP/VP27.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VP/VP28.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VP/VP29.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VP/VP30.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VP/VP31.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VP/VP32.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VP/VP33.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VP/VP34.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VP/VP35.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VP/VP36.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VP/VP37.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VP/VP38.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VP/VP39.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VP/VP.jpg'
      ],
      'volleyball-secondary': [
        'https://taqe.cusco.gob.pe/publico/web/deporte/VS/VS1.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VS/VS2.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VS/VS3.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VS/VS4.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VS/VS5.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VS/VS6.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VS/VS7.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VS/VS8.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VS/VS9.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VS/VS10.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VS/VS11.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VS/VS12.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VS/VS13.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VS/VS14.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VS/VS15.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VS/VS16.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VS/VS17.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VS/VS18.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VS/VS19.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VS/VS20.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VS/VS21.jpg',
        // 'https://taqe.cusco.gob.pe/publico/web/deporte/VS/VS22.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VS/VS23.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VS/VS24.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VS/VS25.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VS/VS26.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VS/VS27.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VS/VS28.jpg',
        // 'https://taqe.cusco.gob.pe/publico/web/deporte/VS/VS29.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VS/VS30.jpg',
        'https://taqe.cusco.gob.pe/publico/web/deporte/VS/VS31.jpg'
      ],
      'chess': [
        'https://taqe.cusco.gob.pe/publico/web/A/A1.jpg',
        'https://taqe.cusco.gob.pe/publico/web/A/A2.jpg',
        'https://taqe.cusco.gob.pe/publico/web/A/A3.jpg',
        'https://taqe.cusco.gob.pe/publico/web/A/A4.jpg',
        'https://taqe.cusco.gob.pe/publico/web/A/A5.jpg',
        'https://taqe.cusco.gob.pe/publico/web/A/A6.jpg',
        'https://taqe.cusco.gob.pe/publico/web/A/A7.jpg',
        'https://taqe.cusco.gob.pe/publico/web/A/A8.jpg',
        'https://taqe.cusco.gob.pe/publico/web/A/A9.jpg',
        'https://taqe.cusco.gob.pe/publico/web/A/A10.jpg',
        'https://taqe.cusco.gob.pe/publico/web/A/A11.jpg',
        'https://taqe.cusco.gob.pe/publico/web/A/A12.jpg',
        'https://taqe.cusco.gob.pe/publico/web/A/A13.jpg',
        'https://taqe.cusco.gob.pe/publico/web/A/A14.jpg',
        'https://taqe.cusco.gob.pe/publico/web/A/A15.jpg',
        'https://taqe.cusco.gob.pe/publico/web/A/A16.jpg',
        'https://taqe.cusco.gob.pe/publico/web/A/A17.jpg',
        'https://taqe.cusco.gob.pe/publico/web/A/A18.jpg',
        'https://taqe.cusco.gob.pe/publico/web/A/A19.jpg',
        'https://taqe.cusco.gob.pe/publico/web/A/A20.jpg',
        'https://taqe.cusco.gob.pe/publico/web/A/A21.jpg',
        'https://taqe.cusco.gob.pe/publico/web/A/A22.jpg',
        'https://taqe.cusco.gob.pe/publico/web/A/A23.jpg',
        'https://taqe.cusco.gob.pe/publico/web/A/A24.jpg',
        'https://taqe.cusco.gob.pe/publico/web/A/A25.jpg',
        'https://taqe.cusco.gob.pe/publico/web/A/A26.jpg',
        'https://taqe.cusco.gob.pe/publico/web/A/A27.jpg',
        'https://taqe.cusco.gob.pe/publico/web/A/A28.jpg',
        'https://taqe.cusco.gob.pe/publico/web/A/A29.jpg',
        'https://taqe.cusco.gob.pe/publico/web/A/A30.jpg',
        'https://taqe.cusco.gob.pe/publico/web/A/A31.jpg',
        'https://taqe.cusco.gob.pe/publico/web/A/A32.jpg',
        'https://taqe.cusco.gob.pe/publico/web/A/A33.jpg',
        'https://taqe.cusco.gob.pe/publico/web/A/A34.jpg',
        'https://taqe.cusco.gob.pe/publico/web/A/A35.jpg',
        'https://taqe.cusco.gob.pe/publico/web/A/A36.jpg',
        'https://taqe.cusco.gob.pe/publico/web/A/A37.jpg',
        'https://taqe.cusco.gob.pe/publico/web/A/A38.jpg',
        'https://taqe.cusco.gob.pe/publico/web/A/A39.jpg',
      ]

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
