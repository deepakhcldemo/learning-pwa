import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccessibilityService } from 'src/app/shared/services/accessibility.service';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  public accessibilitySubscription$: Subscription;
  public tabIndexStatus = true;
  public classSelectorStatus = true;
  constructor(
    private router: Router,
    private accessibilityService: AccessibilityService) { }

  /**
   * set header title with 'Reports'
   */
  ngOnInit() {
    if (window.innerWidth <= 768) {
      this.classSelectorStatus = true;
    } else {
      this.classSelectorStatus = false;
    }
    this.accessibilitySubscription$ = this.accessibilityService.getTabIndexFirstLevelStatus().subscribe((levelStatus) => {
      this.tabIndexStatus = levelStatus;
    });
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
    if (window.innerWidth <= 768) {
      this.classSelectorStatus = true;
    } else {
      this.classSelectorStatus = false;
    }
  }


  /**
   * navigate to respective report page
   * @param page respective reports path name
   */
  public goToPage(page) {
    this.router.navigate(['pages/report/' + page]);
  }
}
