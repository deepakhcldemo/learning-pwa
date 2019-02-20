import { Injectable } from '@angular/core';
import { ObservationDalService } from './realtime-datalayer/observation-dal.service';
import { TeacherClassModel } from 'src/app/models/class.model';
import { ProgramClassModel } from 'src/app/models/program.model';
import { Assessmentitemobservation } from 'src/app/models/assessment-detail.model';

@Injectable()
export class ObservationService {
    constructor(
        private observationDalService: ObservationDalService
    ) { }

    /**
     * Function to get the observed assesment items.
     */
    getobservedAssementItems() {
        return this.observationDalService.getobservedAssementItems();
    }


    /**
     * Gets observations by class and program id
     * @param classObject class object
     * @param program program object
     * @returns observable array of observation.
     */
    getObservationByClassAndProgramId(classObject: TeacherClassModel, program: ProgramClassModel) {
        return this.observationDalService.getAssessmentObservations(classObject.classId,
            program);
    }


    /**
     * Gets observation for student on the basis of assessment id, assessment item id, assessment parent
     * student id, class id and program id.
     * @param assessmentId assessment id
     * @param assessmentItemId assessment item id.
     * @param assessmentParent assessment parent
     * @param studentId student user id
     * @param classObject class object
     * @param program program object
     * @returns observable array of observation.
     */
    getObservationForStudent(assessmentId: string, assessmentItemId: string, assessmentParent: string,
        studentId: string, classObject: TeacherClassModel, program: ProgramClassModel) {
        return this.observationDalService.getAssessmentObservationByStudent(
            assessmentId, assessmentItemId, assessmentParent, studentId, classObject, program);
    }

    /**
     * Saves observation
     * @param observationObject create a new observation entry in database.
     * @returns void
     */
    saveObservation(observationObject: Assessmentitemobservation): void {
        this.observationDalService.saveItemObservation(observationObject);
    }

    /**
     * Updates observation
     * @param observationObject updated observation fields that should be updated.
     * @returns void
     */
    updateObservation(observationObject: Assessmentitemobservation): void {
        this.observationDalService.editItemObservation(observationObject);
    }
}
