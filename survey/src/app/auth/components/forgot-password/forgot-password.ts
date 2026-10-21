import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { email } from '../../../patterns';
import { RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { HttpErrorResponse } from '@angular/common/http';
import { Snackbar } from '../../../shared/component/snackbar/snackbar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { DataService } from '../../../shared/services/data-service/data-service';
import { Loader } from '../../../shared/component/loader/loader';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, RouterLink, Loader],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.sass',
})
export class ForgotPassword {
  /**
   * Variable which is used to store observables.
   */
  subscription: Subscription = new Subscription();
  /**
   * Variable which is used to store email of the user.
   */
  public email!: FormControl;
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
    private dataService: DataService,
  ) {}
  /**
   * Component life cycle hook.
   */
  ngOnInit() {
    this.email = new FormControl(null, [Validators.required, Validators.pattern(email)]);
  }
  /**
   * Method which is used to request the forget password mail end point.
   */
  sendForgotPasswordMail() {
    if (this.email.valid) {
      this.isLoading = true;
      const email = this.dataService.encryptData(this.email.value);
      this.subscription.add(
        this.authService.forgotPassword({ email: this.email.value, link: email }).subscribe({
          next: (res: any) => {
            if (res.success && res.message) {
              this.isLoading = false;
              this.email.reset();
              this.snackbar.openFromComponent(Snackbar, {
                verticalPosition: 'bottom',
                duration: 5000,
                data: { message: res.message },
                panelClass: 'success-snackbar',
              });
            }
          },
          error: (err: HttpErrorResponse) => {
            this.isLoading = false;
            this.email.reset();
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
      this.email.markAsTouched();
    }
  }
  /**
   * Component life cycle hook.
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
