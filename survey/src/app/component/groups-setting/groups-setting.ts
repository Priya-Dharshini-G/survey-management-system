import { DatePipe } from '@angular/common';
import { Component, signal, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { email } from '../../patterns';
import { Dialog } from '../../shared/component/dialog/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Snackbar } from '../../shared/component/snackbar/snackbar';
import { SurveyHttpClientService } from '../../services/survey-http-client-service';
import { HttpErrorResponse } from '@angular/common/http';
import { Loader } from '../../shared/component/loader/loader';
import { Subscription } from 'rxjs';
import { Auth } from '../../auth/services/auth';

@Component({
  selector: 'app-groups-setting',
  imports: [MatMenuModule, DatePipe, MatDialogModule, ReactiveFormsModule, Loader],
  templateUrl: './groups-setting.html',
  styleUrl: './groups-setting.sass',
})
export class GroupsSetting {
  /**
   * Variable which is used to store observables.
   */
  subscription: Subscription = new Subscription();
  /**
   * Variable which is used to store the groups.
   */
  public groupDetails = signal<any>([]);
  /**
   * Variable which is used to store the group form values.
   */
  public groupForm!: FormGroup;
  /**
   * Variable which is used to store the loading state.
   */
  isLoading = signal<boolean>(false);
  /**
   * Variable which is used to store the loading state of page.
   */
  pageLoader = signal<boolean>(false);
  /**
   * Variable which is used to store the deleted members.
   */
  deletedMembers: any = [];
  /**
   * Variable which is used to store dialog modal.
   */
  @ViewChild('createGroupDialog') createGroupDialog!: TemplateRef<any>;
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
    this.getAllGroups();
  }
  /**
   * Method which is used to get all groups.
   */
  getAllGroups() {
    this.subscription.add(
      this.surveyHttp.getAllGroups({ userId: this.auth.userId() }).subscribe({
        next: (res: any) => {
          if (res.success && res.data) {
            this.pageLoader.set(false);
            this.groupDetails.set(res.data);
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
    this.groupForm = new FormGroup({
      name: new FormControl(value && value.name ? value.name : null, Validators.required),
      members: new FormArray([]),
    });
    if (value && value.members.length) {
      for (let i = 0; i < value.members.length; i++) {
        this.members.push(
          new FormGroup({
            id: new FormControl(value.members[i].id),
            email: new FormControl(value.members[i].email, [
              Validators.required,
              Validators.pattern(email),
            ]),
          }),
        );
      }
    } else {
      this.members.push(
        new FormGroup({
          email: new FormControl(null, [Validators.required, Validators.pattern(email)]),
        }),
      );
    }
  }
  /**
   * Method which is used to get the member form array.
   */
  get members(): FormArray<FormGroup> {
    return this.groupForm.get('members') as FormArray<FormGroup>;
  }
  /**
   * Method which is used to add the form control.
   */
  pushMember() {
    this.members.push(
      new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.pattern(email)]),
      }),
    );
  }
  /**
   * Method which is used to remove the form control.
   */
  removeMember(index: number, member: any) {
    if (member.value.id) {
      this.deletedMembers.push(member.value);
    }
    this.members.removeAt(index);
  }
  /**
   * Method which is used to open the dialog modal.
   */
  openDialog(action?: string, item?: any) {
    this.dialog.open(this.createGroupDialog, {
      width: '450px',
      height: '100%',
      position: { right: '0', top: '0' },
      panelClass: 'right-dialog',
      data: { action: action, value: item },
    });
  }
  /**
   * Method which is used to close the dialog modal.
   */
  closeDialog() {
    this.dialog.closeAll();
  }
  /**
   * Method which is used to add new group.
   */
  addGroup() {
    this.formInitialize();
    this.openDialog();
  }
  /**
   * Method which is used to view the group.
   */
  viewGroup(data: any) {
    this.formInitialize(data);
    this.groupForm.disable();
    this.openDialog('View');
  }
  /**
   * Method which is used to edit the group.
   */
  editGroup(data: any) {
    this.formInitialize(data);
    this.openDialog('Edit', data);
  }
  /**
   * Method which is used to create new group.
   */
  saveGroup() {
    if (this.groupForm.valid) {
      this.isLoading.set(true);
      this.groupForm.value.userId = this.auth.userId();
      this.subscription.add(
        this.surveyHttp.createGroups(this.groupForm.value).subscribe({
          next: (res: any) => {
            if (res.success) {
              this.isLoading.set(false);
              this.snackbar.openFromComponent(Snackbar, {
                verticalPosition: 'top',
                duration: 5000,
                data: { message: res.message },
                panelClass: 'success-snackbar',
              });
              this.groupForm.reset();
              this.closeDialog();
              this.getAllGroups();
            }
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
      this.groupForm.markAllAsTouched();
    }
  }
  /**
   * Method which is used to update the group.
   */
  updateGroup(id: number) {
    if (this.groupForm.valid) {
      this.isLoading.set(true);
      this.groupForm.value.id = id;
      this.groupForm.value.deletedMembers = this.deletedMembers;
      this.surveyHttp.updateGroups(this.groupForm.value).subscribe({
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
          this.closeDialog();
          this.getAllGroups();
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
      });
    } else {
      this.groupForm.markAllAsTouched();
    }
  }
  /**
   * Method which is used to delete the group.
   */
  deleteGroup(id: number) {
    const dialogRef = this.dialog.open(Dialog, {
      width: '400px',
      data: { title: 'Delete Group', message: 'Are you sure you want to delete this group?' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.subscription.add(
          this.surveyHttp.deleteGroups({ id: id }).subscribe({
            next: (res: any) => {
              if (res.success) {
                const index = this.groupDetails().findIndex((x: any) => x.id === id);
                if (index !== -1) {
                  this.groupDetails.update((value: any) => value.toSpliced(index, 1));
                }
                this.snackbar.openFromComponent(Snackbar, {
                  verticalPosition: 'top',
                  duration: 864000,
                  data: { message: 'Group Deleted successfully' },
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
