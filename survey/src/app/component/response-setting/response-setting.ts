import { Component, signal, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from '../../shared/component/dialog/dialog';
import { Snackbar } from '../../shared/component/snackbar/snackbar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Loader } from '../../shared/component/loader/loader';
import { SurveyHttpClientService } from '../../services/survey-http-client-service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Auth } from '../../auth/services/auth';

@Component({
  selector: 'app-response-setting',
  imports: [ReactiveFormsModule, Loader],
  templateUrl: './response-setting.html',
  styleUrl: './response-setting.sass',
})
export class ResponseSetting {
  /**
   * Variable which is used to store observables.
   */
  subscription: Subscription = new Subscription();
  /**
   * Variable which is used to store the options.
   */
  public responseDetails = signal<any>([]);
  /**
   * Variable which is used to store the option form values.
   */
  responseOptionsForm!: FormGroup;
  /**
   * Variable which is used to store the loading state.
   */
  isLoading = signal<boolean>(false);
  /**
   * Variable which is used to store the loading state of page.
   */
  pageLoader = signal<boolean>(false);
  /**
   * Variable which is used to store the deleted options.
   */
  deleteOptions: any = [];
  /**
   * Variable which is used to store dialog modal.
   */
  @ViewChild('createResponseDialog') createResponseDialog!: TemplateRef<any>;
  /**
   * @param dialog holds the MatDialog class instance.
   * @param snackbar holds the MatSnackBar class instance.
   * @param surveyHttp holds the SurveyHttpClientService class instance.
   * @param auth holds the Auth class instance.
   */
  constructor(
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private surveyHttp: SurveyHttpClientService,
    private auth: Auth,
  ) {}
  /**
   * Component life cycle hook.
   */
  ngOnInit() {
    this.pageLoader.set(true);
    this.getResponseOptions();
  }
  /**
   * Method which is used to get all options.
   */
  getResponseOptions() {
    this.subscription.add(
      this.surveyHttp.getResponseOptions({ userId: this.auth.userId() }).subscribe({
        next: (res: any) => {
          if (res.success && res.data) {
            this.pageLoader.set(false);
            this.responseDetails.set(res.data);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.pageLoader.set(false);
          console.log(err);
        },
      }),
    );
  }
  /**
   * Method which is used to initialize the form group.
   */
  formInitialize(value?: any) {
    this.responseOptionsForm = new FormGroup({
      name: new FormControl(value && value.name ? value.name : null, Validators.required),
      options: new FormArray([]),
    });
    if (value && value?.options?.length) {
      for (let i = 0; i < value.options.length; i++) {
        this.options.push(
          new FormGroup({
            id: new FormControl(value.options[i].id),
            name: new FormControl(value.options[i].name, Validators.required),
          }),
        );
      }
    } else {
      for (let i = 0; i < 4; i++) {
        this.options.push(
          new FormGroup({
            name: new FormControl(null, Validators.required),
          }),
        );
      }
    }
  }
  /**
   * Method which is used to get the options form array.
   */
  get options(): FormArray<FormGroup> {
    return this.responseOptionsForm.get('options') as FormArray<FormGroup>;
  }
  /**
   * Method which is used to open the dialog box.
   */
  openDialog(action?: string, item?: any) {
    this.dialog.open(this.createResponseDialog, {
      width: '450px',
      height: '100%',
      autoFocus: false,
      position: { right: '0', top: '0' },
      panelClass: 'right-dialog',
      data: { action: action, value: item },
    });
  }
  /**
   * Method which is used to close the dialog box.
   */
  closeDialog() {
    this.dialog.closeAll();
  }
  /**
   * Method which is used to add the form control.
   */
  pushOption() {
    this.options.push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
      }),
    );
  }
  /**
   * Method which is used to remove the form control.
   */
  removeOption(index: number, option: any) {
    if (option.value.id) {
      this.deleteOptions.push(option.value);
    }
    this.options.removeAt(index);
  }
  /**
   * Method which is used to add new options.
   */
  createResponse() {
    this.formInitialize();
    this.openDialog();
  }
  /**
   *Method which is used to view the options.
   */
  viewResponse(value: any) {
    this.formInitialize(value);
    this.responseOptionsForm.disable();
    this.openDialog('View');
  }
  /**
   * Method which is used to edit the options.
   */
  editResponse(value: any) {
    this.deleteOptions = [];
    this.formInitialize(value);
    this.openDialog('Edit', value);
  }
  /**
   * Method which is used to create new options.
   */
  saveResponseOptions() {
    if (this.responseOptionsForm.valid) {
      this.isLoading.set(true);
      this.responseOptionsForm.value.userId = this.auth.userId();
      this.subscription.add(
        this.surveyHttp.createResponseOptions(this.responseOptionsForm.value).subscribe({
          next: (res: any) => {
            this.isLoading.set(false);
            this.snackbar.openFromComponent(Snackbar, {
              verticalPosition: 'top',
              duration: 5000,
              data: { message: res.message },
              panelClass: 'success-snackbar',
            });
            this.responseOptionsForm.reset();
            this.getResponseOptions();
            this.closeDialog();
          },
          error: (err: HttpErrorResponse) => {
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
      this.responseOptionsForm.markAllAsTouched();
    }
  }
  /**
   * Method which is used to update the options.
   */
  editResponseOptions(id: number) {
    if (this.responseOptionsForm.valid) {
      this.isLoading.set(true);
      this.responseOptionsForm.value.id = id;
      this.responseOptionsForm.value.deletedOptions = this.deleteOptions;
      this.subscription.add(
        this.surveyHttp.updateResponseOptions(this.responseOptionsForm.value).subscribe({
          next: (res: any) => {
            if (res.success) {
              this.isLoading.set(false);
              this.snackbar.openFromComponent(Snackbar, {
                verticalPosition: 'top',
                duration: 5000,
                data: { message: res.message },
                panelClass: 'success-snackbar',
              });
            }
            this.getResponseOptions();
            this.closeDialog();
          },
          error: (err: HttpErrorResponse) => {
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
      this.responseOptionsForm.markAllAsTouched();
    }
  }
  /**
   * Method which is used to delete the group.
   */
  deleteResponseOptions(id: number) {
    const dialogRef = this.dialog.open(Dialog, {
      width: '400px',
      data: {
        title: 'Delete Response Options',
        message: 'Are you sure you want to delete this options?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.subscription.add(
          this.surveyHttp.deleteResponseOptions({ id: id }).subscribe({
            next: (res: any) => {
              if (res.success) {
                const index = this.responseDetails().findIndex((x: any) => x.id === id);
                if (index !== -1) {
                  this.responseDetails.update((value: any) => value.toSpliced(index, 1));
                }
                this.snackbar.openFromComponent(Snackbar, {
                  verticalPosition: 'top',
                  duration: 864000,
                  data: { message: 'Response Deleted successfully' },
                  panelClass: 'success-snackbar',
                });
              }
            },
            error: (err: HttpErrorResponse) => {
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
  }
  /**
   * Component life cycle hook.
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
