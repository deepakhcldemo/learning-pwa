import { Pipe, PipeTransform } from '@angular/core';
import { Assessmentitemobservation } from 'src/app/models/assessment-detail.model';

@Pipe({
  name: 'showComment'
})
export class ShowCommentPipe implements PipeTransform {


  /**
   * Transforms show comment pipe
   * @param observedItemsList array of assessment observation
   * @param assessmentItemId assessment item id
   * @param commentType comment type (comment, media, updated comment)
   * @returns transform it will return (comment count, media comment or updated comment)
   */
  transform(observedItemsList: Array<Assessmentitemobservation>, assessmentItemId: string, showCommentType: string): any {
    let commentCount = 0;
    let mediaCount = 0;
    let updatedComment = 'Add Observations';
    if (observedItemsList && observedItemsList.length > 0) {
      const assessmentItemCountList = observedItemsList.filter(observedItem => {
        // check the observation for assessment item.
        if (observedItem.assessmentitemid === assessmentItemId) {
          return true;
        }
      });
      if (assessmentItemCountList && assessmentItemCountList.length > 0) {
        assessmentItemCountList.forEach(assessmentObservationItem => {
          // count the comment for media and comment.
          if (showCommentType === 'comment') {
            commentCount = assessmentObservationItem.commentCount;
          } else if (showCommentType === 'media') {
            mediaCount = assessmentObservationItem.mediaCommentCount;
          } else if (showCommentType === 'updatedComment') {
            updatedComment = (assessmentObservationItem.updatedComment) ? assessmentObservationItem.updatedComment : 'Add Observation';
          }
        });
      }
    }
    // On the basis of comment type(comment count | media comment count | updated comment) show the comment
    switch (showCommentType) {
      case 'comment':
        return commentCount;
      case 'media':
        return mediaCount;
      case 'updatedComment':
        return updatedComment;
      default:
        return 0;
    }
  }

}
