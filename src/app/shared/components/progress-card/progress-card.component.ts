import { Component, OnInit, Input } from '@angular/core';
import { AccessibilityService } from '../../services/accessibility.service';

@Component({
  selector: 'app-progress-card',
  templateUrl: './progress-card.component.html',
  styleUrls: ['./progress-card.component.scss']
})
export class ProgressCardComponent implements OnInit {
  @Input('checklist') checklist;
  tabIndexStatus = true;
  constructor(private accessibilityService: AccessibilityService) { }

  ngOnInit() {
    this.accessibilityService.getTabIndexFirstLevelStatus().subscribe(status => {
      this.tabIndexStatus = status;
    });
  }
}
