import { Injectable } from '@angular/core';
import { AsyncValidatorFn } from '@angular/forms';
import { delay, map } from 'rxjs';
import { SurveyHttpClientService } from './survey-http-client-service';

@Injectable({
  providedIn: 'root',
})
export class EmailAsyncValidatorService {
  /**
   * @param http holds the HttpClient class instance.
   */
  constructor(private surveyHttp: SurveyHttpClientService) {}
  /**
   * Method which is used to check if the email is exists.
   */
  validate(): AsyncValidatorFn {
    return (control) => {
      return this.surveyHttp.checkEmail(control.value).pipe(
        delay(1000),
        map((res: any) => (res.data.isExists ? { emailExists: true } : null)),
      );
    };
  }
}
