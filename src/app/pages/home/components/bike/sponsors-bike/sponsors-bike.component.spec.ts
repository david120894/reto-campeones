import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorsBikeComponent } from './sponsors-bike.component';

describe('SponsorsBikeComponent', () => {
  let component: SponsorsBikeComponent;
  let fixture: ComponentFixture<SponsorsBikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SponsorsBikeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SponsorsBikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
