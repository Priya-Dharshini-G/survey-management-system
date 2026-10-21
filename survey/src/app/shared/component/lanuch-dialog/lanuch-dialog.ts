import { Component, Inject, InjectionToken } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SendMailDialog } from '../send-mail-dialog/send-mail-dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lanuch-dialog',
  imports: [MatTooltipModule],
  templateUrl: './lanuch-dialog.html',
  styleUrl: './lanuch-dialog.sass',
})
export class LanuchDialog {
  /**
   * @param dialogRef holds the dialog modal reference.
   * @param data holds the dialog data.
   * @param dialog holds the MatDialog class instance.
   */
  constructor(
    public dialogRef: MatDialogRef<LanuchDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private router: Router,
  ) {}
  /**
   * Method which is used to close the dialog box.
   */
  close() {
    this.dialogRef.close();
    this.router.navigate(['dashboard', 'survey-categories', Number(this.data.categoryId)]);
  }
  /**
   * Method which is used to open the send mai dialog box.
   */
  showEmailDialog() {
    this.dialogRef.close();
    this.dialog.open(SendMailDialog, {
      width: '550px',
      disableClose: true,
      position: { bottom: '0', right: '0' },
      data: {
        subject: this.data.title,
        message: `Hi there, I would like, you to attend the feedback, which absolutely help us. The feedback link ${this.data.link}`,
        categoryId: this.data.categoryId,
      },
    });
  }
  /**
   * Method which is used to copy the link.
   */
  copyLink() {
    const data: any = document.querySelector('#form-link');
    navigator.clipboard.writeText(data.value);
  }
}
