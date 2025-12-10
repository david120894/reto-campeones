import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeminarAttendanceComponent } from './seminar-attendance.component';

describe('SeminarAttendanceComponent', () => {
  let component: SeminarAttendanceComponent;
  let fixture: ComponentFixture<SeminarAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeminarAttendanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeminarAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
