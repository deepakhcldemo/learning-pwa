import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  AfterViewChecked,
  ViewEncapsulation
} from '@angular/core';
import { Router } from '@angular/router';
import { AssessmentService } from '../../services/assessment.service';
import { AccordionService } from '../../services/accordion.service';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  AssessmentDetail,
  Assessmentitemobservation
} from '../../../models/assessment-detail.model';
import { AccessibilityService } from '../../services/accessibility.service';
import { ObservationDalService } from '../../services/realtime-datalayer/observation-dal.service';
import { FileConstants } from 'src/app/shared/constants/file-constants';
import { TeacherClassService } from '../../services/teacher-class.service';
import { TeacherClassModel } from 'src/app/models/class.model';
import { ProgramService } from '../../services/program.service';
import { ProgramClassModel } from 'src/app/models/program.model';
import { GlobalService } from 'src/app/global.service';
import { HierarchyAssessment } from 'src/app/models/assessment-detail.model';
import { CarouselService } from './carousel.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CarouselComponent
  implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked {
  @Input('showRecent') showRecent;
  private _assessmentRecordSubscription$: Subscription;
  private _assessmentObservationSubscription$: Subscription;
  private _programSubscription$: Subscription;
  private _classSubscription$: Subscription;
  private _accessibilitySubscription$: Subscription;
  private _lastUpdatedAssessmentSubscription$: Subscription;
  private _assementChecklist = [];
  private _studentsCount: number;
  private _currentProgram: ProgramClassModel;
  private _currentClass: TeacherClassModel;
  private _assessmentDataById;
  private showStatus = false;
  private centerSlideIndex: number;
  public assessmentItemList: Array<AssessmentDetail> = [];
  public carouselTabIndexStatus = true;

  @ViewChild('slickModal') slickModal;
  slideConfig = {
    autoplay: false,
    slidesToShow: environment.carouselSetting.slidesToShow,
    slidesToScroll: environment.carouselSetting.slidesToScroll,
    infinite: false,
    respondTo: FileConstants.constants.min,
    centerMode: true,
    autoplaySpeed: environment.carouselSetting.carouselAutoPlaySpeed,
    variableWidth: true,
    speed: environment.carouselSetting.carouselSpeed,
    swipe: true,
    touchThreshold: environment.carouselSetting.touchThreshold,
    initialSlide: environment.carouselSetting.initialSlide,
    swipeToSlide: true,
    accessibility: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 769,
        settings: {
          arrows: false,
          slidesToShow: 5,
          slidesToScroll: 5
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: 5,
          slidesToScroll: 5,
          swipeToSlide: true
        }
      }
    ]
  };

  constructor(
    private router: Router,
    private assessmentService: AssessmentService,
    private observationDalService: ObservationDalService,
    private accordionService: AccordionService,
    private accessibiltyService: AccessibilityService,
    private teacherClassService: TeacherClassService,
    private programService: ProgramService,
    private globalService: GlobalService,
    private carouselService: CarouselService
  ) { }

  /**
   * Initializing The Student List From The Firebase and Calling The getProgressCount()
   */
  ngOnInit(): void {
    this.setAttributeCarousel();
    setTimeout(() => {
      const carouselItem = document.getElementsByClassName('slick-slide');
      if (carouselItem) {
        for (let i = 0; i < carouselItem.length; i++) {
          carouselItem[i].removeAttribute('aria-hidden');
        }
      }
    }, 500);
    this._classSubscription$ = this.teacherClassService
      .getCurrentClass()
      .subscribe(currentClass => {
        if (currentClass !== null) {
          this._studentsCount = currentClass.studentIds.length;
          this._currentClass = currentClass;
        }
      });
    this.accessibiltyService.setTabIndexLevelStatus(true, false, false);
    this._accessibilitySubscription$ = this.accessibiltyService
      .getTabIndexFirstLevelStatus()
      .subscribe(carouselStatus => {
        this.carouselTabIndexStatus = carouselStatus;
      });
    if (this._programSubscription$) {
      this._programSubscription$.unsubscribe();
    }
    this._programSubscription$ = this.programService
      .getCurrentProgram()
      .subscribe(currentProgram => {
        this._currentProgram = currentProgram;
        this.getAssessmentListForSelectedProgram();
        this.carouselService.setCurrentSlideShowFlag(false);
        this.assessmentService.setAssessmentProgramMapDetails(
          this._currentProgram
        );
      });
  }

  /**
   * get Assessment list for selected program
   */
  private getAssessmentListForSelectedProgram(): void {
    if (this._assessmentRecordSubscription$) {
      this._assessmentRecordSubscription$.unsubscribe();
    }
    this._assessmentRecordSubscription$ = this.assessmentService
      .getAssessmentProgramMapDetails()
      .subscribe(assessmentRecord => {
        this.assessmentItemList.length = 0;
        this._assementChecklist = assessmentRecord;
        this.getProgressCount();
      });
  }

  ngAfterViewInit(): void {
    if (this._currentProgram) {
      this.assessmentService.setAssessmentProgramMapDetails(
        this._currentProgram
      );
    }
    this.setAttributeCarousel();
  }

  ngAfterViewChecked(): void {
    if (this.slickModal) {
      if (
        !this.showStatus &&
        this.centerSlideIndex !== this.slickModal.currentIndex
      ) {
        this.showStatus = true;
        this.carouselService.setCurrentSlideShowFlag(this.showStatus);
      } else if (
        this.showStatus &&
        this.centerSlideIndex === this.slickModal.currentIndex
      ) {
        this.showStatus = false;
        this.carouselService.setCurrentSlideShowFlag(this.showStatus);
      }
    }
  }

  /**
   * get carousel data;
   */
  public getAllCarouselNodes(): void {
    this.sortData();
  }

  /**
   * Function Used To Get The Progress Count For The Assessment Item
   */
  private getProgressCount(): void {
    this._assessmentObservationSubscription$ = this.observationDalService
      .getAssessmentObservations(
        this._currentClass.classId,
        this._currentProgram
      )
      .subscribe(assessmentData => {
        this.getProgressSubscribe(assessmentData);
      });
  }
  /**
   * This Function is called from getProgressCount to get prpgressCount..
   * @param assessmentData  assessement instance
   */
  private getProgressSubscribe(assessmentData): void {
    this._assementChecklist.map(
      (assessmentItemDetails, assessmentItemIndex) => {
        const assessmentCount = assessmentData.filter(assessmentItem => {
          return (
            (assessmentItem['commentCount'] + assessmentItem['mediaCommentCount']) > 0 &&
            assessmentItem['assessmentid'] === assessmentItemDetails.id &&
            assessmentItem['parent'] === assessmentItemDetails.parent
          );
        });
        assessmentCount.sort(function (previous, next) {
          return next['updatedat'].seconds - previous['updatedat'].seconds;
        });
        if (assessmentCount.length > 0) {
          assessmentItemDetails['progressCount'] = Math.floor(
            (assessmentCount.length /
              (this._studentsCount * assessmentItemDetails.criteria.length)) *
            100
          );
          assessmentItemDetails['updatedat'] = assessmentCount[0]['updatedat'];
        } else {
          assessmentItemDetails['progressCount'] = 0;
        }
        if (this._assementChecklist.length - 1 === assessmentItemIndex) {
          this.sortData();
        }
      }
    );
  }

  /**
   * Function Used For Sorting The Assessment Checklist Data
   */
  private sortData(): void {
    this.assessmentItemList = this._assementChecklist;
    this._lastUpdatedAssessmentSubscription$ = this.observationDalService
      .getRecentlyObservedAssessment(
        this._currentClass.classId,
        this._currentProgram
      )
      .subscribe(lastUpdatedAssessment => {
        if (lastUpdatedAssessment.length > 0) {
          for (let i = 0; i < this.assessmentItemList.length; i++) {
            if (
              this.assessmentItemList[i].id ===
              lastUpdatedAssessment[0].assessmentid &&
              this.assessmentItemList[i].parent ===
              lastUpdatedAssessment[0].parent
            ) {
              this.centerSlideIndex = i;
              this.showStatus = false;
              this.slideConfig.initialSlide = 0;
              this.slickModal.slickGoTo(i);
              this.carouselService.setCurrentSlideShowFlag(false);
              break;
            }
          }
        } else {
          this.slickModal.slickGoTo(0);
          this.carouselService.setCurrentSlideShowFlag(false);
        }
      });
    setTimeout(() => {
      const carouselItem = document.getElementsByClassName('slick-slide');
      for (let i = 0; i < carouselItem.length; i++) {
        carouselItem[i].removeAttribute('aria-hidden');
      }
    }, 500);
  }

  /**
   * Function Used To Open The Assessment and Navigate To The Particular Ongoing Assessment/Assessment
   * Checklist Page
   *
   * @param checklist checklist refers to Ongoing Assessment/Assessment Checklist
   */
  public openAssessment(checklist: HierarchyAssessment): void {
    this._assessmentDataById = this.globalService.getAssessmentByIds([
      checklist.id
    ]);
    this.assessmentService.setCurrentAssessment(checklist as AssessmentDetail);
    this.accordionService.setBreadcrumb(checklist.path);
    this.accordionService.setCarousel(this._assessmentDataById);
    if (checklist.type === FileConstants.constants.checklist) {
      this.router.navigate(['/pages/checklist']);
    } else {
      this.router.navigate(['/pages/ongoing']);
    }
  }

  public setAttributeCarousel(): void {
    setTimeout(() => {
      const currentSlide = document.getElementsByClassName('slick-current');
      const prevSlideButton = document.getElementsByClassName('slick-prev');
      const nextSlideButton = document.getElementsByClassName('slick-next');
      if (currentSlide && currentSlide.length > 0) {
        currentSlide[0].setAttribute('tabindex', '-1');
      }
    }, 1000);
  }

  /**
   * Function used to unsubscribe the subscription when component destroys
   */
  ngOnDestroy() {
    if (this._assessmentRecordSubscription$) {
      this._assessmentRecordSubscription$.unsubscribe();
    }
    if (this._assessmentObservationSubscription$) {
      this._assessmentObservationSubscription$.unsubscribe();
    }
    if (this._classSubscription$) {
      this._classSubscription$.unsubscribe();
    }
    if (this._programSubscription$) {
      this._programSubscription$.unsubscribe();
    }
    if (this._accessibilitySubscription$) {
      this._accessibilitySubscription$.unsubscribe();
    }
    if (this._lastUpdatedAssessmentSubscription$) {
      this._lastUpdatedAssessmentSubscription$.unsubscribe();
    }
  }
}
