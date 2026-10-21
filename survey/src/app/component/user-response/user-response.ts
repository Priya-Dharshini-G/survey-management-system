import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyHttpClientService } from '../../services/survey-http-client-service';
import { HttpErrorResponse } from '@angular/common/http';
import { formatDate, NgClass } from '@angular/common';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { email, phoneNumber } from '../../patterns';
import { MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Snackbar } from '../../shared/component/snackbar/snackbar';
import { DataService } from '../../shared/services/data-service/data-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-response',
  imports: [
    NgClass,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
  ],
  templateUrl: './user-response.html',
  styleUrl: './user-response.sass',
})
export class UserResponse {
  /**
   * Variable which is used to store observables.
   */
  subscription: Subscription = new Subscription();
  /**
   * Variable which is used to store the survey.
   */
  public survey = signal<any>({});
  /**
   * Variable which is used to store the survey questions.
   */
  public questionArr = signal<any>([]);
  /**
   * Variable which is used to store the question form values.
   */
  questionForm!: FormGroup;
  /**
   * Variable which is used to store the loading state.
   */
  isLoading = signal<boolean>(false);
  /**
   * Variable which is used to store the survey id.
   */
  surveyId!: number;
  /**
   * @param route holds the ActivatedRoute class instance.
   * @param snackbar holds the MatSnackBar class instance.
   * @param surveyHttp holds the SurveyHttpClientService class instance.
   * @param dataService holds the DataService class instance.
   */
  constructor(
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private surveyHttp: SurveyHttpClientService,
    private dataService: DataService,
  ) {}
  /**
   * Component life cycle hook.
   */
  ngOnInit() {
    this.route.params.subscribe((res: any) => {
      if (res && res.id) {
        this.surveyId = Number(this.dataService.decrptyData(res.id));
        this.subscription.add(
          this.surveyHttp.getSurvey({ id: this.surveyId }).subscribe({
            next: (res: any) => {
              if (res && res.success && res.data) {
                this.survey.set(res.data);
                this.questionArr.set(res.data.questions);
                this.formInitialize(this.survey(), this.questionArr());
                this.questionArr().forEach((item: any, index: number) => {
                  if (item.type === 'Star' || item.type === 'Number') {
                    this.getRange(item.rate, index);
                  }
                });
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
   * Method which is used to initialize the form.
   */
  formInitialize(data: any, value: any) {
    this.questionForm = new FormGroup({
      name: new FormControl(null, data.userNameReq ? [Validators.required] : null),
      email: new FormControl(
        null,
        data.emailReq
          ? [Validators.required, Validators.pattern(email)]
          : Validators.pattern(email),
      ),
      dob: new FormControl(null, data.dobReq ? [Validators.required] : null),
      phoneNo: new FormControl(
        null,
        data.phoneNoReq
          ? [Validators.required, Validators.pattern(phoneNumber)]
          : Validators.pattern(phoneNumber),
      ),
      questions: new FormArray([]),
    });
    if (value && value.length) {
      for (let i = 0; i < value.length; i++) {
        this.questions.push(
          new FormGroup({
            questionId: new FormControl(value[i].id ? value[i].id : null),
            type: new FormControl(value[i].type ? value[i].type : null),
            answer: new FormControl(
              null,
              value[i].type === 'Comment' && value[i].isrequired ? [Validators.required] : null,
            ),
            isError: new FormControl(false),
          }),
        );
      }
    }
  }
  /**
   * Method which is used to get questions form array.
   */
  get questions(): FormArray<FormGroup> {
    return this.questionForm.get('questions') as FormArray<FormGroup>;
  }
  /**
   * Method which is used to add the rating array.
   */
  getRange(range: any, index: number): any[] {
    this.questionArr()[index].rating = Array.from({ length: range }, (_, i) => ({
      option: i + 1,
      isSelected: false,
    }));
    return this.questionArr()[index].rating;
  }
  /**
   * Method which is used to get the selected rating.
   */
  selectedRating(index: number, position: number) {
    if (!this.questionArr()[index].rating[position].isSelected) {
      this.questions
        .at(index)
        .get('answer')
        ?.patchValue(position + 1);
      this.questions.at(index).get('isError')?.patchValue(false);
      this.questionArr()[index].rating.forEach((item: any) => {
        if (item.isSelected) item.isSelected = false;
      });
      for (let i = 0; i <= position; i++) {
        this.questionArr()[index].rating[i].isSelected = true;
      }
    } else {
      this.questions.at(index).get('answer')?.patchValue(position);
      if (position === 0) {
        this.questions.at(index).get('isError')?.patchValue(true);
      } else {
        this.questions.at(index).get('isError')?.patchValue(false);
      }
      for (let i = position; i < this.questionArr()[index].rate; i++) {
        if (this.questionArr()[index].rating[i].isSelected) {
          this.questionArr()[index].rating[i].isSelected = false;
        }
      }
    }
  }
  /**
   * Method which is used to get the selected number.
   */
  selectedNumber(index: number, position: number) {
    this.questions
      .at(index)
      .get('answer')
      ?.patchValue(this.survey().questions[index].rating[position].option);
    this.questions.at(index).get('isError')?.patchValue(false);
    this.questionArr()[index].rating.forEach((item: any) => {
      if (item.isSelected) item.isSelected = false;
    });
    this.questionArr()[index].rating[position].isSelected = true;
  }
  /**
   * Method which is used to get the selected options.
   */
  selectedRadio(event: any, index: number) {
    if (event.target.value) {
      this.questions.at(index).get('answer')?.patchValue(Number(event.target.value));
      this.questions.at(index).get('isError')?.patchValue(false);
    }
  }
  /**
   * Method which is used to get the selected options.
   */
  selectMultiple(event: any, index: number) {
    if (this.questions.at(index).get('answer')?.value === null) {
      this.questions.at(index).get('answer')?.patchValue([]);
      if (event.target.checked) {
        this.questions.at(index).get('answer')?.value.push(Number(event.target.value));
      }
      this.questions.at(index).get('isError')?.patchValue(false);
    } else {
      if (event.target.checked) {
        this.questions.at(index).get('answer')?.value.push(Number(event.target.value));
      } else {
        const optionIndex = this.questions
          .at(index)
          .get('answer')
          ?.value.findIndex((x: any) => x === Number(event.target.value));
        this.questions.at(index).get('answer')?.value.splice(optionIndex, 1);
      }
      if (this.questions.at(index).get('answer')?.value.length === 0) {
        this.questions.at(index).get('isError')?.patchValue(true);
      } else {
        this.questions.at(index).get('isError')?.patchValue(false);
      }
    }
  }
  /**
   * Method which is used to submit the survey.
   */
  submit() {
    let flag = 0;
    for (let i = 0; i < this.questions.controls.length; i++) {
      if (
        this.questions.controls[i].get('answer')?.value === null &&
        this.questionArr()[i].isrequired
      ) {
        flag = 1;
        this.questions.at(i).get('isError')?.patchValue(true);
      }
    }
    if (flag === 0 && this.questionForm.valid) {
      this.questionForm.value.surveyId = this.surveyId;
      if (this.questionForm.value.dob != null) {
        this.questionForm.value.dob = formatDate(
          this.questionForm.value.dob,
          'dd-MM-yyyy',
          'en-GB',
        );
      }
      this.questionForm.value.questions.map((item: any) => {
        if (item.type === 'select-multiple') {
          item.answer = String(item.answer);
        }
      });

      this.subscription.add(
        this.surveyHttp.saveSurveyResposne(this.questionForm.value).subscribe({
          next: (res: any) => {
            if (res && res.success && res.message) {
              this.snackbar.openFromComponent(Snackbar, {
                verticalPosition: 'top',
                duration: 5000,
                data: { message: res.message },
                panelClass: 'success-snackbar',
              });
            }
          },
          error: (err: HttpErrorResponse) => {
            this.snackbar.openFromComponent(Snackbar, {
              verticalPosition: 'bottom',
              duration: 3000,
              data: { message: err.error.message },
              panelClass: 'error-snackbar',
            });
          },
        }),
      );
    } else {
      this.questionForm.markAllAsTouched();
    }
  }
  /**
   * Component life cycle hook.
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
