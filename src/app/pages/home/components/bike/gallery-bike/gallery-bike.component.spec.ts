import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryBikeComponent } from './gallery-bike.component';

describe('GalleryBikeComponent', () => {
  let component: GalleryBikeComponent;
  let fixture: ComponentFixture<GalleryBikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleryBikeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalleryBikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
