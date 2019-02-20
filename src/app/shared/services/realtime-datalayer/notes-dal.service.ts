import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { environment } from 'src/environments/environment.nightly';
import { FirebaseDbService } from 'src/app/shared/services/firebase.db.service';
import { map } from 'rxjs/operators';
import { FileConstants } from 'src/app/shared/constants/file-constants';
import { UserService } from 'src/app/auth/user.service';

@Injectable()
export class NotesDalService {
  dbRef: AngularFirestoreDocument;
  constructor(
    private firestoreDb: AngularFirestore,
    private firebaseDbService: FirebaseDbService,
    private userService: UserService
  ) { }

  /**
  * Returns Db reference for this firebasedb
  */
  private getDbRef() {
    return this.firestoreDb.collection(environment.firebasedb.userisbn).doc(this.userService.getCurrentUser().identityId);
  }

  /**
   * Saving note.
   * @param notedata Note details.
   */
  public saveNote(notedata: object) {
    const noteId = this.firebaseDbService.IDGenerator();
    this.firestoreDb.collection(environment.firebasedb.userisbn)
      .doc(this.userService.getCurrentUser().identityId)
      .collection(environment.firebasedb.note).doc(noteId).set({ noteid: +noteId, ...notedata });
  }
  /**
   * Deleting note by Id.
   * @param noteId noteId tobe deleted.
   */
  public deleteNoteByNoteId(noteId: string) {
    this.getDbRef().collection(environment.firebasedb.note).doc(noteId.toString()).delete();
  }

  /**
   * Update note by Id.
   * @param noteId noteId.
   * @param noteData note tobe updated
   */
  public updateNoteByNoteId(noteId: string, noteData) {
    this.getDbRef().collection(environment.firebasedb.note).doc(noteId.toString()).set(noteData, { merge: true });
  }

  /**
   * Function to fetch observation data from NotesList
   * @param classid : pass the current class
   */
  public getNotesList(classid: string) {
    return this.getDbRef().collection(environment.firebasedb.note, ref => {
      return ref.where('classid', '==', classid)
        .orderBy('createdat', 'asc');
    }).snapshotChanges()
      .pipe(map(actions => {
        return actions.map(s => {
          const data = s.payload.doc.data();
          data['types'] = FileConstants.constants.notes;
          const id = s.payload.doc.id;
          return { id, ...data };
        });
      }));
  }

  /**
   * Function used to get the Recent Notes List from the firebase
   * @param classid classid for which recent notes are requested
   */
  public getRecentNotesList(classid: string) {
    return this.getDbRef().collection(environment.firebasedb.note, ref =>
      ref.where('classid', '==', classid).limit(4).orderBy('updatedat', 'desc')).snapshotChanges()
      .pipe(map(actions => {
        return actions.map(s => {
          const data = s.payload.doc.data();
          data['types'] = FileConstants.constants.notes;
          const id = s.payload.doc.id;
          return { id, ...data };
        });
      }));
  }

  /**
   * Returns notes list on which a particular student is tagged
   * @param studentId studnet id as hash string
   */
  public getStudentNotesList(studentId: string, currentClassId: string) {
    return this.getDbRef().collection(environment.firebasedb.note, ref => {
      return ref
        .where('classid', '==', currentClassId.toString()).where('students', 'array-contains', studentId);
    }).snapshotChanges()
      .pipe(map(actions => {
        return actions.map(s => {
          const data = s.payload.doc.data();
          data['types'] = 'notes';
          const id = s.payload.doc.id;
          return { id, data };
        });
      }));
  }

  /**
   * Remove student tag from notes at Student page
   * @param noteInstance note object
   * @param noteData note data to be saved
   */
  public removeNotes(noteInstance, noteData) {
    this.getDbRef().collection(environment.firebasedb.note).doc(noteInstance.id).set(
      noteData
    );
  }
}
