import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsefulVacationsComponent } from './useful-vacations.component';

describe('UsefulVacationsComponent', () => {
  let component: UsefulVacationsComponent;
  let fixture: ComponentFixture<UsefulVacationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsefulVacationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsefulVacationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
