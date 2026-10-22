import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SurveyHttpClientService } from '../../services/survey-http-client-service';
import { Auth } from '../../auth/services/auth';
import { HttpErrorResponse } from '@angular/common/http';
import { Loader } from '../../shared/component/loader/loader';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Snackbar } from '../../shared/component/snackbar/snackbar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-category',
  imports: [ReactiveFormsModule, RouterLink, Loader],
  templateUrl: './create-category.html',
  styleUrl: './create-category.sass',
})
export class CreateCategory {
  /**
   * Variable which is used to store observables.
   */
  subscription: Subscription = new Subscription();
  /**
   * Variable which is used to store the category form values.
   */
  categoryForm!: FormGroup;
  /**
   * Variable which is used to set the state of the category form.
   */
  isUpdate = signal<boolean>(false);
  /**
   * Variable which is used to store the loading state.
   */
  isLoading = signal<boolean>(false);
  /**
   * Variable which is used to store the deleted questions.
   */
  deletedQuestions: any = [];
  /**
   * @param authService holds the AuthService class instance.
   * @param snackbar holds the MatSnackBar class instance.
   * @param router holds the router class instance.
   * @param surveyClientService holds the SurveyHttpClientService class instance.
   * @param cd holds the ChangeDetectorRef class instance.
   */
  constructor(
    private authService: Auth,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private surveyClientService: SurveyHttpClientService,
    private cd: ChangeDetectorRef,
  ) {}
  /**
   * Component life cycle hook.
   */
  ngOnInit() {
    this.route.params.subscribe((res: any) => {
      if (res && res.id) {
        this.isUpdate.set(true);
        this.subscription.add(
          this.surveyClientService.getOneCategory({ id: res.id }).subscribe({
            next: (res: any) => {
              if (res && res.success && res.data) {
                this.formInitialize(res.data);
                this.cd.detectChanges();
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
        this.formInitialize();
      }
    });
  }
  /**
   * Method which is used to intialize the form.
   */
  formInitialize(value?: any) {
    this.categoryForm = new FormGroup({
      id: new FormControl(value && value.id ? value.id : null),
      name: new FormControl(value && value.name ? value.name : null, Validators.required),
      description: new FormControl(
        value && value.description ? value.description : null,
        Validators.required,
      ),
      questions: new FormArray([]),
    });
    if (value && value.questions.length) {
      for (let i = 0; i < value.questions.length; i++) {
        this.addControl(value.questions[i]);
      }
    } else {
      this.addControl();
    }
  }
  /**
   * Method which is used to get the question form array.
   */
  get questions(): FormArray<FormGroup> {
    return this.categoryForm.get('questions') as FormArray<FormGroup>;
  }
  /**
   * Method which is used to add the question form group.
   */
  addControl(value?: any) {
    this.questions.push(
      new FormGroup({
        id: new FormControl(value && value.id ? value.id : null),
        question: new FormControl(
          value && value.question ? value.question : null,
          Validators.required,
        ),
      }),
    );
  }
  /**
   * Method which is used to remove the question form group.
   */
  removeControl(index: number) {
    if (this.questions.at(index).get('id')?.value) {
      this.deletedQuestions.push(this.questions.at(index).value);
    }
    this.questions.removeAt(index);
  }
  /**
   * Method which is used to create new category.
   */
  saveCategory() {
    if (this.categoryForm.valid) {
      this.categoryForm.value.userId = this.authService.userId();
      this.isLoading.set(true);
      this.subscription.add(
        this.surveyClientService.createCategory(this.categoryForm.value).subscribe({
          next: (res: any) => {
            if (res.success && res.message) {
              this.snackbar.openFromComponent(Snackbar, {
                verticalPosition: 'top',
                duration: 5000,
                data: { message: res.message },
                panelClass: 'success-snackbar',
              });
              this.isLoading.set(false);
              this.categoryForm.reset();
            }
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
            this.isLoading.set(false);
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
      this.categoryForm.markAllAsTouched();
    }
  }
  /**
   * Method which is used to update category.
   */
  updateCategory() {
    if (this.categoryForm.valid) {
      this.categoryForm.value.deletedQuestions = this.deletedQuestions;
      this.isLoading.set(true);
      this.subscription.add(
        this.surveyClientService.updateCategory(this.categoryForm.value).subscribe({
          next: (res: any) => {
            if (res.success && res.message) {
              this.snackbar.openFromComponent(Snackbar, {
                verticalPosition: 'top',
                duration: 5000,
                data: { message: res.message },
                panelClass: 'success-snackbar',
              });
              this.isLoading.set(false);
            }
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
            this.isLoading.set(false);
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
      this.categoryForm.markAllAsTouched();
    }
  }
  /**
   * Component life cycle hook.
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
