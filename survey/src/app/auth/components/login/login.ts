import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { email } from '../../../patterns';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Snackbar } from '../../../shared/component/snackbar/snackbar';
import { HttpErrorResponse } from '@angular/common/http';
import { Loader } from '../../../shared/component/loader/loader';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, Loader],
  templateUrl: './login.html',
  styleUrl: './login.sass',
})
export class Login {
  /**
   * Variable which is used to store observables.
   */
  subscription: Subscription = new Subscription();
  /**
   * Variable which is used to store the login form.
   */
  public loginForm!: FormGroup;
  /**
   * Variable which is used to store the loading state.
   */
  isLoading = false;
  /**
   * @param authService holds the AuthService class instance.
   * @param snackbar holds the MatSnackBar class instance.
   * @param router holds the router class instance.
   */
  constructor(
    private authService: Auth,
    private snackbar: MatSnackBar,
    private router: Router,
  ) {}
  /**
   * Component life cycle hook.
   */
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern(email)]),
      password: new FormControl(null, Validators.required),
    });
  }
  /**
   * Method which is used to handle the key press.
   */
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.login();
    }
  }
  /**
   * Method which is used to login, validate user and navigate to dashboard.
   */
  login() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.subscription.add(
        this.authService.login(this.loginForm.value).subscribe({
          next: (res: any) => {
            if (res.success && res.data) {
              this.isLoading = false;
              this.loginForm.reset();
              this.router.navigate(['/dashboard']);
            }
          },
          error: (err: HttpErrorResponse) => {
            this.snackbar.openFromComponent(Snackbar, {
              verticalPosition: 'bottom',
              duration: 5000,
              data: { message: err.error.message },
              panelClass: 'error-snackbar',
            });
            this.loginForm.reset();
            this.isLoading = false;
          },
        }),
      );
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  /**
   * Component life cycle hook.
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
