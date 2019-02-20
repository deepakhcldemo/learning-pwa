import { Injectable } from '@angular/core';
import { IndexedDbService } from './indexed.db.service';
import { ProductService } from './product.service';
import { AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { FileConstants } from 'src/app/shared/constants/file-constants';
import { TeacherClassService } from './teacher-class.service';
import { of, Subscription, Subject } from 'rxjs';
import { RosterService } from './roster.service';
import { LoggerService } from '../logger.service';
import { Student } from 'src/app/models/notes.model';
import { GlobalService } from '../../global.service';
import { SortingModel } from 'src/app/models/sorting.model';
import { TeacherClassModel } from 'src/app/models/class.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  setStudentBulkIds = new Subject();
  subUserProfile: Subscription;
  _studentCount: any;
  _currentStudentFromStudentList;
  private studentID: string;
  private dbRef: AngularFirestoreDocument;
  allStudents: any;
  constructor(private IDBService: IndexedDbService,
    private productService: ProductService,
    private teacherClassService: TeacherClassService,
    private rosterService: RosterService,
    private globalService: GlobalService,
  ) { }

  /**
    * Get all student details from indexed db
    * @param callback method to return only required properties from whole student object
    */
  getAllStudentDetail(callback) {
    this.IDBService.getAll(FileConstants.constants.student, (result) => {

      result = result.filter(stud => {
        stud.avatar = stud.firstName.charAt(0) + '' + stud.lastName.charAt(0);
        return stud;
      });
      result = this.globalService.customSort(result, 'fullName', 'ASC');
      callback(result);
    });
  }

  /**
    * Get student details based on student ID
    * @param studentId is the first required parameter and callback function is second parameter.
  */
  getStudentDetailById(studentId: string, callBack: Function) {
    this.IDBService.getAll(FileConstants.constants.student, (allStudentList) => {
      if (allStudentList) {
        allStudentList = allStudentList.find(student => {
          return student.userId === studentId;
        });
      }
      callBack(allStudentList);
    });
  }

  /**
   * * Get all student details by chosen class from indexed db
   * @param currentClassStudentsId: Array list of current class students
   * @param callback: method to return only required properties from whole student object
   * @param sortOption: this is an optional parameter in case user wants to sort by different property
   */
  getStudentsDetailByStudentsId(currentClassStudentsId: Array<string>, callBack: Function, sortOption?: SortingModel) {
    let defaultSortOption: SortingModel = {
      sortBy: 'fullName',
      orderBy: 'ASC'
    };
    if (sortOption) {
      defaultSortOption = sortOption;
    }
    let currentClassStudentList: Array<Student> = [];
    this.IDBService.getAll(FileConstants.constants.student, (allStudentList) => {
      allStudentList.filter(student => {
        if (currentClassStudentsId.indexOf(student.userId) > -1) {
          student.avatar = student.firstName.charAt(0) + '' + student.lastName.charAt(0);
          currentClassStudentList.push(student);
        }
      });
      currentClassStudentList = this.globalService.customSort(currentClassStudentList, defaultSortOption.sortBy, defaultSortOption.orderBy);
      callBack(currentClassStudentList);
    });
  }

  /**
     * Get student list by product id
     * @param productId product is for which studen td is required
     * @param callback method to return student id's list
     */
  getStudentsByProductID(productId, callback) {
    this.productService.getProduct(productId, (Productdata) => {
      if (Productdata) {
        callback(Productdata.studentList);
      }
    });
  }

  /**
   * Set total student count
   * @param count no of student
   */
  setTotalStudentCount(count) {
    this._studentCount = count;
  }

  /**
   * get Total student count
   */
  getTotalStudentCount() {
    return this._studentCount;
  }

  /**
   * This function is used to set the current student if user comes from student list page.
   * @param studentDetail current student details.
   */
  setCurrentStudentFromStudentList(studentDetail) {
    this._currentStudentFromStudentList = studentDetail;
  }

  /**
   * This function is used to get the current student data which selected at student list.
   */
  getCurrentStudentFromStudentList() {
    return this._currentStudentFromStudentList;
  }

  /**
   * This function is used to reset the current student data which selected at student list.
   */
  resetCurrentStudentFromStudentList() {
    this._currentStudentFromStudentList = '';
  }
  /**
   * Set current student id
   * @param studentId Id of current student
   */
  setCurrentStudent(studentId) {
    this.studentID = studentId;
  }
  /**
   * get current student id
   */
  getCurrentStudent() {
    return this.studentID;
  }

  /**
   * Get student detials
   * @param userId student id for which details required
   * @param callback method to get only required properties from whole student object
   */
  getStudentDetail(userId, callback) {

    this.IDBService.get(FileConstants.constants.student, userId, (result) => {
      callback(result);
    });
  }

  /**
     * Get Student details by product id
     * @param ProductId product id for which student id's list required
     * @param callback method for returning required student details
     */
  getStudentDetailsByProduct(ProductId, callback) {
    let studentList;
    return this.productService.getProduct(ProductId, (product) => {
      this.getAllStudentDetail((studentDetail) => {
        studentList = studentDetail.filter(stud => {
          if (product && product.studentList.indexOf(stud.userId) > -1) {
            return stud;
          }
        });
        callback(studentList);
      });
    });
  }

  prepareStudentDetailListForAllClass(classList: Array<TeacherClassModel>) {

    let studentIDsArr = [];
    let studentIds = [];
    if (classList.length > 0) {
      classList.map((classItem, index) => {
        studentIDsArr = studentIDsArr.concat(classItem.studentIds);
      });
      studentIds = studentIDsArr.filter((studentid, index, arr) => arr.indexOf(studentid) === index);
      this.setStudentBulkIds.next(studentIds);
    }
  }

  /**
   * break the students list in number of bulk array and one by one sent data to function
   * set all students details by fetching information from user service.
   * @param stdIds students id list
   */
  setStudentsDetail(studentIds) {
    let profiRes = [];
    let counter = 0;
    const chunckData = this.splitArrayIntoChuncks(studentIds);
    const ids = of(...chunckData);
    ids.subscribe((chunckStudentList) => {
      this.subUserProfile = this.rosterService.getUserProfileBulk(chunckStudentList.toString()).subscribe(profileResult => {
        counter++;
        profiRes = profiRes.concat(profileResult.users);
        if (chunckData.length === counter) {
          const stdProfiles = this.mapProfiles(profiRes);
          this.IDBService.put(FileConstants.constants.student, stdProfiles).subscribe({
            next: () => {
              // this.storeLoggedInUserDetail();
            },
            error: (err) => {
              // this.progressStatus = 0;
              // this.userService.removeCurrentUserSession();
              // this.setMessage(err.message);
              LoggerService.error(err, {});
              // this.unsubscribeOnError();
            }
          });
        }
      }, error => {
        // this.progressStatus = 0;
        // this.userService.removeCurrentUserSession();
        if (error.error) {
          if (error.error.code === 401) {
            // this.setMessage(error.error.message);
          } else {
            // this.setMessage(ErrorMessageConstants.errorMessages.serverError);
          }
        } else {
          // this.setMessage(ErrorMessageConstants.errorMessages.serverError);
        }
        LoggerService.error(error, {});
        // this.unsubscribeOnError();
      });
    });
  }

  /**
   * splliting studentlist into chuncks
   * @param studentList list of students
   */
  splitArrayIntoChuncks(studentList) {
    const chunk_size = 200;
    let studentGroup = [];
    studentGroup = studentList.map(function (e, i) {
      return i % chunk_size === 0 ? studentList.slice(i, i + chunk_size) : null;
    }).filter(function (e) { return e; });
    return studentGroup;
  }

  /**
    * For Mapping The Profile Details.
    * @param profileDetails
    */
  mapProfiles(profileDetails) {
    return profileDetails.map((profile) => {
      return {
        emailAddress: profile.rumbaUser.emailAddress,
        firstName: profile.rumbaUser.firstName,
        lastName: profile.rumbaUser.lastName,
        userId: profile.rumbaUser.userId,
        fullName: profile.rumbaUser.fullName
      };
    });

  }

  /**
   * Sort student list based on first name
   * @param studentsData list of students
   */
  sortStudentListBasedOnFirstName(studentsData) {
    let x;
    let y;
    return studentsData.sort(function (a, b) {
      x = a.firstName.toLowerCase();
      y = b.firstName.toLowerCase();
      if (x < y) { return -1; }
      if (x > y) { return 1; }
      return 0;
    });
  }
}
