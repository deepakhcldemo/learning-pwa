import { Injectable } from '@angular/core';
import {
  AngularFirestoreDocument,
  AngularFirestore
} from 'angularfire2/firestore';
import { environment } from 'src/environments/environment.nightly';
import { map } from 'rxjs/operators';
import { FileConstants } from 'src/app/shared/constants/file-constants';
import { UserService } from 'src/app/auth/user.service';
import { Assessmentitemobservation } from 'src/app/models/assessment-detail.model';
import { TeacherClassModel } from 'src/app/models/class.model';
import { ProgramClassModel } from 'src/app/models/program.model';
import { Observable } from 'rxjs';
import { ObservedAssessment } from 'src/app/models/report.model';

@Injectable()
export class ObservationDalService {
  private dbRef: AngularFirestoreDocument;
  private _assessmentRef;
  constructor(
    private firestoreDb: AngularFirestore,
    private userService: UserService
  ) {
    this._assessmentRef = this.firestoreDb
      .collection(environment.firebasedb.userisbn)
      .doc(this.userService.getCurrentUser().identityId)
      .collection(environment.firebasedb.assessmentItemObservation);
  }

  /**
   * Function to fetch observation data from assessmentItemObservation
   * @param studentId
   */
  public getObserveInformation(
    studentId: string,
    currentClassId: string
  ): Observable<Array<Assessmentitemobservation>> {
    return this.firestoreDb
      .collection(environment.firebasedb.userisbn)
      .doc(this.userService.getCurrentUser().identityId)
      .collection(environment.firebasedb.assessmentItemObservation, ref =>
        ref
          .where('classid', '==', currentClassId.toString())
          .where('students', '==', studentId.toString())
      )
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            return data as Assessmentitemobservation;
          });
        })
      );
  }

  /**
   * Edit observation detail on save comment
   * @param assessmentItemId assessment item id for which observation has to be updated
   */
  public editItemObservation(observedAssessment): void {
    this.firestoreDb
      .collection(environment.firebasedb.userisbn)
      .doc(this.userService.getCurrentUser().identityId)
      .collection(environment.firebasedb.assessmentItemObservation)
      .doc(observedAssessment.id.toString())
      .set(observedAssessment, { merge: true });
  }

  /**
   * This function is used to save the item observation content into firebase.
   *
   * @param answerObj item observation add object
   */
  public saveItemObservation(answerObj: Assessmentitemobservation): void {
    this.firestoreDb
      .collection(environment.firebasedb.userisbn)
      .doc(this.userService.getCurrentUser().identityId)
      .collection(environment.firebasedb.assessmentItemObservation)
      .add(answerObj);
  }

  /**
   * Function Used To get The Assessment Item Observation from firebase
   * @param classId selected classid
   * @param programId selected programid
   */
  public getAssessmentObservations(
    classId: string,
    programObject: ProgramClassModel
  ): Observable<Array<Assessmentitemobservation>> {
    return this.firestoreDb
      .collection(environment.firebasedb.userisbn)
      .doc(this.userService.getCurrentUser().identityId)
      .collection(environment.firebasedb.assessmentItemObservation, ref =>
        ref
          .where('classid', '==', classId)
          .where('programid', '==', programObject.program.identifier)
          .where('productid', '==', programObject.productId)
      )
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(assessmentAnswer => {
            const data = assessmentAnswer.payload.doc.data();
            const id = assessmentAnswer.payload.doc.id;
            return { id, ...data } as Assessmentitemobservation;
          });
        })
      );
  }

  /**
   * This function is used to get all the recent updated assessment items from the firebase
   * @param classid clasid for which assessment list is requested
   */
  public getRecentlyObservedAssessmentItem(
    classid: string
  ): Observable<Array<Assessmentitemobservation>> {
    return this.firestoreDb
      .collection(environment.firebasedb.userisbn)
      .doc(this.userService.getCurrentUser().identityId)
      .collection(environment.firebasedb.assessmentItemObservation, ref =>
        ref
          .where('classid', '==', classid)
          .orderBy('updatedat', 'desc')
          .limit(4)
      )
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(s => {
            const data = s.payload.doc.data();
            const id = s.payload.doc.id;
            return { id, ...data } as Assessmentitemobservation;
          });
        })
      );
  }

  /**
   * this function is used to get all the assessment item observation on the basis of
   * assessment id, assessment item id, assessment parent and student id.
   * @param assessmentId assessment id
   * @param assessmentItemId assessment item id
   * @param parent assessment parent hierarchy
   * @param studentId student user id
   * @param classObject class object
   * @param programObject program object
   * @returns array of assessment observation data.
   */
  public getAssessmentObservationByStudent(
    assessmentId: string,
    assessmentItemId: string,
    parent: string,
    studentId: string,
    classObject: TeacherClassModel,
    programObject: ProgramClassModel
  ): Observable<Array<Assessmentitemobservation>> {
    return this.firestoreDb
      .collection(environment.firebasedb.userisbn)
      .doc(this.userService.getCurrentUser().identityId)
      .collection(environment.firebasedb.assessmentItemObservation, ref =>
        ref
          .where('assessmentid', '==', assessmentId)
          .where('assessmentitemid', '==', assessmentItemId)
          .where('parent', '==', parent)
          .where('students', '==', studentId)
          .where('classid', '==', classObject.classId)
          .where('programid', '==', programObject.program.identifier)
          .where('productid', '==', programObject.productId)
      )
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(assessmentObservationListItem => {
            const payloadData = assessmentObservationListItem.payload.doc.data();
            const id = assessmentObservationListItem.payload.doc.id;
            return { id, ...payloadData } as Assessmentitemobservation;
          });
        })
      );
  }

  /**
   * Add observation record in firebase
   * @param assessmentObj Observation record object
   */
  public addObservationDataForAssessment(
    assessmentObj: Assessmentitemobservation
  ): void {
    this._assessmentRef.add(assessmentObj);
  }

  /**
   * Update observation record in firebase
   * @param docid document id for which record has to be modified
   * @param observedFlag observed flag
   */
  public updateObservationRecordForAssessment(
    docid: string,
    observedFlag: boolean
  ): void {
    this._assessmentRef
      .doc(docid)
      .set({ isobserved: observedFlag }, { merge: true });
  }

  /**
   * Delete observed record
   * @param docid document id
   */
  public deleteObservedRecord(docid: string): void {
    this._assessmentRef.doc(docid).delete();
  }

  /**
   * Get observed items list.
   */
  public getobservedAssementItems(): Observable<Array<ObservedAssessment>> {
    this.dbRef = this.firestoreDb
      .collection(environment.firebasedb.userisbn)
      .doc(this.userService.getCurrentUser().identityId);

    return this.dbRef
      .collection(environment.firebasedb.assessmentItemObservation)
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(s => {
            const data = s.payload.doc.data();
            const id = s.payload.doc.id;
            return { id, ...data } as ObservedAssessment;
          });
        })
      );
  }
  /**
   * This function is used to get all the recent updated assessment items from the firebase
   * @param classid clasid for which assessment list is requested
   */
  public getRecentlyObservedAssessment(
    classId: string,
    programObject: ProgramClassModel
  ): Observable<Array<Assessmentitemobservation>> {
    return this.firestoreDb
      .collection(environment.firebasedb.userisbn)
      .doc(this.userService.getCurrentUser().identityId)
      .collection(environment.firebasedb.assessmentItemObservation, ref =>
        ref
          .where('classid', '==', classId)
          .where('programid', '==', programObject.program.identifier)
          .where('productid', '==', programObject.productId)
          .orderBy('updatedat', 'desc')
          .limit(1)
      )
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(s => {
            const data = s.payload.doc.data();
            const id = s.payload.doc.id;
            return { id, ...data } as Assessmentitemobservation;
          });
        })
      );
  }
}
