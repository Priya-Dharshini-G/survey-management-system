import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { email, letter_space, password, phoneNumber } from '../../../patterns';
import { RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Snackbar } from '../../../shared/component/snackbar/snackbar';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Loader } from '../../../shared/component/loader/loader';
import { EmailAsyncValidatorService } from '../../../services/email-async-validator-service';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink, Loader],
  templateUrl: './signup.html',
  styleUrl: './signup.sass',
})
export class Signup {
  /**
   * Variable which is used to store observables.
   */
  subscription: Subscription = new Subscription();
  /**
   * Variable which is used to store the value of signup form.
   */
  public signupForm!: FormGroup;
  /**
   * Variable which is used to store the loading state.
   */
  isLoading = false;
  /**
   * @param authService holds the AuthService class instance.
   * @param snackbar holds the MatSnackBar class instance.
   */
  constructor(
    private authService: Auth,
    private snackbar: MatSnackBar,
    private emailValidator: EmailAsyncValidatorService,
  ) {}
  /**
   * Component life cycle hook.
   */
  ngOnInit() {
    this.signupForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.pattern(letter_space)]),
      lastName: new FormControl(null, [Validators.required, Validators.pattern(letter_space)]),
      email: new FormControl(
        null,
        [Validators.required, Validators.pattern(email)],
        [this.emailValidator.validate()],
      ),
      password: new FormControl(null, [Validators.required, Validators.pattern(password)]),
      phoneNo: new FormControl(null, [Validators.required, Validators.pattern(phoneNumber)]),
    });
  }
  /**
   * Method which is used to create a new user.
   */
  signUp() {
    if (this.signupForm.valid) {
      this.isLoading = true;
      this.subscription.add(
        this.authService.singUp(this.signupForm.value).subscribe({
          next: (res: any) => {
            if (res.success && res.message) {
              this.isLoading = false;
              this.signupForm.reset();
              this.snackbar.openFromComponent(Snackbar, {
                verticalPosition: 'top',
                duration: 5000,
                data: { message: res.message },
                panelClass: 'success-snackbar',
              });
            }
          },
          error: (err: HttpErrorResponse) => {
            this.isLoading = false;
            this.snackbar.openFromComponent(Snackbar, {
              verticalPosition: 'top',
              duration: 5000,
              data: { message: err.error.message },
              panelClass: 'error-snackbar',
            });
            this.signupForm.reset();
          },
        }),
      );
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
  /**
   * Component life cycle hook.
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
