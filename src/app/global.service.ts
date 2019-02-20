import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AssessmentService } from './shared/services/assessment.service';
import { TeacherClassService } from './shared/services/teacher-class.service';
import { HierarchyAssessment } from './models/assessment-detail.model';

@Injectable({
    providedIn: 'root'
})
export class GlobalService {
    private _assessmentRecord: Subject<any> = new Subject();
    private _assessmentAllRecord: Subject<any> = new Subject();
    private _allAssessmentSubscription$: Subscription;
    private _assessmentDetailsList: Array<HierarchyAssessment> = [];
    constructor(
        private assessmentService: AssessmentService,
        private teacherClassService: TeacherClassService
    ) {
        this._allAssessmentSubscription$ = this.assessmentService.getAssessmentClassDetailsMap().subscribe((result) => {
            this._assessmentDetailsList = result;
            if (this._allAssessmentSubscription$) {
                this._allAssessmentSubscription$.unsubscribe();
            }
        });
        this.teacherClassService.getCurrentClass().subscribe(currentclass => {
            if (currentclass !== null) {
                this.assessmentService.setAssessmentClassDetailsMap(currentclass);
            }
        });
    }

    getAssessmentRecord() {
        return this._assessmentRecord.asObservable();
    }

    /**
     * get all assessment
     */
    getAllAssessmentRecord() {
        return this._assessmentAllRecord.asObservable();
    }

    /**
     * customSort is used for sorting an array
     * @param arrayList : array which we need to sort
     * @param sortBy : element by which we want to sort
     * @param orderBy : this parameter should be ASC or DESC
     * @param sortByAnotherValue : another element by which we want to sort
     */
    customSort(arrayList, sortBy, orderBy, sortByAnotherValue = '') {
        arrayList.sort(function (valueList1, valueList2) {
            let value1 = '';
            let value2 = '';

            if (sortByAnotherValue) {
                if (typeof (valueList1[sortBy][sortByAnotherValue]) === 'string') {
                    value1 = valueList1[sortBy][sortByAnotherValue].toLowerCase();
                    value2 = valueList2[sortBy][sortByAnotherValue].toLowerCase();
                } else {
                    value1 = valueList1[sortBy][sortByAnotherValue];
                    value2 = valueList2[sortBy][sortByAnotherValue];
                }
            } else {
                value1 = valueList1[sortBy].toLowerCase();
                value2 = valueList2[sortBy].toLowerCase();
            }
            if (orderBy.toLowerCase() === 'asc') {
                if (value1 < value2) { return -1; }
                if (value1 > value2) { return 1; }
            } else {
                if (value2 < value1) { return -1; }
                if (value2 > value1) { return 1; }
            }
            return 0;
        });
        return arrayList;
    }

    /**
  * get assessment detaild bases on the provided id as array
  *
  * @param assessmentIDs array of id which need to be filter
  */
    getAssessmentByIds(assessmentIDs: Array<string | number>) {
        if (this._assessmentDetailsList.length > 0) {
            return this._assessmentDetailsList.filter(function (item) {
                return assessmentIDs.indexOf(item.id.toString()) > -1;
            });
        }
    }

    /**
     * This function is used to get the assessment item from navigation data on the basis
     * of assessment id
     *
     * @param assessmentId assessment item id
     */
    getAssessmentItem(assessmentId: string | number) {
        let assessmentItem,
            assessment;
        if (this._assessmentDetailsList.length > 0) {
            assessment = this._assessmentDetailsList.filter(data => {
                return data.id === assessmentId;
            });
            assessmentItem = assessment[0];
        }
        return assessmentItem;
    }
}
