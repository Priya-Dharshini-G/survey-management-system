import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
interface InitialTabEvent {
  tab: {
    textLabel: string;
  };
}
@Component({
  selector: 'app-setting',
  imports: [MatTabsModule, RouterOutlet],
  templateUrl: './setting.html',
  styleUrl: './setting.sass',
})
export class Setting {
  /**
   * Variable which is used to store the tab labels.
   */
  public tabs = ['Groups Setting', 'Response Setting'];
  /**
   * Variable which is used to store the user labels.
   */
  public users!: string | null;
  /**
   * Variable which is used to store the dialog modal.
   */
  @ViewChild('profileTemplate') profileTemplate!: TemplateRef<any>;
  /**
   * @param router holds the Router class instance.
   * @param route holds the ActivatedRoute class instance.
   * @param dialog holds the MatDialog class instance.
   */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) {}
  /**
   * Component life cycle hook.
   */
  ngOnInit() {
    this.selectTab({ tab: { textLabel: 'Groups Setting' } });
    const userDetail = sessionStorage.getItem('user');
    if (userDetail !== null) {
      this.users = JSON.parse(userDetail);
    }
  }
  /**
   * Method which is used to get the selected tab.
   */
  selectTab(event: MatTabChangeEvent | InitialTabEvent) {
    if (event.tab.textLabel === 'Groups Setting') {
      this.router.navigate(['group-setting'], { relativeTo: this.route });
    } else if (event.tab.textLabel === 'Response Setting') {
      this.router.navigate(['response-setting'], { relativeTo: this.route });
    }
  }
  /**
   * Method which is used to open the dialog modal.
   */
  openDialog() {
    this.dialog.open(this.profileTemplate, {
      width: '300px',
      height: '100%',
      position: { right: '0' },
      data: this.users,
    });
  }
  /**
   * Method which is used to close the dialog box.
   */
  closeDialog() {
    this.dialog.closeAll();
  }
  /**
   * Method which is used to cleat the session data.
   */
  logout() {
    const userDetail = sessionStorage.getItem('user');
    if (userDetail !== null) {
      this.dialog.closeAll();
      sessionStorage.clear();
      this.router.navigate(['/login']);
    }
  }
}
