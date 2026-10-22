import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, signal, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Snackbar } from '../../shared/component/snackbar/snackbar';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { PreviewSurvey } from '../preview-survey/preview-survey';
import { SurveyHttpClientService } from '../../services/survey-http-client-service';
import { HttpErrorResponse } from '@angular/common/http';
import { LanuchDialog } from '../../shared/component/lanuch-dialog/lanuch-dialog';
import { DataService } from '../../shared/services/data-service/data-service';
import { Loader } from '../../shared/component/loader/loader';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Subscription } from 'rxjs';
import { Auth } from '../../auth/services/auth';
@Component({
  selector: 'app-create-survey',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    NgClass,
    MatSelectModule,
    MatOption,
    PreviewSurvey,
    Loader,
    MatSlideToggleModule,
  ],
  templateUrl: './create-survey.html',
  styleUrl: './create-survey.sass',
})
export class CreateSurvey {
  /**
   * Variable which is used to store observables.
   */
  subscription: Subscription = new Subscription();
  /**
   * Variable which is used to store the survey form values.
   */
  public surveyForm!: FormGroup;
  /**
   * Variable which is used to set the state of the survey form.
   */
  public isUpdate = signal<boolean>(false);
  /**
   * Variable which is used to store the survey id.
   */
  public survreyId!: number;
  /**
   * Variable which is used to store the loading state.
   */
  public isLoading = signal<any>({ btn1: false, btn2: false });
  /**
   * Variable which is used to store the deleted questions.
   */
  public deletedQuestions: any = [];
  /**
   * Variable which is used to store the deleted options.
   */
  public deletedOptions: any = [];
  /**
   * Variable which is used to store the selected questions.
   */
  public selectedQuestions: any = [];
  /**
   * Variable which is used to set the state for selected option.
   */
  public isSelectedOption: boolean = false;
  /**
   * Variable which is used to store the selected question index.
   */
  public selectedIndex!: number;
  /**
   * Variable which is used to store the selected option index.
   */
  public selectedOption!: number;
  /**
   * Variable which is used to store the default questions.
   */
  public defaultQuestions = signal<any>([]);
  /**
   * Variable which is used to store the response type array.
   */
  public responseType = [
    { id: 1, name: 'Star', label: 'Star Rating' },
    { id: 2, name: 'Number', label: 'Number Rating' },
    { id: 3, name: 'Comment', label: 'Comment' },
    { id: 4, name: 'select-multiple', label: 'Multi-Select (Checkbox)' },
    { id: 5, name: 'select-one', label: 'Select-One (Radio)' },
  ];
  /**
   * Variable which is used to store the option setting details.
   */
  public responseDetails: any = signal<any>([]);
  /**
   * Variable which is used to set the state for preview.
   */
  isPreview: boolean = false;
  /**
   * Variable which is used to store the dialog reference.
   */
  confirmDialogRef!: MatDialogRef<any>;
  /**
   * Variable which is used to store the url.
   */
  private link = 'http://localhost:4200/';
  /**
   * Variable which is used to store the dialog modal.
   */
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  /**
   * Variable which is used to store the confirmation dialog modal.
   */
  @ViewChild('confirmationTemplate') confirmationTemplate!: TemplateRef<any>;
  /**
   * @param snackbar holds the MatSnackBar class instance.
   * @param dialog holds the MatDialog class instance.
   * @param router holds the Router class instance.
   * @param route holds the ActivatedRoute class instance.
   * @param surveyClientService holds the SurveyHttpClientService class instance.
   * @param cd holds the ChangeDetectorRef class instance.
   * @param surveyHttp holds the SurveyHttpClientService class instance.
   * @param dataService holds the DataService class instance.
   * @param authService holds the Auth class instance.
   */
  constructor(
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private surveyHttp: SurveyHttpClientService,
    private dataService: DataService,
    private authService: Auth,
  ) {}
  /**
   * Component life cycle hook.
   */
  ngOnInit() {
    this.route.params.subscribe((res: any) => {
      if (res && res.id) {
        this.isUpdate.set(false);
        this.formInitialize();
        this.getCategory(res.id);
      } else if (res && res.surveyId && res.categoryId) {
        this.isUpdate.set(true);
        this.survreyId = res.surveyId;
        this.getCategory(res.categoryId);
        this.getSurvey(this.survreyId);
      }
    });
    this.surveyHttp.getResponseOptions({ userId: this.authService.userId() }).subscribe({
      next: (res: any) => {
        if (res && res.success && res.data) {
          this.responseDetails.set(res.data);
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error.message);
      },
    });
  }
  /**
   * Method which is used to get a specific category.
   */
  getCategory(id: number) {
    this.subscription.add(
      this.surveyHttp.getOneCategory({ id: id }).subscribe({
        next: (res: any) => {
          if (res && res.success && res.data) {
            this.defaultQuestions.set(res.data.questions);
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.error.message);
        },
      }),
    );
  }
  /**
   * Method which is used to get a specific survey.
   */
  getSurvey(id: number) {
    this.subscription.add(
      this.surveyHttp.getSurvey({ id: id }).subscribe({
        next: (res: any) => {
          if (res && res.success && res.data) {
            this.formInitialize(res.data);
            this.cd.detectChanges();
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.error.message);
        },
      }),
    );
  }
  /**
   * Method which is used to initialize the survey form.
   */
  formInitialize(value?: any) {
    this.surveyForm = new FormGroup({
      id: new FormControl(value && value.id ? value.id : null),
      name: new FormControl(value && value.name ? value.name : null, Validators.required),
      userName: new FormControl(value && value.userName ? value.userName : false),
      userNameReq: new FormControl(value && value.userNameReq ? value.userNameReq : false),
      email: new FormControl(value && value.email ? value.email : false),
      emailReq: new FormControl(value && value.emailReq ? value.emailReq : false),
      dob: new FormControl(value && value.dob ? value.dob : false),
      dobReq: new FormControl(value && value.dobReq ? value.dobReq : false),
      phoneNo: new FormControl(value && value.phoneNo ? value.phoneNo : false),
      phoneNoReq: new FormControl(value && value.phoneNoReq ? value.phoneNoReq : false),
      description: new FormControl(value && value.description ? value.description : null),
      questions: new FormArray([]),
    });
    if (value && value.questions && value.questions.length) {
      for (let i = 0; i < value.questions.length; i++) {
        this.initializeQuestions(i, value.questions[i]);
      }
    } else {
      this.pushQuestion();
    }
  }
  /**
   * Method which is used to initialize the survey questions.
   */
  initializeQuestions(index: number, value: any) {
    if (value.type === 'Star' || value.type === 'Number') {
      this.pushQuestion(value);
      this.addControl(
        index,
        'rate',
        new FormControl(value.rate ?? value.rate, Validators.required),
      );
    } else if (value.type === 'select-multiple' || value.type === 'select-one') {
      this.pushQuestion(value);
      this.addControl(index, 'options', new FormArray([]));
      if (this.getOptions(index)) {
        for (let i = 0; i < value.options.length; i++) {
          this.pushOption(index, value.options[i]);
        }
      }
    } else {
      this.pushQuestion(value);
    }
  }
  /**
   * Method which is used to add the question.
   */
  pushQuestion(value?: any) {
    this.questions.push(
      new FormGroup({
        id: new FormControl(value && value.id ? value.id : null),
        question: new FormControl(
          value && value.question ? value.question : null,
          Validators.required,
        ),
        type: new FormControl(value && value.type ? value.type : null, Validators.required),
        isrequired: new FormControl(value && value.isrequired ? true : false),
      }),
    );
  }
  /**
   * Method which is used to remove the question.
   */
  removeQuestion(index: number, id?: number) {
    if (this.isUpdate() && id) {
      this.deletedQuestions.push({ id: id });
    }
    this.questions.removeAt(index);
  }
  /**
   * Method which is used to add the options.
   */
  pushOption(index: number, value?: any) {
    this.getOptions(index).push(
      new FormGroup({
        id: new FormControl(value && value.id ? value.id : null),
        name: new FormControl(value && value.name ? value.name : null, Validators.required),
      }),
    );
  }
  /**
   * Method which is used to remove the options.
   */
  removeOption(index: number, position: number, id?: number) {
    if (this.isUpdate() && id) {
      this.deletedOptions.push({ id: id });
    }
    this.getOptions(index).removeAt(position);
  }
  /**
   * Method which is used to update the isrequired form control value.
   */
  isAllRequired(event: any) {
    if (this.questions.controls.length) {
      this.questions.controls.forEach((question: any) => {
        question.get('isrequired').patchValue(event.target.checked);
      });
    }
  }
  /**
   * Method which is used to open the dialog modal.
   */
  openDialog(value?: any, index?: any) {
    this.selectedIndex = index;
    this.isSelectedOption = false;
    this.dialog.open(this.dialogTemplate, {
      width: '550px',
      height: '100%',
      position: { top: '0' },
      data: { action: value ? value : null },
    });
  }
  /**
   * Method which is used to close the dialog box.
   */
  closeDialog() {
    this.dialog.closeAll();
  }
  /**
   * Method which is used to get the questions form array.
   */
  get questions(): FormArray<FormGroup> {
    return this.surveyForm.get('questions') as FormArray<FormGroup>;
  }
  /**
   * Method which is used to get the question type.
   */
  getType(index: number): string {
    return this.questions.at(index).get('type')?.value;
  }
  /**
   * Method which is used to get the options form array.
   */
  getOptions(index: any): FormArray<FormGroup> {
    return this.questions.at(index).get('options') as FormArray<FormGroup>;
  }
  /**
   * Method which is used to add or remove the selected questions.
   */
  selectedQuestion(event: any, index: number) {
    const question = this.defaultQuestions()[index];
    if (event.target.checked) {
      this.selectedQuestions.push(question);
    } else {
      const index = this.selectedQuestions.findIndex((x: any) => x.id === question.id);
      if (index != -1) {
        this.selectedQuestions.splice(index, 1);
      }
    }
  }
  /**
   * Method which is used to add questions.
   */
  addQuestions() {
    if (this.selectedQuestions.length) {
      for (let i = 0; i < this.selectedQuestions.length; i++) {
        const question = { question: this.selectedQuestions[i].question };
        this.pushQuestion(question);
      }
      this.cd.detectChanges();
      this.selectedQuestions = [];
      this.dialog.closeAll();
    }
  }
  /**
   * Method which is used to update the form control value.
   */
  isRequired(event: any, index: number) {
    this.questions.at(index).get('isrequired')?.patchValue(event.target.checked);
  }
  /**
   * Method which is used to add or remove the form control.
   */
  selectedAswerType(event: any, index: number) {
    if (event.value === 'Star' || event.value === 'Number') {
      this.addControl(index, 'rate', new FormControl(null, Validators.required));
      this.removeControl(index, 'options');
    }
    if (event.value === 'select-multiple' || event.value === 'select-one') {
      this.addControl(
        index,
        'options',
        new FormArray([new FormGroup({ name: new FormControl(null, Validators.required) })]),
      );
      this.removeControl(index, 'rate');
    }
    if (event.value === 'Comment') {
      this.removeControl(index, 'rate');
      this.removeControl(index, 'options');
    }
  }
  /**
   * Method which is used to add the form control.
   */
  addControl(index: number, controlName: string, control: any) {
    this.questions.at(index).addControl(controlName, control);
  }
  /**
   * Method which is used to remove the form control.
   */
  removeControl(index: number, controlName: string) {
    if (this.questions.at(index).contains(controlName)) {
      this.questions.at(index).removeControl(controlName);
    }
  }
  /**
   * Method which is used to update the selected options.
   */
  selectedType(index: number) {
    this.selectedOption = index;
    this.isSelectedOption = true;
  }
  /**
   * Method which is used to add or remove the options.
   */
  addOptions() {
    if (!this.isSelectedOption) {
      this.snackbar.openFromComponent(Snackbar, {
        verticalPosition: 'top',
        duration: 1000,
        data: { message: 'No response option is selected' },
        panelClass: 'info-snackbar',
      });
    } else {
      if (this.responseDetails()[this.selectedOption].options.length) {
        if (this.getOptions(this.selectedIndex)?.length) {
          if (this.isUpdate()) {
            const options = this.getOptions(this.selectedIndex).value;
            for (let i = 0; i < options.length; i++) {
              if (options[i].id) {
                this.deletedOptions.push({ id: options[i].id });
              }
            }
          }
          this.getOptions(this.selectedIndex).controls = [];
        }
        this.patchOptions(this.selectedIndex, this.responseDetails()[this.selectedOption].options);
      }
      this.dialog.closeAll();
      this.cd.detectChanges();
    }
  }
  /**
   * Method which is used to add options.
   */
  patchOptions(index: number, options: any) {
    for (let i = 0; i < options.length; i++) {
      const option = { name: options[i].name };
      this.pushOption(index, option);
    }
  }
  /**
   * Method which is used to update the toggle state.
   */
  selectedToggle(event: any, controlName: string) {
    if (event.checked) {
      this.surveyForm.get(controlName)?.patchValue(true);
    }
  }
  /**
   * Method which is used to update the check box.
   */
  selectedUserDetail(event: any, controlName: string) {
    if (!event.target.checked) {
      this.surveyForm.get(controlName)?.patchValue(false);
    }
  }
  /**
   * Method which is used to create the survey.
   */
  saveSurvey() {
    if (this.surveyForm.valid) {
      if (this.surveyForm.value.questions.length) {
        this.isLoading.update((prev) => ({ ...prev, btn1: true }));
        this.route.params.subscribe((res: any) => {
          if (res && res.id) {
            this.surveyForm.value.surveyCategoryId = Number(res.id);
          }
        });
        this.surveyForm.value.status = 'Draft';
        this.surveyForm.value.userId = this.authService.userId();
        this.subscription.add(
          this.surveyHttp.createSurvey(this.surveyForm.value).subscribe({
            next: (res: any) => {
              if (res && res.success) {
                this.isLoading.update((prev) => ({ ...prev, btn1: false }));
                this.snackbar.openFromComponent(Snackbar, {
                  verticalPosition: 'top',
                  duration: 5000,
                  data: { message: res.message },
                  panelClass: 'success-snackbar',
                });
                this.surveyForm.reset();
              }
            },
            error: (err: HttpErrorResponse) => {
              console.log(err);
              this.isLoading.update((prev) => ({ ...prev, btn1: false }));
              this.snackbar.openFromComponent(Snackbar, {
                verticalPosition: 'bottom',
                duration: 5000,
                data: { message: err.error.message },
                panelClass: 'error-snackbar',
              });
            },
          }),
        );
      } else {
        this.snackbar.openFromComponent(Snackbar, {
          verticalPosition: 'bottom',
          duration: 5000,
          data: { message: 'Add a few questions to this survey. Questions cannot be empty.' },
          panelClass: 'info-snackbar',
        });
      }
    } else {
      this.surveyForm.markAllAsTouched();
    }
  }
  /**
   * Method which is used to update the survey.
   */
  editSurvey() {
    if (this.surveyForm.valid) {
      this.isLoading.update((prev) => ({ ...prev, btn1: true }));
      this.surveyForm.value.deletedQuestions = this.deletedQuestions;
      this.surveyForm.value.deletedOptions = this.deletedOptions;
      this.surveyForm.value.status = 'Draft';
      this.subscription.add(
        this.surveyHttp.updateSurvey(this.surveyForm.value).subscribe({
          next: (res: any) => {
            if (res && res.success) {
              this.isLoading.update((prev) => ({ ...prev, btn1: false }));
              this.snackbar.openFromComponent(Snackbar, {
                verticalPosition: 'top',
                duration: 5000,
                data: { message: res.message },
                panelClass: 'success-snackbar',
              });
            }
            this.getSurvey(this.survreyId);
            this.deletedOptions = [];
            this.deletedQuestions = [];
          },
          error: (err: HttpErrorResponse) => {
            this.isLoading.update((prev) => ({ ...prev, btn1: false }));
            this.snackbar.openFromComponent(Snackbar, {
              verticalPosition: 'bottom',
              duration: 5000,
              data: { message: err.error.message },
              panelClass: 'error-snackbar',
            });
          },
        }),
      );
    } else {
      this.surveyForm.markAllAsTouched();
    }
  }
  /**
   * Method which is used to create and publish the survey.
   */
  saveAndPublish() {
    if (this.surveyForm.valid) {
      if (this.surveyForm.value.questions.length) {
        this.confirmDialogRef = this.dialog.open(this.confirmationTemplate, {
          width: '400px',
        });
        this.confirmDialogRef.afterClosed().subscribe((result: boolean) => {
          if (result) {
            this.isLoading.update((prev) => ({ ...prev, btn2: true }));
            this.route.params.subscribe((res: any) => {
              if (res && res.id) {
                this.surveyForm.value.surveyCategoryId = Number(res.id);
              }
            });
            this.surveyForm.value.status = 'Published';
            this.surveyForm.value.userId = this.authService.userId();
            this.subscription.add(
              this.surveyHttp.createSurvey(this.surveyForm.value).subscribe({
                next: (res: any) => {
                  if (res && res.success && res.data && res.data.id) {
                    this.isLoading.update((prev) => ({ ...prev, btn2: false }));
                    this.snackbar.openFromComponent(Snackbar, {
                      verticalPosition: 'top',
                      duration: 5000,
                      data: { message: res.message },
                      panelClass: 'success-snackbar',
                    });
                    this.publishDialog(this.surveyForm.value.name, res.data.id);
                  }
                },
                error: (err: HttpErrorResponse) => {
                  console.log(err);
                  this.isLoading.update((prev) => ({ ...prev, btn2: false }));
                  this.snackbar.openFromComponent(Snackbar, {
                    verticalPosition: 'bottom',
                    duration: 5000,
                    data: { message: err.error.message },
                    panelClass: 'error-snackbar',
                  });
                },
              }),
            );
          }
        });
      } else {
        this.snackbar.openFromComponent(Snackbar, {
          verticalPosition: 'bottom',
          duration: 5000,
          data: { message: 'Add a few questions to this survey. Questions cannot be empty.' },
          panelClass: 'info-snackbar',
        });
      }
    } else {
      this.surveyForm.markAllAsTouched();
    }
  }
  /**
   * Variable which is used to store the survey categories.
   */
  editAndPublish() {
    if (this.surveyForm.valid) {
      this.confirmDialogRef = this.dialog.open(this.confirmationTemplate, {
        width: '400px',
      });
      this.confirmDialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
          this.isLoading.update((prev) => ({ ...prev, btn2: true }));
          this.surveyForm.value.deletedQuestions = this.deletedQuestions;
          this.surveyForm.value.deletedOptions = this.deletedOptions;
          this.surveyForm.value.status = 'Published';
          this.subscription.add(
            this.surveyHttp.updateSurvey(this.surveyForm.value).subscribe({
              next: (res: any) => {
                if (res && res.success) {
                  this.isLoading.update((prev) => ({ ...prev, btn2: false }));
                  this.snackbar.openFromComponent(Snackbar, {
                    verticalPosition: 'top',
                    duration: 5000,
                    data: { message: res.message },
                    panelClass: 'success-snackbar',
                  });
                }
                this.deletedOptions = [];
                this.deletedQuestions = [];
                this.publishDialog(this.surveyForm.value.name, this.surveyForm.value.id);
              },
              error: (err: HttpErrorResponse) => {
                this.isLoading.update((prev) => ({ ...prev, btn2: false }));
                this.snackbar.openFromComponent(Snackbar, {
                  verticalPosition: 'bottom',
                  duration: 5000,
                  data: { message: err.error.message },
                  panelClass: 'error-snackbar',
                });
              },
            }),
          );
        }
      });
    } else {
      this.surveyForm.markAllAsTouched();
    }
  }
  /**
   * Method which is used to close the dialog box.
   */
  onClose(value: boolean): void {
    this.confirmDialogRef.close(value);
  }
  /**
   * Method which is used to open the publish dialog box.
   */
  publishDialog(title: String, id: number) {
    let categoryId;
    this.route.params.subscribe((res: any) => {
      categoryId = res && res.id ? res.id : res.categoryId;
    });
    if (this.link) {
      this.dialog.open(LanuchDialog, {
        width: '550px',
        disableClose: true,
        data: {
          title: title,
          link: this.link + 'survey/user-response' + this.dataService.encryptData(id),
          categoryId: categoryId,
        },
      });
    }
  }
  /**
   * Method which is used to navigate to specific survey category page.
   */
  navigateToSurveyCategories() {
    this.route.params.subscribe((res: any) => {
      const id = res && res.id ? res.id : res.categoryId;
      this.router.navigate(['dashboard', 'survey-categories', Number(id)]);
    });
  }
  /**
   * Method which is used to preview the survey.
   */
  preview() {
    if (this.surveyForm.valid) {
      this.isPreview = true;
    } else {
      this.snackbar.openFromComponent(Snackbar, {
        verticalPosition: 'top',
        duration: 2000,
        data: { message: 'Required fields are needed to filled so that you could see the preview' },
        panelClass: 'info-snackbar',
      });
    }
  }
  /**
   * Method which is used to get the emitted event from preview component.
   */
  setPreviewValue(event: any) {
    this.isPreview = event;
  }
  /**
   * Component life cycle hook.
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
