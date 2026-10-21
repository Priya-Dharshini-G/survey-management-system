import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  imports: [MatDialogModule],
  templateUrl: './dialog.html',
  styleUrl: './dialog.sass',
})
export class Dialog {
  /**
   * @param dialogRef holds the dialog modal reference.
   * @param data holds the dialog data.
   */
  constructor(
    public dialogRef: MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  /**
   * Method which is used to close the dialog box.
   */
  onClose(value: boolean): void {
    this.dialogRef.close(value);
  }
}
