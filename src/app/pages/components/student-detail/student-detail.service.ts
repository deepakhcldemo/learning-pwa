import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AssessmentDetail, AssessmentItem } from 'src/app/models/assessment-detail.model';
import { Student } from 'src/app/models/student.model';

@Injectable()
export class StudentDetailService {
    private _popupStatus: Subject<boolean> = new Subject();
    private studentSubject: Subject<Student> = new Subject();
    private _currentStudentAction: Subject<any> = new Subject();
    private _assessmentDetails: AssessmentDetail;
    private _assessmentItemDetails: AssessmentItem;
    private _studentDetail: Student;

    /**
     * This function is used as subscriber to check the status of student detail popup
     * @param value boolean check the student popup status (closed/open)
     */
    setPopupStatus(value) {
        this._popupStatus.next(value);
    }

    /**
     * This function is used to get the value of student popup state(close/open).
     */
    getPopupStatus() {
        return this._popupStatus.asObservable();
    }

    /**
     * This function is used to set the assessment details for current student in *assessment
     * @param value Object assessment details.
     */
    setAssessmentDetails(value) {
        this._assessmentDetails = value;
    }

    /**
     * This function is used to get the assessment details for current student.
     */
    getAssessmentDetails() {
        return this._assessmentDetails;
    }

    /**
     * This function is used to set the assessment item details for current student.
     * @param value Object assessment item details.
     */
    setAssessmentItemDetails(value) {
        this._assessmentItemDetails = value;
    }

    /**
     * This function is used to get the assessment item details for current student.
     */
    getAssessmentItemDetails() {
        return this._assessmentItemDetails;
    }

    /**
     * This function is used to set the currently open student.
     * @param value Object student details information.
     */
    setStudentDetail(value) {
        this._studentDetail = value;
        this.studentSubject.next(value);
    }

    /**
     * This function is used to get the student details open in assessment.
     */
    getStudentDetail() {
        return this._studentDetail;
    }

    /**
     * Ths function is used to get the current student detail in the form of observable.
     */
    getStudentDetailSubscriber() {
        return this.studentSubject;
    }

    /**
     * Sets current student action for ongoing student detail.
     * @param value
     */
    setCurrentStudentAction(value) {
        this._currentStudentAction.next(value);
    }

    /**
     * Gets current student action for ongoing student detail
     * @returns return the student edit action.
     */
    getCurrentStudentAction() {
        return this._currentStudentAction;
    }
}
