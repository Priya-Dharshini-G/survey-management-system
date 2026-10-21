import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewSurvey } from './preview-survey';

describe('PreviewSurvey', () => {
  let component: PreviewSurvey;
  let fixture: ComponentFixture<PreviewSurvey>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewSurvey],
    }).compileComponents();

    fixture = TestBed.createComponent(PreviewSurvey);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
