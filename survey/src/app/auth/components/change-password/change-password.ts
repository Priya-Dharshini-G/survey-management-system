import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { password } from '../../../patterns';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../shared/services/data-service/data-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SurveyHttpClientService } from '../../../services/survey-http-client-service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Snackbar } from '../../../shared/component/snackbar/snackbar';
import { Loader } from '../../../shared/component/loader/loader';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule, Loader],
  templateUrl: './change-password.html',
  styleUrl: './change-password.sass',
})
export class ChangePassword {
  /**
   * Variable which is used to store observables.
   */
  subscription: Subscription = new Subscription();
  /**
   * Variable which is used to store the email.
   */
  private email!: string;
  /**
   * Variable which is used to store the change password form.
   */
  public changePasswordForm!: FormGroup;
  /**
   * Variable which is used to store the loading state.
   */
  isLoading = false;
  /**
   * @param snackbar holds the MatSnackBar class instance.
   * @param dataService holds the DataService class instance.
   * @param route holds the ActivatedRoute class instance.
   * @param surveyHttp holds the SurveyHttpClientService class instance.
   * @param router holds the Router class instance.
   */
  constructor(
    private snackbar: MatSnackBar,
    private dataService: DataService,
    private route: ActivatedRoute,
    private surveyHttp: SurveyHttpClientService,
    private router: Router,
  ) {}
  /**
   * Component life cycle hook.
   */
  ngOnInit() {
    this.route.params.subscribe((res: any) => {
      if (res && res.emailId) {
        this.email = this.dataService.decrptyData(res.emailId);
      }
    });
    this.changePasswordForm = new FormGroup(
      {
        newPassword: new FormControl(null, [Validators.required, Validators.pattern(password)]),
        confirmPassword: new FormControl(null, Validators.required),
      },
      this.validatePassword(),
    );
  }
  /**
   * Method which is used to validate the password.
   */
  validatePassword(): ValidatorFn {
    return (control) => {
      const isNotMatch =
        control.get('newPassword')?.value !== control.get('confirmPassword')?.value;
      return isNotMatch ? { isNotMatch: true } : null;
    };
  }
  /**
   * Method which is used to reset the password.
   */
  reset() {
    if (this.changePasswordForm.valid) {
      this.subscription.add(
        this.surveyHttp
          .changePassword({
            email: this.email,
            password: this.changePasswordForm.value.confirmPassword,
          })
          .subscribe({
            next: (res: any) => {
              if (res.success && res.message) {
                this.isLoading = false;
                this.changePasswordForm.reset();
                this.router.navigate(['/login']);
              }
            },
            error: (err: HttpErrorResponse) => {
              this.snackbar.openFromComponent(Snackbar, {
                verticalPosition: 'bottom',
                duration: 5000,
                data: { message: err.error.message },
                panelClass: 'error-snackbar',
              });
              this.changePasswordForm.reset();
              this.isLoading = false;
            },
          }),
      );
    } else {
      this.changePasswordForm.markAllAsTouched();
    }
  }
  /**
   * Component life cycle hook.
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
