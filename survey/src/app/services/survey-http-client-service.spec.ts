import { TestBed } from '@angular/core/testing';

import { SurveyHttpClientService } from './survey-http-client-service';

describe('SurveyHttpClientService', () => {
  let service: SurveyHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
