import {
  Component, Input, ViewEncapsulation, OnInit, AfterViewInit, OnDestroy, ViewChild, Output, ElementRef, EventEmitter
} from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from './modal.service';
import { Subscription } from 'rxjs';
import { CsvDataArray } from '../../../models/csv-data-array';
import { ErrorMessageConstants } from 'src/app/shared/constants/error-message-constants';
import { FileConstants } from 'src/app/shared/constants/file-constants';
import { TeacherClassModel } from 'src/app/models/class.model';
import { ExportService } from '../../export.service';
@Component({
  selector: 'app-global-modal',
  templateUrl: './global-modal.component.html',
  styleUrls: ['./global-modal.component.scss'],
  // add NgbModalConfig and NgbModal to the component providers
  providers: [NgbModalConfig, NgbModal],
  encapsulation: ViewEncapsulation.None
})
export class GlobalModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('content') element: ElementRef;
  noteDeletionWarning = ErrorMessageConstants.errorMessages.deleteNotes;
  @Input() popupType: string;
  editable = false;
  @Input() isEditable: boolean;
  @Input() clickedId: any;
  @Input() headerTitle;
  popupSub: Subscription;
  selectedLink = FileConstants.constants.studentMedia;
  isAddSliperOpen = false;
  students: any;
  data: any;
  studentName = '';
  items: CsvDataArray[] = [];
  counter = 0;
  currentSelectedClass: TeacherClassModel;
  classSubscription$: Subscription;
  programSubscription$: Subscription;

  @Input('studentName')
  set StudentName(value: string) {
    if (value) {
      this.studentName = value;
    }
  }

  @Input('dataPreparedCSV')
  set dataOfCSV(value: Array<CsvDataArray>) {
    if (value) {
      this.items = value;
    }
  }

  constructor(
    private customModalService: ModalService,
    private exportService: ExportService,
  ) {

  }

  /**
   * Initializes the Student data, binds the media value into media popup and comment value into comment popup for the current Assessment
   */
  ngOnInit(): void {
    this.popupSub = this.customModalService.getPopupStatus().subscribe(data => {
      // this.getPopUpStatusSubscriber(data);
    });
  }

  /**
   * Called after ngAfterContentInit when the component's view has been initialized. Applies to components only
   * Add 'implements AfterViewInit' to the class
   */
  ngAfterViewInit(): void {
    this.customModalService.setElement(this.element);
  }

  /**
  * Enable Edit On Click Of Particular Media.
  */
  toggleEdit() {
    this.isEditable = true;
    this.editable = !this.editable;
  }


  // Call from template to generate CSV data
  downloadCSV(): void {
    const fileTitle = this.studentName;
    this.exportService.downloadCSV(this.items.reverse(), fileTitle);
  }

  /**
   *  To reset the media link in global-modal.html
   */
  resetTabSelection() {
    this.selectedLink = FileConstants.constants.studentMedia;
  }

  /**
   * @param noteCheck
   */
  checkNoteConfirmation(noteCheck) {
    this.customModalService.setNotesConfirmation(noteCheck);
  }

   /**
   * Function used to unsubscribe the subscription after completion of the activity
   */
  ngOnDestroy(): void {
    if (this.popupSub) {
      this.popupSub.unsubscribe();
    }
    if (this.classSubscription$) {
      this.classSubscription$.unsubscribe();
    }
    if (this.programSubscription$) {
      this.programSubscription$.unsubscribe();
    }
  }
}
