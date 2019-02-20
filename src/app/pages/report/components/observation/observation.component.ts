import { Component, OnInit, HostListener } from '@angular/core';
import { FooterService } from '../../../../shared/components/footer/footer.service';

@Component({
  selector: 'app-observation',
  templateUrl: './observation.component.html',
  styleUrls: ['./observation.component.scss']
})
export class ObservationComponent implements OnInit {
  public showChart = true;
  public classSelectorStatus = true;
  constructor() {}
  ngOnInit() {
    this.onWindowResize();
  }

  /**
   * toggle for show and hide.
   * @param event toggle flag.
   */
  public toggleFilter(event): void {
    this.showChart = event;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event?) {
    if (window.innerWidth <= 768) {
      this.classSelectorStatus = true;
    } else {
      this.classSelectorStatus = false;
    }
  }
}
