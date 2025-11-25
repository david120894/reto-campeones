import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeminarRegistrationFormComponent } from './seminar-registration-form.component';

describe('SeminarRegistrationFormComponent', () => {
  let component: SeminarRegistrationFormComponent;
  let fixture: ComponentFixture<SeminarRegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeminarRegistrationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeminarRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
