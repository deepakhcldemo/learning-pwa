import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { ModalService } from '../global-modal/modal.service';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-comment-popup',
  templateUrl: './comment-popup.component.html',
  styleUrls: ['./comment-popup.component.scss']
})
export class CommentPopupComponent implements OnInit {

  public commentText: string;
  public commentId: string;

  @ViewChild('comment') element: ElementRef;

  constructor(
    private modalService: ModalService,
    private commentService: CommentService
  ) {}

  ngOnInit() {
  }

  /**
    * This function is used to update the comment in assessment.
    * @param commentId commentId of selected student
    * @param comment selected comment
    * @returns void
    */
  public updateComment(commentId: string, commentValue: string): void {
    commentValue = commentValue.trim();
    this.commentService.updateCommentByCommentId(commentId, commentValue);
    this.modalService.closeModal();
  }
}
