import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatadashboardComponent } from './datadashboard.component';

describe('DatadashboardComponent', () => {
  let component: DatadashboardComponent;
  let fixture: ComponentFixture<DatadashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatadashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatadashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
