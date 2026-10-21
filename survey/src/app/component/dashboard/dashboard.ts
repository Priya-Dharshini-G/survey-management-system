import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.sass',
})
export class Dashboard {
  /**
   * @param router holds the Router class instance.
   * @param route holds the ActivatedRoute class instance.
   */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  /**
   * Method which is used to navigate to setting page.
   */
  navigateToSetting() {
    this.router.navigate(['setting'], { relativeTo: this.route });
  }
}
