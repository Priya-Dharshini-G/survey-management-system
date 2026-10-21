import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyCategories } from './survey-categories';

describe('SurveyCategories', () => {
  let component: SurveyCategories;
  let fixture: ComponentFixture<SurveyCategories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyCategories],
    }).compileComponents();

    fixture = TestBed.createComponent(SurveyCategories);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
