import { Component, OnInit, Input, OnDestroy, Host } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { StudentComponent } from '../student.component';

import { AccessibilityService } from 'src/app/shared/services/accessibility.service';
import { ContactInfoService } from './contact-info.service';

import { Guardian } from 'src/app/models/guardian.model';
import { Student } from 'src/app/models/student.model';
import { FileConstants } from 'src/app/shared/constants/file-constants';


@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})

export class ContactInfoComponent implements OnInit, OnDestroy {
  @Input() studentId: Student;
  private objContactInfo: Guardian = {
    camerapermission: false,
    guardian: [
      { 'email': '', 'mob': '', 'name': '' },
      { 'email': '', 'mob': '', 'name': '' }
    ]
  };
  private _contactRef$: Subscription;
  private _accessibilityService$: Subscription;

  public contactInfo: Guardian;
  public contactInfoEdit: Guardian;
  public editable = false;
  public perfectScrollbarConfig: PerfectScrollbarConfigInterface = {};
  public studentDetailsStatus = false;
  public m_studentDetailsStatus = false;
  public tabIndexStatus = true;
  public contactInfoVisibilityStatus = false;
  public noGuardianInfo = FileConstants.constants.noGuardianInfoMsg;

  constructor(@Host() studentComponent: StudentComponent,
    private spinner: NgxSpinnerService,
    private accessibilityService: AccessibilityService,
    private contactInfoService: ContactInfoService) {
    this.studentDetailsStatus = studentComponent.studentDetailsStatus;
    this.m_studentDetailsStatus = studentComponent.mob_studentDetailsStatus;
  }

  ngOnInit(): void {
    this.spinner.show();
    this._accessibilityService$ = this.accessibilityService.getTabIndexFirstLevelStatus().subscribe(status => {
      this.tabIndexStatus = status;
    });
    this.getContactInfo();
  }

  /**
   * This method is used to get the student contact info
   */
  private getContactInfo(): void {
    if (this.studentId && this.studentId.userId) {
      this._contactRef$ = this.contactInfoService.getContactInfo(this.studentId.userId).subscribe(doc => {
        if (!doc.exists) {
          this.contactInfoEdit = Object.assign({}, this.objContactInfo as any);
          this.contactInfoVisibilityStatus = true;
        } else {
          this.contactInfo = doc.data();
          this.contactInfoEdit = doc.data();
          this.contactInfoVisibilityStatus = false;
        }
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
      });
    } else {
      this.spinner.hide();
    }

  }

  /**
   * This method is used to toggle between editable mode of contact section
   */
  toggleEdit(): void {
    if (!this.contactInfoEdit || !this.contactInfoEdit.hasOwnProperty('camerapermission')) {
      this.contactInfoEdit = Object.assign({}, this.objContactInfo as any);
    }
    this.editable = !this.editable;
  }

  /**
   * This method is used to save the contact info of student
   */
  addContactInfo(): void {
    this.contactInfoService.setContactInfo(this.studentId.userId, this.contactInfoEdit);
    this.getContactInfo();
  }

  /**
   * Used to unsubscribe all the subscriptions
   */
  ngOnDestroy(): void {
    if (this._contactRef$) {
      this._contactRef$.unsubscribe();
    }
    if (this._accessibilityService$) {
      this._accessibilityService$.unsubscribe();
    }
  }
}
