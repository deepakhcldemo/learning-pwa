import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore, DocumentChangeAction } from 'angularfire2/firestore';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/auth/user.service';
import { MediaDalService } from '../cache-datalayer/media-dal.service';
import { Subscription, Observable } from 'rxjs';
import { FileConstants } from '../../constants/file-constants';
import { map } from 'rxjs/operators';
import { MediaMetaData, MediaUpdateDetails } from 'src/app/models/media.model';
import { CustomErrorHandlerService } from '../custom.errorhandler.service';
import { FirebaseDbService } from '../firebase.db.service';
import { storage } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class RealTimeMediaDalService {
  private _dbRef: AngularFirestoreDocument;
  constructor(
    private db: AngularFirestore,
    private userService: UserService,
    private mediaDalService: MediaDalService,
    private errorHandler: CustomErrorHandlerService,
    private firebaseDbService: FirebaseDbService
  ) { }
  /**
     * deletes selected media from firebase and IndexDB based on its ID.
     * @param mediaIds arrays are the selected media Id.
     */
  public deleteMedia(mediaIds: Array<string>): void {
    this._dbRef =
      this.db.collection(environment.firebasedb.userisbn as string)
        .doc(this.userService.getCurrentUser().identityId as string);
    mediaIds.map((iteratedMediaId: string, index: number) => {
      this.mediaDalService.deleteMedia(iteratedMediaId as string);
      this._dbRef.collection(environment.firebasedb.media as string).doc(iteratedMediaId as string).delete().then(() => {
        this.onMediaDeleteSuccessCallback(iteratedMediaId as string);
      }, (err) => { });
    });
  }
  /**
     * Determines whether media delete success callback on
     * @param iteratedMediaId string
     * @returns media delete success callback
     */
  private onMediaDeleteSuccessCallback(iteratedMediaId: string): Subscription {
    this._dbRef =
      this.db.collection(environment.firebasedb.userisbn as string)
        .doc(this.userService.getCurrentUser().identityId as string);
    const deleteMediaReference =
      this._dbRef.collection(environment.firebasedb.assessmentItemComment as string,
        (ref: firebase.firestore.CollectionReference) => {
          return ref.where('mediaid', '==', iteratedMediaId as string).where('ctype', '==', FileConstants.constants.media as string);
        });
    return deleteMediaReference.snapshotChanges().pipe(
      map((actions: Array<DocumentChangeAction<firebase.firestore.DocumentData>>) => {
        return actions.map((action: DocumentChangeAction<firebase.firestore.DocumentData>) => {
          return action.payload.doc.id as string;
        });
      })).subscribe((mediaIdReferences: Array<string>) => {
        mediaIdReferences.map((assessmentMediaId: string) => {
          this._dbRef.collection(environment.firebasedb.assessmentItemComment as string)
            .doc(assessmentMediaId.toString()).delete();
        });
      });
  }

  /**
     * This function is used to get four most recent media.
     * @param classid class id for which media list is requested
     */
  public getRecentMediaList(classid: string): Observable<Array<MediaMetaData>> {
    return this.db.collection(environment.firebasedb.userisbn as string)
      .doc(this.userService.getCurrentUser().identityId as string)
      .collection(environment.firebasedb.media as string,
        (ref: firebase.firestore.CollectionReference) =>
          ref.where('classid', '==', classid as string)
            .limit(FileConstants.constants.recentLimit as number)
            .orderBy('updatedat', 'desc'))
      .snapshotChanges().pipe(map((actions: Array<DocumentChangeAction<firebase.firestore.DocumentData>>) => {
        return actions.map((action: DocumentChangeAction<firebase.firestore.DocumentData>) => {
          const data = action.payload.doc.data() as MediaMetaData;
          data['types'] = FileConstants.constants.media;
          const id = action.payload.doc.id;
          return { id, ...data };
        });
      }));
  }
  /**
     * This function is used to get all media by class id
     *
     * @param classId class id
     */
  public getMediaByClassId(classId: string): Observable<Array<MediaMetaData>> {
    return this.db.collection(environment.firebasedb.userisbn as string)
      .doc(this.userService.getCurrentUser().identityId as string)
      .collection(environment.firebasedb.media as string,
        (ref: firebase.firestore.CollectionReference) => {
          return ref.where('classid', '==', classId as string)
            .orderBy('createdat', 'asc');
        }).snapshotChanges().pipe(map((actions: Array<DocumentChangeAction<firebase.firestore.DocumentData>>) => {
          return actions.map((action: DocumentChangeAction<firebase.firestore.DocumentData>) => {
            const firebaseMedia = action.payload.doc.data() as MediaMetaData;
            firebaseMedia['types'] = FileConstants.constants.media;
            const id = action.payload.doc.id;
            return { id, ...firebaseMedia };
          });
        }));
  }
  /**
     * Updates media details like tagged students, caption and description.
     * @param mediaId [string] id of media to be modified.
     * @param mediaObj [MediaUpdateDetails] updateed values of media oject.
     */
  public updateMediaMetaData(mediaId: string, mediaObj: MediaUpdateDetails): Promise<void> {
    return this.db.collection(environment.firebasedb.userisbn as string)
      .doc(this.userService.getCurrentUser().identityId as string)
      .collection(environment.firebasedb.media as string)
      .doc(mediaId as string)
      .set(mediaObj as MediaUpdateDetails, { merge: true });
  }
  /**
     * This function is used to get media by media and student id.
     * @param mediaId media id string
     * @param studentId student id
     */
  public getMediaByStudentAndMediaId(mediaId: string, studentId: string): Observable<Array<MediaMetaData>> {
    return this.db.collection(environment.firebasedb.userisbn as string)
      .doc(this.userService.getCurrentUser().identityId as string)
      .collection(environment.firebasedb.media as string,
        (ref: firebase.firestore.CollectionReference) => {
          return ref.where('id', '==', mediaId)
            .where('students', 'array-contains', studentId)
            .orderBy('createdat', 'asc');
        }).snapshotChanges().pipe(
          map((actions: Array<DocumentChangeAction<firebase.firestore.DocumentData>>) => {
            return actions.map((action: DocumentChangeAction<firebase.firestore.DocumentData>) => {
              const data = action.payload.doc.data() as MediaMetaData;
              const id = action.payload.doc.id;
              return { id, ...data };
            });
          }
          )
        );
  }
  /**
     * This function is used to tagged a new student inside media.
     *
     * @param mediaDetail media detail object
     * @param studentId of the student that should be tagged
     */
  public tagStudentInMedia(mediaDetail: MediaMetaData, studentId: string): Promise<void> {
    const taggedStudents = mediaDetail.students;
    taggedStudents.push(studentId);
    return this.db.collection(environment.firebasedb.userisbn as string).doc(
      this.userService.getCurrentUser().identityId as string).
      collection(environment.firebasedb.media as string).doc(mediaDetail.mediaId as string).set({
        'students': taggedStudents,
        'updatedat': new Date()
      }, { merge: true });
  }

  /**
    * Get Media list for student
    * @param studentId student id for which media details required
    *
    */
  public getStudentMedia(studentId: string, currentClassId: string): Observable<Array<MediaMetaData>> {
    const dbRef =
      this.db.collection(environment.firebasedb.userisbn as string)
        .doc(this.userService.getCurrentUser().identityId as string);
    return dbRef.collection(environment.firebasedb.media as string, (ref: firebase.firestore.CollectionReference) => {
      return ref.where('classid', '==', currentClassId.toString())
        .where('students', 'array-contains', studentId).orderBy('updatedat', 'asc');
    }).snapshotChanges().pipe(
      map((actions: Array<DocumentChangeAction<firebase.firestore.DocumentData>>) => {
        return actions.map((action: DocumentChangeAction<firebase.firestore.DocumentData>) => {
          const data = action.payload.doc.data();
          const id = data.noteid;
          return { ...data };
        });
      })
    );
  }

  /**
   * Creates update media record
   * @param tableId
   * @param firebaseDBMediaData
   */
  public createUpdateMediaRecord(tableId: string, firebaseDBMediaData: MediaMetaData): void {
    this.db.collection(environment.firebasedb.userisbn as string)
      .doc(this.userService.getCurrentUser().identityId as string)
      .collection(environment.firebasedb.media as string)
      .doc(tableId as string)
      .set(firebaseDBMediaData as MediaMetaData).then(success => {
      }, err => {
        this.errorHandler.handleError(err);
      });
  }

  /**
   * Generates fire base id
   * @returns fire base id
   */
  public generateFireBaseId(): string {
    return this.firebaseDbService.IDGenerator();
  }

  /**
   * Gets storage reference
   * @returns storage reference
   */
  public getStorageReference(): storage.Reference {
    return storage().ref();
  }
}
