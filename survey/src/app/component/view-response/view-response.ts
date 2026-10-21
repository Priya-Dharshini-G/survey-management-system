import { Component, signal } from '@angular/core';
import { SurveyHttpClientService } from '../../services/survey-http-client-service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-response',
  imports: [],
  templateUrl: './view-response.html',
  styleUrl: './view-response.sass',
})
export class ViewResponse {
  /**
   * Variable which is used to store observables.
   */
  subscription: Subscription = new Subscription();
  /**
   * Variable which is used to store the survey responses.
   */
  public responses = signal<any>([]);
  /**
   * @param route holds the ActivatedRoute class instance.
   * @param surveyHttp holds the SurveyHttpClientService class instance.
   */
  constructor(
    private route: ActivatedRoute,
    private surveyHttp: SurveyHttpClientService,
  ) {}
  /**
   * Component life cycle hook.
   */
  ngOnInit() {
    this.route.params.subscribe((res: any) => {
      if (res && res.id) {
        this.subscription.add(
          this.surveyHttp.getSurveyResponse({ id: res.id }).subscribe({
            next: (res: any) => {
              if (res && res.success && res.data) {
                this.responses.set(res.data);
                this.responses().forEach((item: any) => {
                  item.questions.forEach((question: any) => {
                    if (question.answer !== null) {
                      if (question.type === 'select-one') {
                        const index = question.options.findIndex(
                          (x: any) => x.id === Number(question.answer),
                        );
                        if (index != -1) {
                          question.options[index].isSelected = true;
                        }
                      }
                      if (question.type === 'select-multiple') {
                        String(question.answer)
                          .split(',')
                          .forEach((y: any) => {
                            const index = question.options.findIndex(
                              (x: any) => x.id === Number(y),
                            );
                            if (index != -1) {
                              question.options[index].isSelected = true;
                            }
                          });
                      }
                    }
                  });
                });
                console.log(this.responses());
              }
            },
            error: (err: HttpErrorResponse) => {
              console.log(err.error.message);
            },
          }),
        );
      }
    });
  }
  /**
   * Component life cycle hook.
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
