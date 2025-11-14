import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightBoxModalComponent } from './light-box-modal.component';

describe('LightBoxModalComponent', () => {
  let component: LightBoxModalComponent;
  let fixture: ComponentFixture<LightBoxModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LightBoxModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LightBoxModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
