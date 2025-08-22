import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryInterNeighborhoodComponent } from './gallery-inter-neighborhood.component';

describe('GalleryInterNeighborhoodComponent', () => {
  let component: GalleryInterNeighborhoodComponent;
  let fixture: ComponentFixture<GalleryInterNeighborhoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleryInterNeighborhoodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalleryInterNeighborhoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
