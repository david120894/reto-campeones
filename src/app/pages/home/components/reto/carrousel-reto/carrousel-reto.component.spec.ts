import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrouselRetoComponent } from './carrousel-reto.component';

describe('CarrouselRetoComponent', () => {
  let component: CarrouselRetoComponent;
  let fixture: ComponentFixture<CarrouselRetoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarrouselRetoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrouselRetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
