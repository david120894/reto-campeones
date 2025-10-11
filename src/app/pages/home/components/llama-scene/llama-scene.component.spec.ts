import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlamaSceneComponent } from './llama-scene.component';

describe('LlamaSceneComponent', () => {
  let component: LlamaSceneComponent;
  let fixture: ComponentFixture<LlamaSceneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LlamaSceneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LlamaSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
