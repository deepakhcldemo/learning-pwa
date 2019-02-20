import { Injectable } from '@angular/core';
import { CommentDalService } from './realtime-datalayer/comment-dal.service';
import { TeacherClassModel } from 'src/app/models/class.model';
import { ProgramClassModel } from 'src/app/models/program.model';
import { AssessmentComment } from 'src/app/models/assessment-detail.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private commentDalService: CommentDalService) { }
  /**
   * Get all assesment comments.
   */
  getAllCommentsList() {
    return this.commentDalService.getAllCommentsList();
  }

  /**
   * Get all assesment comments by programId.
   */
  getAllCommentsListByProgramId(programId: string) {
    return this.commentDalService.getAllCommentsListByProgramId(programId);
  }

  getAllCommentsListByClassAndProgramId(classId: string, programId: string) {
    return this.commentDalService.getAllCommentsListByClassAndProgramId(classId, programId);
  }
  /**
   * Gets comment on the basis of assessment id, assessment item id, assessment parent, class and program id
   * @param assessmentId assessment id
   * @param assessmentItemId assessment item id
   * @param assessmentParent assessment parent
   * @param classObject class object
   * @param program program object
   * @returns observable array of comment.
   */
  getCommentByAssessmentIdAndItemId(assessmentId: string, assessmentItemId: string, assessmentParent: string,
    classObject: TeacherClassModel, program: ProgramClassModel) {
    return this.commentDalService.getCommentByAssessmentIdAndItemId(assessmentId, assessmentItemId, assessmentParent, classObject, program);
  }

  /**
   * Gets comment on the basis of assessment id, assessment item id, assessment parent, student, class and program id
   * @param assessmentId assessment id
   * @param assessmentItemId assessment item id
   * @param assessmentParent assessment parent
   * @param studentId student id.
   * @param classObject class object
   * @param program program object
   * @returns observable array of comment.
   */
  getAssessmentCommentsByStudentId(assessmentId: string, assessmentItemId: string, assessmentParent: string,
    studentId: string, classObject: TeacherClassModel, program: ProgramClassModel) {
    return this.commentDalService.getAssessmentCommentsByStudentId(assessmentId, assessmentItemId,
      assessmentParent, studentId, classObject, program);
  }

  /**
   * Saves assessment item comment
   * @param comment comment object that would save in database.
   * @returns void
   */
  saveAssessmentItemComment(comment: AssessmentComment): void {
    this.commentDalService.saveAssessmentItemComment(comment);
  }

  /**
   * Deletes assessment item comment by id
   * @param commentId comment id.
   * @returns void
   */
  deleteAssessmentItemCommentById(commentId: string): void {
    this.commentDalService.deleteAssessmentItemCommentById(commentId);
  }

  /**
   * Updates comment by comment id
   * @param commentId comment id
   * @param commentValue comment text.
   * @returns void
   */
  updateCommentByCommentId(commentId: string, commentValue: string): void {
    this.commentDalService.updateCommentByCommentId(commentId, commentValue);
  }

  getAllCommentsListBySlectedClass(selectedClass) {
    return this.commentDalService.getAllCommentsListByProgramId(selectedClass);
  }
}
