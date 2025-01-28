import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsSubtitlesComponent } from './sections-subtitles.component';

describe('SectionsSubtitlesComponent', () => {
  let component: SectionsSubtitlesComponent;
  let fixture: ComponentFixture<SectionsSubtitlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionsSubtitlesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionsSubtitlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
