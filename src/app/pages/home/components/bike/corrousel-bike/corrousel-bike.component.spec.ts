import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrouselBikeComponent } from './corrousel-bike.component';

describe('CorrouselBikeComponent', () => {
  let component: CorrouselBikeComponent;
  let fixture: ComponentFixture<CorrouselBikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorrouselBikeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorrouselBikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
