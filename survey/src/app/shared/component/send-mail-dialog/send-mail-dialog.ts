import {
  ChangeDetectorRef,
  Component,
  Inject,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { email } from '../../../patterns';
import { NgClass } from '@angular/common';
import { SurveyHttpClientService } from '../../../services/survey-http-client-service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Auth } from '../../../auth/services/auth';

@Component({
  selector: 'app-send-mail-dialog',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './send-mail-dialog.html',
  styleUrl: './send-mail-dialog.sass',
})
export class SendMailDialog {
  /**
   * Variable which is used to store observables.
   */
  subscription: Subscription = new Subscription();
  /**
   * Variable which is used to store mail form values.
   */
  public mailForm!: FormGroup;
  /**
   * Variable which is used to store emails.
   */
  public emails: any = [];
  /**
   * Variable which is used to store the selected group state.
   */
  public isGroupSelected: boolean = false;
  /**
   * Variable which is used to store selected group index.
   */
  public selectedGroupIndex!: number;
  /**
   * Variable which is used to store group details.
   */
  public groupDetails = signal<any>([]);
  /**
   * Variable which is used to store group dialog modal.
   */
  @ViewChild('groupsTemplate') groupsTemplate!: TemplateRef<any>;
  /**
   * Variable which is used to store the group dialog reference.
   */
  private groupDialogRef!: MatDialogRef<any>;
  /**
   * @param sendMailDialogRef holds the dialog modal reference.
   * @param data holds the dialog data.
   * @param dialog holds the MatDialog class instance.
   * @param surveyHttp holds the SurveyHttpClientService class instance.
   * @param cd holds the ChangeDetectorRef class instance.
   */
  constructor(
    public sendMailDialogRef: MatDialogRef<SendMailDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private surveyHttp: SurveyHttpClientService,
    private router: Router,
    private authService: Auth,
  ) {}
  /**
   * Component life cycle hook.
   */
  ngOnInit() {
    this.mailForm = new FormGroup({
      subject: new FormControl(this.data.subject ? this.data.subject : null),
      to: new FormControl(null, [Validators.required, Validators.pattern(email)]),
      message: new FormControl(this.data.message ? this.data.message : null, Validators.required),
    });
    this.subscription.add(
      this.surveyHttp.getAllGroups({ userId: this.authService.userId() }).subscribe({
        next: (res: any) => {
          if (res.success && res.data) {
            this.groupDetails.set(res.data);
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      }),
    );
  }
  /**
   * Method which is used to close the dialog box.
   */
  close() {
    this.sendMailDialogRef.close();
    this.router.navigate(['dashboard', 'survey-categories', Number(this.data.categoryId)]);
  }
  /**
   * Method which is used to send mail.
   */
  sendMail() {
    if (this.emails.length) {
    }
    if (this.emails.length) {
      this.mailForm.get('to')?.patchValue(this.emails);
    } else {
      this.mailForm.markAllAsTouched();
    }
  }
  /**
   * Method which is used to handle the key press.
   */
  onKeyDown(event: KeyboardEvent) {
    if (
      (event.key === 'Enter' || event.key === ',') &&
      !this.mailForm.get('to')?.hasError('pattern')
    ) {
      this.emails.push(this.mailForm.get('to')?.value);
      this.mailForm.get('to')?.removeValidators(Validators.required);
      this.mailForm.get('to')?.updateValueAndValidity();
      this.mailForm.get('to')?.patchValue(null);
    }
  }
  /**
   * Method which is used to remove the emails.
   */
  removeItem(index: number) {
    if (this.emails.length) {
      this.emails.splice(index, 1);
      if (this.emails.length === 0) {
        this.mailForm.get('to')?.addValidators(Validators.required);
        this.mailForm.get('to')?.updateValueAndValidity();
      }
    }
  }
  /**
   * Method which is used to open the group dialog modal.
   */
  selectGroup() {
    this.groupDialogRef = this.dialog.open(this.groupsTemplate, {
      width: '550px',
      position: { top: '0' },
    });
  }
  /**
   * Method which is used to close the group dialog box.
   */
  closeDialog() {
    if (this.groupDialogRef) {
      this.groupDialogRef.close();
    }
  }
  /**
   * Method which is used to get the selected group.
   */
  selectedGroup(index: number) {
    this.isGroupSelected = true;
    this.selectedGroupIndex = index;
  }
  /**
   * Method which is used to add the mails.
   */
  addToEmails() {
    if (this.isGroupSelected) {
      if (this.emails.length) {
        this.emails = [];
      }
      this.groupDetails()[this.selectedGroupIndex].members.forEach((member: any) => {
        this.emails.push(member.email);
      });
      this.cd.detectChanges();
      this.closeDialog();
    }
  }
  /**
   * Component life cycle hook.
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
