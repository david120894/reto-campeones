import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalSeminarComponent } from './portal-seminar.component';

describe('PortalSeminarComponent', () => {
  let component: PortalSeminarComponent;
  let fixture: ComponentFixture<PortalSeminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalSeminarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortalSeminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
