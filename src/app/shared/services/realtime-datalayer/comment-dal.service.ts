import { Injectable } from '@angular/core';
import { FirebaseDbService } from '../firebase.db.service';
import { CustomErrorHandlerService } from '../custom.errorhandler.service';
import { AngularFirestore, AngularFirestoreDocument, DocumentData } from 'angularfire2/firestore';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { AssessmentComment } from 'src/app/models/assessment-detail.model';
import { UserService } from 'src/app/auth/user.service';
import { ProgramClassModel } from 'src/app/models/program.model';
import { TeacherClassModel } from 'src/app/models/class.model';
import { Observable } from 'rxjs';

@Injectable()
export class CommentDalService {
    private dbRef: AngularFirestoreDocument;

    public constructor(private firebaseDbService: FirebaseDbService,
        private errorHandler: CustomErrorHandlerService,
        private db: AngularFirestore, private userService: UserService) {

    }

    /**
    * Function to fetch comment data from assessmentItemComment
    * @param studentId
    */
    public getCommentsByClassIdAndStudentId(studentId: string, classId: string): Observable<Array<Comment>> {
        this.dbRef = this.db.collection(environment.firebasedb.userisbn).doc(this.userService.getCurrentUser().identityId);
        return this.dbRef.collection(environment.firebasedb.assessmentItemComment, ref =>
            ref.where('classid', '==', classId).where('students', 'array-contains', studentId)
        ).snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data();
                    return data as Comment;
                });
            }));
    }

    /**
     * This function is used to delete the assessment item comment document by id
     *
     * @param assessmentCommentId assessment item comment document id
     */
    public deleteAssessmentItemCommentById(assessmentCommentId: string): void {
        this.db.collection(environment.firebasedb.userisbn)
            .doc(this.userService.getCurrentUser().identityId)
            .collection(environment.firebasedb.assessmentItemComment).doc(assessmentCommentId).delete();
    }


    /**
     * Gets assessment comments for student
     * @param assessmentId assessment id
     * @param assessmentItemId assessment item id
     * @param parent assessment parent
     * @param studentId student id
     * @param classObject class object
     * @param programObject program object
     * @returns {array} all assessment comment for student.
     */
    public getAssessmentCommentsByStudentId(assessmentId: string, assessmentItemId: string,
        parent: string, studentId: string, classObject: TeacherClassModel, programObject: ProgramClassModel)
        : Observable<Array<AssessmentComment>> {
        return this.db.collection(environment.firebasedb.userisbn)
            .doc(this.userService.getCurrentUser().identityId)
            .collection(environment.firebasedb.assessmentItemComment,
                ref => {
                    return ref.where('assessmentid', '==', assessmentId)
                        .where('assessmentitemid', '==', assessmentItemId)
                        .where('parent', '==', parent)
                        .where('students', 'array-contains', studentId)
                        .where('classid', '==', classObject.classId)
                        .where('programid', '==', programObject.program.identifier)
                        .where('productid', '==', programObject.productId)
                        .orderBy('createdat', 'asc');
                }).snapshotChanges().pipe(
                    map(actions => {
                        return actions.map(assessmentListItem => {
                            const data = assessmentListItem.payload.doc.data();
                            const id = assessmentListItem.payload.doc.id;
                            return { id, ...data } as AssessmentComment;
                        });
                    }));
    }

    /**
     * This function is used to save the assessment item comment and media
     *
     * @param commentData assessment item object going to save inside firebase.
     */
    public saveAssessmentItemComment(commentData: AssessmentComment): void {
        this.db.collection(environment.firebasedb.userisbn)
            .doc(this.userService.getCurrentUser().identityId).
            collection(environment.firebasedb.assessmentItemComment).doc(this.firebaseDbService.IDGenerator()).set(commentData);
    }

    /**
     * Used to update any comment for a student
     * @param commentId ID of the comment to update
     * @param commentValue updated comment object
     */
    public updateCommentByCommentId(commentId: string, commentValue: string) {
        const dbRef = this.db.collection(environment.firebasedb.userisbn).doc(this.userService.getCurrentUser().identityId);
        return dbRef.collection(environment.firebasedb.assessmentItemComment).doc(commentId).set({
            comments: commentValue,
            updatedat: new Date()
        }, { merge: true });
    }

    /**
     * This function is used to get assessment item comments and medias.
     *
     * @returns returns the assessment item comment and media data from firebase.
     */
    public getAllCommentsList(): Observable<Array<AssessmentComment>> {
        return this.db.collection(environment.firebasedb.userisbn)
            .doc(this.userService.getCurrentUser().identityId).collection(environment.firebasedb.assessmentItemComment)
            .snapshotChanges().pipe(
                map(actions => {
                    return actions.map(a => {
                        const data = a.payload.doc.data();
                        const id = a.payload.doc.id;
                        return { id, ...data } as AssessmentComment;
                    });
                }));
    }
    /**
     * method to get all comments related to that based on the program id
     * @param programId  program id of selected program
     */
    getAllCommentsListByProgramId(programId: string) {
        const commentCollection = this.db.collection(environment.firebasedb.userisbn)
            .doc(this.userService.getCurrentUser().identityId).collection(environment.firebasedb.assessmentItemComment,
                ref => {
                    return ref
                        .where('programid', '==', programId)
                        .orderBy('createdat', 'asc');
                });
        return commentCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return { id, ...data };
                });
            }));
    }

    /**
     * method to get all comments related to class id and program id
     * @param classId  classId id of selected class
     * @param programId  program id of selected program
     */
    getAllCommentsListByClassAndProgramId(classId: string, programId: string) {
        const commentCollection = this.db.collection(environment.firebasedb.userisbn)
            .doc(this.userService.getCurrentUser().identityId).collection(environment.firebasedb.assessmentItemComment,
                ref => {
                    return ref
                        .where('programid', '==', programId)
                        .where('classid', '==', classId)
                        .orderBy('createdat', 'asc');
                });
        return commentCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return { id, ...data };
                });
            }));
    }


    /**
     * Gets comment by assessment id and item id for all students
     * @param assessmentId assessment id
     * @param assessmentItemId assessment item id
     * @param parent assessment parent
     * @param classObject class object
     * @param programObject program object
     * @returns {array} all comment list for all student
     */
    public getCommentByAssessmentIdAndItemId(assessmentId: string, assessmentItemId: string,
        parent: string, classObject: TeacherClassModel, programObject: ProgramClassModel): Observable<Array<AssessmentComment>> {
        return this.db.collection(environment.firebasedb.userisbn).doc(
            this.userService.getCurrentUser().identityId).collection(environment.firebasedb.assessmentItemComment,
                ref => {
                    return ref.where('assessmentid', '==', assessmentId)
                        .where('assessmentitemid', '==', assessmentItemId)
                        .where('parent', '==', parent)
                        .where('classid', '==', classObject.classId)
                        .where('programid', '==', programObject.program.identifier)
                        .where('productid', '==', programObject.productId)
                        .orderBy('createdat', 'asc');
                }).snapshotChanges().pipe(
                    map(actions => {
                        return actions.map(a => {
                            const data = a.payload.doc.data();
                            const id = a.payload.doc.id;
                            return { id, ...data } as AssessmentComment;
                        });
                    }));
    }
}
