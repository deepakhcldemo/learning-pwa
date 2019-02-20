import { Component, OnInit, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../shared/components/alert/alert.service';
import { IndexedDbService } from '../shared/services/indexed.db.service';
import { ProductService } from '../shared/services/product.service';
import { FileConstants } from 'src/app/shared/constants/file-constants';
import { TeacherClassService } from '../shared/services/teacher-class.service';
import { UserService } from '../auth/user.service';
import { Subscription } from 'apollo-client/util/Observable';
import { TeacherClassModel } from '../models/class.model';
import { AssessmentDalService } from 'src/app/shared/services/cache-datalayer/assessment-dal.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})

export class PagesComponent implements OnInit, AfterViewInit {
  screen = true;
  classSubscription$: Subscription;
  private _allClassSubscription$: Subscription;
  _currentSelectedClass: TeacherClassModel;
  _allClass: Array<TeacherClassModel>;
  @HostListener('window:resize', ['$event'])
  sizeChange(event) {
    if (window.innerWidth < 1366) {
      this.screen = false;
    } else {
      this.screen = true;
    }
  }
  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private productService: ProductService,
    public alertService: AlertService, private idDBService: IndexedDbService,
    private teacherClassService: TeacherClassService,
    private assessmentDalService: AssessmentDalService
  ) {
    if (screen.availWidth < 1366) {
      this.screen = false;
    }
  }

  /**
   * Initializing The Navigation For The Corresponding Assessment, Assessment Item And The Current Product List
   */
  ngOnInit() {
    // this.showFooter = true;
    if (window.innerWidth < 1366) {
      this.screen = false;
    }
    if (sessionStorage.getItem(FileConstants.constants.CurrentProduct)) {
      this.productService.setCurrentProduct(JSON.parse(sessionStorage.getItem(FileConstants.constants.CurrentProduct)));
    } else {
      // this.productService.setCurrentProduct((this.gobalService.getProductByNavigation())[0]);
    }
    this.idDBService.create(this.idDBService.persistentDBSchema(),
      `${FileConstants.constants.persistentDBName}_${this.userService.getCurrentUser().identityId}`).subscribe(persistentDB => {
      });
  }
  ngAfterViewInit() {
    this.classSubscription$ = this.teacherClassService.getCurrentClass().subscribe(currentClass => {
      this._currentSelectedClass = currentClass;
    });
    this._allClassSubscription$ = this.teacherClassService.getAllClasses().subscribe(allClass => {
      this._allClass = allClass;
    });
    if (!this._currentSelectedClass || !this._allClass) {
      this.teacherClassService.setAllClasses();
    }

    //  this.assessmentDalService.setAllAssessments();
  }
}
