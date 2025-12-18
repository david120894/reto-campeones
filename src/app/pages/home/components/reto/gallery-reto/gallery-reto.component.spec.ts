import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryRetoComponent } from './gallery-reto.component';

describe('GalleryRetoComponent', () => {
  let component: GalleryRetoComponent;
  let fixture: ComponentFixture<GalleryRetoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleryRetoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalleryRetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
