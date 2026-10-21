import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  imports: [MatSnackBarModule],
  templateUrl: './snackbar.html',
  styleUrl: './snackbar.sass',
})
export class Snackbar {
  /**
   * @param snackbarRef holds the snackbar modal reference.
   * @param data holds the snackbar data.
   */
  constructor(
    public snackbarRef: MatSnackBarRef<Snackbar>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
  ) {}
  /**
   * Method which is used to close the dialog box.
   */
  onClose() {
    this.snackbarRef.dismiss();
  }
}
