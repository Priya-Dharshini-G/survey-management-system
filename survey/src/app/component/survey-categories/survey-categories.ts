import { Component, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SurveyHttpClientService } from '../../services/survey-http-client-service';
import { HttpErrorResponse } from '@angular/common/http';
import { Auth } from '../../auth/services/auth';
import { Subscription } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Dialog } from '../../shared/component/dialog/dialog';
import { Snackbar } from '../../shared/component/snackbar/snackbar';

@Component({
  selector: 'app-survey-categories',
  imports: [MatDialogModule, ReactiveFormsModule, MatMenuModule],
  templateUrl: './survey-categories.html',
  styleUrl: './survey-categories.sass',
})
export class SurveyCategories {
  /**
   * Variable which is used to store observables.
   */
  subscription: Subscription = new Subscription();
  /**
   * Variable which is used to store the default survey categories.
   */
  public categories = signal<any[]>([]);
  /**
   * Variable which is used to store the custom survey categories.
   */
  public customCategories = signal<any[]>([]);
  /**
   * Variable which is used to store the page loading state.
   */
  public pageLoader = signal<boolean>(false);
  /**
   * Variable which is used to store the category icons name.
   */
  svgIconName = ['course', 'customer', 'employee', 'shopping-bag', 'hospital', 'event'];
  /**
   * Variable which is used to store the category icon color.
   */
  colors = ['#d45286', '#e34562', '#a246b9', '#7e48c9', '#30ad8a', '#24b9e3'];
  /**
   * @param snackbar holds the MatSnackBar class instance.
   * @param router holds the Router class instance.
   * @param route holds the ActivatedRoute class instance.
   * @param dialog holds the MatDialog class instance.
   * @param authService holds the Auth class instance.
   * @param surveyClientService holds the SurveyHttpClientService class instance.
   */
  constructor(
    private snackbar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private authService: Auth,
    private surveyClientService: SurveyHttpClientService,
  ) {}
  /**
   * Component life cycle hook.
   */
  ngOnInit() {
    this.pageLoader.set(true);
    this.subscription.add(
      this.surveyClientService.getAllCategory({ userId: this.authService.userId() }).subscribe({
        next: (res: any) => {
          if (res.success && res.data) {
            this.pageLoader.set(false);
            this.categories.set(res.data.filter((item: any) => item.userId === 0));
            this.customCategories.set(res.data.filter((item: any) => item.userId != 0));
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
   * Method which is used to navigate create category page.
   */
  navigateCreateCategory() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }
  /**
   * Method which is used to navigate category page.
   */
  navigateCategory(id: number) {
    this.router.navigate([id], { relativeTo: this.route });
  }
  /**
   * Method which is used to navigate edit category page.
   */
  navigateToEditCategory(id: number) {
    this.router.navigate(['edit', id], { relativeTo: this.route });
  }
  /**
   * Method which is used to delete category.
   */
  deleteCategory(id: number) {
    const dialogRef = this.dialog.open(Dialog, {
      width: '400px',
      data: {
        title: 'Delete Category',
        message: 'Are you sure you want to delete this category?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.surveyClientService.deleteCategory({ id: id }).subscribe({
          next: (res: any) => {
            if (res.success) {
              const index = this.customCategories().findIndex((x: any) => x.id === id);
              if (index !== -1) {
                this.customCategories.update((value: any) => value.toSpliced(index, 1));
              }
              this.snackbar.openFromComponent(Snackbar, {
                verticalPosition: 'top',
                duration: 864000,
                data: { message: 'Category deleted successfully' },
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
        });
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
