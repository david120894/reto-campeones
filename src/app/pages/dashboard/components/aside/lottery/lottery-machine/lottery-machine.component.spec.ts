import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotteryMachineComponent } from './lottery-machine.component';

describe('LotteryMachineComponent', () => {
  let component: LotteryMachineComponent;
  let fixture: ComponentFixture<LotteryMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LotteryMachineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LotteryMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
