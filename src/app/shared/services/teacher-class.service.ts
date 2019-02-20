import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, ReplaySubject } from 'rxjs';
import { TeacherClassModel } from 'src/app/models/class.model';
import { FileConstants } from '../constants/file-constants';
import { ProductService } from './product.service';
import { TeacherClassDalService } from './cache-datalayer/teacher-class-dal.service';
@Injectable({
  providedIn: 'root'
})
export class TeacherClassService {
  private _allClasses: ReplaySubject<Array<TeacherClassModel>> = new ReplaySubject(1);
  private _currentClass$ = new BehaviorSubject<TeacherClassModel>(null);
  private _classStatus: boolean;
  private _classSelectorStatus = new Subject<boolean>();
  private _CURRENTCLASS = FileConstants.constants.currentClass;

  constructor(
    private productService: ProductService,
    private teacherClassDalService: TeacherClassDalService
  ) { }

  /**
   * This function is used to set all class list.
   */
  setAllClasses() {
    // code to set all class list from indexed db.
    this.teacherClassDalService.getAllClasses((allClass: Array<TeacherClassModel>) => {
      if (allClass) {
        this._allClasses.next(allClass);
        if (!this._currentClass$.getValue()) {
          if (sessionStorage.getItem(this._CURRENTCLASS)) {
            this._currentClass$.next(JSON.parse(sessionStorage.getItem(this._CURRENTCLASS)));
          } else {
            this._currentClass$.next(allClass[0]);
          }
        }
      }
    });
  }

  /**
   * This function is used to get all the classes.
   */
  getAllClasses(): Observable<Array<TeacherClassModel>> {
    return this._allClasses.asObservable();
  }

  /**
   * This function is used to set the current class object
   *
   * @param currentClass Object having all the details of current class.
   */
  setCurrentClass(currentClass: TeacherClassModel) {
    this._currentClass$.next(currentClass);
    if (currentClass) {
      sessionStorage.setItem(this._CURRENTCLASS, JSON.stringify(currentClass));
    }
  }

  /**
   * This function is used to get the current class object.
   */
  getCurrentClass(): Observable<TeacherClassModel> {
    return this._currentClass$.asObservable();
  }

  /**
   * This function is used to set the class status by checking leangth of all class list.
   * @param status class status
   */
  setClassStatus(status: boolean) {
    this._classStatus = status;
  }

  /**
   * This function returns the class status
   */
  getClassStatus(): boolean {
    return this._classStatus;
  }

  /**
   * This function is used to set the toggle flag for class selector
   * @param status class selector status
   */
  setToggleForClassSelector(status: boolean) {
    this._classSelectorStatus.next(status);
  }

  /**
   * This function is used to get the toggle flag for class selector
   */
  getToggleForClassSelector(): Observable<boolean> {
    return this._classSelectorStatus.asObservable();
  }
  /**
   * Store classes havingAuthorized products into indexDB
   * @param classList Active class lists
   */
  populateClassesInLocalDB(classList: Array<TeacherClassModel>, callBack): void {
    this.teacherClassDalService.insertIntoCache(classList).subscribe(() => {
      callBack();
    });
  }
  /**
   * Filtering classes having scout enbled products.
   * @param classList Active class lists
   */
  filterClassesHavingAuthorizedProducts(classList: Array<TeacherClassModel>): TeacherClassModel[] {
    let authorizedClasses: Array<TeacherClassModel> = [];
    const authorizedProducts = this.productService.getAuthorizedProducts();
    if (authorizedProducts && authorizedProducts.length) {
      authorizedProducts.map((product) => {
        const mapped = classList.filter((teacherClass) => {
          if (teacherClass.productIds && teacherClass.productIds.length) {
            return teacherClass.productIds.indexOf(product) > -1;
          }
        });
        authorizedClasses = authorizedClasses.concat(mapped);
      });
    }
    if (authorizedClasses && authorizedClasses.length) {
      this.setClassContext(true);
    } else {
      this.setClassContext(false);
    }
    return authorizedClasses;
  }

  getCurrentClassFromCache() {
    if (sessionStorage.getItem(this._CURRENTCLASS)) {
      return JSON.parse(sessionStorage.getItem(this._CURRENTCLASS));
    } else {
      return null;
    }
  }
  setClassContext(status: boolean): void {
    sessionStorage.setItem(FileConstants.constants.hasClassList, JSON.stringify(status));
  }
  /**
   * Function to check class context from session storage and return true/false accordingly
   */
  hasClassContext(): boolean {
    return JSON.parse(sessionStorage.getItem(FileConstants.constants.hasClassList));
  }
}
