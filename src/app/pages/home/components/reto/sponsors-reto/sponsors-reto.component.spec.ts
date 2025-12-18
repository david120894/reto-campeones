import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorsRetoComponent } from './sponsors-reto.component';

describe('SponsorsRetoComponent', () => {
  let component: SponsorsRetoComponent;
  let fixture: ComponentFixture<SponsorsRetoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SponsorsRetoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SponsorsRetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
