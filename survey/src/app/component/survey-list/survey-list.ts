import { Component, signal, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { Dialog } from '../../shared/component/dialog/dialog';
import { Snackbar } from '../../shared/component/snackbar/snackbar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LanuchDialog } from '../../shared/component/lanuch-dialog/lanuch-dialog';
import { DataService } from '../../shared/services/data-service/data-service';
import { SurveyHttpClientService } from '../../services/survey-http-client-service';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { Subscription } from 'rxjs';
import { Auth } from '../../auth/services/auth';

@Component({
  selector: 'app-survey-list',
  imports: [
    MatTabsModule,
    MatMenuModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    DatePipe,
    MatTooltipModule,
  ],
  templateUrl: './survey-list.html',
  styleUrl: './survey-list.sass',
})
export class SurveyList {
  /**
   * Variable which is used to store observables.
   */
  subscription: Subscription = new Subscription();
  /**
   * Variable which is used to store the survey categories.
   */
  public categoryData = signal<any>(null);
  /**
   * Variable which is used to store the category id.
   */
  public categoryId!: number;
  /**
   * Variable which is used to store the toolip message.
   */
  public message = 'Copy';
  /**
   * Variable which is used to store the survey.
   */
  public survey = signal<any>([]);
  /**
   * Variable which is used to store the page loading state.
   */
  public pageLoader = signal<boolean>(false);
  /**
   * Variable which is used to store the tab labels.
   */
  public tabs = ['Draft', 'Published', 'Closed'];
  /**
   * Variable which is used to store url.
   */
  public link = 'http://localhost:4200/';
  /**
   * Variable which is used to store the dialog modal.
   */
  @ViewChild('viewSurvey') viewSurvey!: TemplateRef<any>;
  /**
   * Variable which is used to store the question dialog modal.
   */
  @ViewChild('questionDialog') questionDialog!: TemplateRef<any>;
  /**
   * Variable which is used to store the tooltip modal.
   */
  @ViewChild('tooltip') tooltip!: MatTooltip;
  /**
   * @param snackbar holds the MatSnackBar class instance.
   * @param dialog holds the MatDialog class instance.
   * @param router holds the Router class instance.
   * @param route holds the ActivatedRoute class instance.
   * @param surveyClientService holds the SurveyHttpClientService class instance.
   * @param dataService holds the DataService class instance.
   * @param surveyHttp holds the SurveyHttpClientService class instance.
   * @param authService holds the Auth class instance.
   */
  constructor(
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private surveyHttpSevice: SurveyHttpClientService,
    private authService: Auth,
  ) {}
  /**
   * Component life cycle hook.
   */
  ngOnInit() {
    this.route.params.subscribe((res: any) => {
      if (res && res.id) {
        this.categoryId = res.id;
        this.subscription.add(
          this.surveyHttpSevice.getOneCategory({ id: res.id }).subscribe({
            next: (res: any) => {
              if (res && res.success && res.data) {
                this.categoryData.set(res.data);
              }
            },
            error: (err: HttpErrorResponse) => {
              this.snackbar.openFromComponent(Snackbar, {
                verticalPosition: 'bottom',
                duration: 3000,
                data: { message: err.error.message },
                panelClass: 'error-snackbar',
              });
            },
          }),
        );
        this.getSurvey('Draft');
      }
    });
  }
  /**
   * Method which is used to get all survey.
   */
  getSurvey(status: String) {
    this.pageLoader.set(true);
    this.subscription.add(
      this.surveyHttpSevice
        .getAllSurvey({
          categoryId: this.categoryId,
          status: status,
          userId: this.authService.userId(),
        })
        .subscribe({
          next: (res: any) => {
            if (res && res.success && res.data) {
              this.survey.set(res.data);
              if (status === 'Published') {
                this.survey().forEach((x: any) => {
                  x.surveyLink = this.dataService.encryptData(x.id);
                });
              }
              this.pageLoader.set(false);
            }
          },
          error: (err: HttpErrorResponse) => {
            this.pageLoader.set(false);
            this.survey.set([]);
            this.snackbar.openFromComponent(Snackbar, {
              verticalPosition: 'bottom',
              duration: 3000,
              data: { message: err.error.message },
              panelClass: 'error-snackbar',
            });
          },
        }),
    );
  }
  /**
   * Method which is used to get the selected tab.
   */
  selectTab(event: MatTabChangeEvent) {
    if (event.tab.textLabel === 'Published') {
      this.getSurvey('Published');
    } else if (event.tab.textLabel === 'Closed') {
      this.getSurvey('Closed');
    } else if (event.tab.textLabel === 'Draft') {
      this.getSurvey('Draft');
    }
  }
  /**
   * Method which is used to open the dialog modal.
   */
  openDialog(template: TemplateRef<any>, config: any) {
    this.dialog.open(template, config);
  }
  /**
   * Method which is used to open the question dialog modal.
   */
  openQuestionDialog() {
    this.openDialog(this.questionDialog, { width: '80%', height: '100%', position: { top: '0' } });
  }
  /**
   * Method which is used to open the view survey dialog  modal.
   */
  openViewSurvey(value: any) {
    this.openDialog(this.viewSurvey, {
      width: '80%',
      height: '100%',
      position: { top: '0', right: '0' },
      panelClass: 'right-dialog',
      data: value,
    });
  }
  /**
   * Method which is used to navigate create survey page.
   */
  navigateToCreateSurvey() {
    this.router.navigateByUrl(`/dashboard/survey/create/${this.categoryId}`);
  }
  /**
   * Method which is used to navigate edit survey page.
   */
  navigateToEditSurvey(id: number) {
    this.router.navigateByUrl(`/dashboard/survey/edit/${this.categoryId}/${id}`);
  }
  /**
   * Method which is used to navigate view survey page.
   */
  navigateToViewResponse(id: number) {
    this.router.navigateByUrl(`/survey/view-response/${id}`);
  }
  /**
   * Method which is used to publish the survey.
   */
  publishSurvey(data: string, id: number, name: string) {
    const dialogRef = this.dialog.open(Dialog, {
      width: '400px',
      data: { title: 'Publish Survey', message: 'Are you sure you want to publish this survey?' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.subscription.add(
          this.surveyHttpSevice.changeStatus({ id: id, status: data }).subscribe({
            next: (res: any) => {
              if (res && res.success) {
                this.snackbar.openFromComponent(Snackbar, {
                  verticalPosition: 'top',
                  duration: 5000,
                  data: { message: res.message },
                  panelClass: 'success-snackbar',
                });
                if (this.link) {
                  this.dialog.open(LanuchDialog, {
                    width: '550px',
                    data: {
                      title: name,
                      link: this.link + 'survey/user-response/' + this.dataService.encryptData(id),
                    },
                  });
                }
              }
              this.getSurvey('Draft');
            },
            error: (err: HttpErrorResponse) => {
              console.log(err.error.message);
            },
          }),
        );
      }
    });
  }
  /**
   * Method which is used to change the survey status.
   */
  changeStatus(data: string, id: number) {
    const dialogRef = this.dialog.open(Dialog, {
      width: '400px',
      data: { title: 'Close Survey', message: 'Are you sure you want to close this survey?' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.subscription.add(
          this.surveyHttpSevice.changeStatus({ id: id, status: data }).subscribe({
            next: (res: any) => {
              if (res && res.success) {
                this.snackbar.openFromComponent(Snackbar, {
                  verticalPosition: 'top',
                  duration: 5000,
                  data: { message: res.message },
                  panelClass: 'success-snackbar',
                });
                this.getSurvey('Published');
              }
            },
            error: (err: HttpErrorResponse) => {
              console.log(err.error.message);
            },
          }),
        );
      }
    });
  }
  /**
   * Method which is used to delete the survey.
   */
  deleteSurvey(id: number) {
    const dialogRef = this.dialog.open(Dialog, {
      width: '400px',
      data: { title: 'Delete Survey', message: 'Are you sure you want to delete this survey?' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.subscription.add(
          this.surveyHttpSevice.deleteSurvey({ id: id }).subscribe({
            next: (res: any) => {
              if (res && res.success) {
                const index = this.survey().findIndex((x: any) => x.id === id);
                if (index !== -1) {
                  this.survey.update((value: any) => value.toSpliced(index, 1));
                }
                this.snackbar.openFromComponent(Snackbar, {
                  verticalPosition: 'top',
                  duration: 3000,
                  data: { message: 'Survey deleted successfully' },
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
   * Method which is used to close the dialog modal.
   */
  closeDialog() {
    this.dialog.closeAll();
  }
  /**
   * Method which is used to copy the link.
   */
  copyLink(id: number) {
    const data: any = document.querySelector(`#copy-text-${id}`);
    navigator.clipboard.writeText(data?.textContent);
    this.message = 'Copied!';
    this.tooltip.show();
  }
  /**
   * Component life cycle hook.
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
