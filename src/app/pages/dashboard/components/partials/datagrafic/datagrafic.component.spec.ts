import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatagraficComponent } from './datagrafic.component';

describe('DatagraficComponent', () => {
  let component: DatagraficComponent;
  let fixture: ComponentFixture<DatagraficComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatagraficComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatagraficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
