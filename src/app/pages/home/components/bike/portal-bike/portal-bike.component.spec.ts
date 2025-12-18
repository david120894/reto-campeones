import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalBikeComponent } from './portal-bike.component';

describe('PortalBikeComponent', () => {
  let component: PortalBikeComponent;
  let fixture: ComponentFixture<PortalBikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalBikeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortalBikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
