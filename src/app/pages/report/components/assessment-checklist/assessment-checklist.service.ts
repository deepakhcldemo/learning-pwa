import { Injectable } from '@angular/core';
import { Subject, Subscription, Observable, forkJoin } from 'rxjs';



import { TeacherClassService } from 'src/app/shared/services/teacher-class.service';
import { AssessmentService } from 'src/app/shared/services/assessment.service';
import { ProgramService } from 'src/app/shared/services/program.service';

import { TeacherClassModel } from 'src/app/models/class.model';
import { ProgramClassModel } from 'src/app/models/program.model';
import { HierarchyAssessment } from 'src/app/models/assessment-detail.model';

import { FileConstants } from '../../../../shared/constants/file-constants';
import { CommentDalService } from 'src/app/shared/services/realtime-datalayer/comment-dal.service';
import { StudentService } from 'src/app/shared/services/student.service';
import { IProgramList } from 'src/app/models/report-checklist.model';
import { CommentService } from 'src/app/shared/services/comment.service';

@Injectable({
    providedIn: 'root'
})
export class AssessmentChecklistService {
    private allClassAssessments: Array<HierarchyAssessment>;
    private _allAssessment: Subject<Array<HierarchyAssessment>> = new Subject();
    private currentSelectedClass: TeacherClassModel;
    private selectedGrade: String = '';
    private _programList$: Subscription;
    private _assessmentDataByProgramId$: Subscription;
    private setTrackIndex = '';
    private currentClass = FileConstants.constants.currentClass;
   
    constructor(
        private teacherClassService: TeacherClassService,
        private programService: ProgramService,
        private assessmentService: AssessmentService,
        private commentService: CommentService,
        private studentService: StudentService
    ) {
    }
    /**
     * methiod to set the grade nama
     * @param gadeName  Grade name;
     */
    setGradeName(gadeName) {
        this.selectedGrade = gadeName;
    }
    /**
     * method to get grade name
     */
    getGradeName() {
        return this.selectedGrade;
    }
    /**
     * getProgramList  for selected class
     * @param callBack using call back and passing it to Component
     */
    getProgramListByClassId(callBack): void {
        if (this._programList$) {
            this._programList$.unsubscribe();
        }
        this.teacherClassService.getCurrentClass().subscribe((currentClass: TeacherClassModel) => {
            if (currentClass) {
                this.currentSelectedClass = currentClass;
            } else { // getting class from session if page is refereshed
                this.currentSelectedClass = JSON.parse(sessionStorage.getItem(this.currentClass));
            }
            // getting programList for the current class
            this._programList$ = this.programService.getProgramList().subscribe(programList => {
                if (programList) {
                    callBack(programList);
                }
            });
            this.programService.setProgramsByClass(this.currentSelectedClass);
        });
     this.programService.setProgramsByClass(this.currentSelectedClass);
    }
    /**
     * get complete Assessment data for Selected Program
     * @param seletedProgram selected Program object
     * @param callback callback used for sending hirerachy data to assessment-checklist controller
     */
    getAssessmentDataByProgramId(seletedProgram: ProgramClassModel, callback): void {
        this._assessmentDataByProgramId$ = this.assessmentService.getAssessmentProgramMapDetails()
            .subscribe((assessmentData: any) => {
                setTimeout(() => {
                    if (assessmentData) {
                        callback(assessmentData);
                    }
                }, 300);
            });
        this.assessmentService.setAssessmentProgramMapDetails(seletedProgram);
    }
    /**
     * get complete hirearachy data   for Selected Program
     * @param seletedProgram selected Program object
     * @param callback callback used for sending hirerachy data to assessment-checklist controller
     */
    getHirerachyDataByProgramID(seletedProgram: ProgramClassModel, callback): void {
        this.assessmentService.getProgramHierarchy(seletedProgram, hirerechyData => {
            if (hirerechyData) {
                callback(hirerechyData);
            }
        });
    }

    /**
  * Sets class
  * @param currentClass  current selected class object
  */
    private setAssessmentClass(currentClass: TeacherClassModel): void {
        this.assessmentService.setAssessmentClassDetailsMap(currentClass as TeacherClassModel);
    }

    /**
 * Gets all assessments for a class.
 * @param currentClass current class object
 * @returns all assessments
 */
    public getAllAssessmentsByClassId(currentClass: TeacherClassModel): Observable<Array<HierarchyAssessment>> {
        this.assessmentService.getAssessmentClassDetailsMap().subscribe((assessments: Array<HierarchyAssessment>) => {
            this.allClassAssessments = assessments;
            this._allAssessment.next(this.allClassAssessments);
        });
        this.setAssessmentClass(currentClass as TeacherClassModel);
        return this._allAssessment.asObservable() as Observable<Array<HierarchyAssessment>>;
    }

    /**
     * method to get all commentlist based on the selected program
     * @param program selected program object
     */
    public getAllCommentsListByProgramId(program: IProgramList): Observable<Array<HierarchyAssessment>> {
        return this.commentService.getAllCommentsListByClassAndProgramId(this.currentSelectedClass.classId, program.program.identifier
        );
    }
    /**
     * method to get student list based on the selected class
     * @param callBack callback method to send bakck student list to controller once its recieve
     */
    public studentDetailsByCurrentClass(callBack): void {
        if (this.currentSelectedClass && this.currentSelectedClass.studentIds) {
            this.studentService.getStudentsDetailByStudentsId(this.currentSelectedClass.studentIds, (studentList) => {
                callBack(studentList);
            });
        }
    }
    public setIndex(Index) {
        this.setTrackIndex = Index;
    }

    public getTrackIndex() {
        return this.setTrackIndex;
    }
}
