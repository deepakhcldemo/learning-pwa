import { Injectable, ElementRef } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { ModalAlertOption, MediaMetaData } from '../../../models/media.model';
import { Student } from '../../../models/notes.model';
import { AssessmentComment } from '../../../models/assessment-detail.model';
import {FileConstants} from 'src/app/shared/constants/file-constants';
import { UserService } from 'src/app/auth/user.service';
@Injectable()
export class ModalService {

    private alertOptions: ModalAlertOption;
    isOpen: boolean;
    status: string;
    element: ElementRef;
    private _mediaList: Array<MediaMetaData>;
    private _studentDetails: Student;
    private _assessmentItemMedia = new Subject<any>();
    private _confirmNote = new Subject<boolean>();
    private _currentAssessment;
    private _popupStatus: Subject<boolean> = new Subject();
    private _assessmentMedia: Array<AssessmentComment>;
    private _popupType = FileConstants.constants.comment;
    modalRef;
    dbRef: AngularFirestoreDocument;
    mediaPopupRef: ElementRef;
    notesPopupRef: ElementRef;
    studentPopupRef: ElementRef;
    constructor(config: NgbModalConfig, private modalService: NgbModal, private db: AngularFirestore, private userService: UserService) {
        this.alertOptions = { status: 'success', message: null, code: '' };
    }

    /**
    * Setting reference of global pop up to open it.
    */
    setElement(para) {
        this.element = (para) ? para : FileConstants.constants.content;
    }

    /**
   * Getting reference of global pop up to open it.
   */
    getElement() {
        return this.element;
    }

    /**
   * Open global pop up.
   */
    openModal(param, size = 'lg') {
        this.setPopupStatus(true);
        this.modalRef = (size === 'lg') ? this.modalService.open(param, { centered: true, size: 'lg' })
            : this.modalService.open(param, { centered: true, size: 'sm' });
    }

    /**
   * Setting status of global popup.
   */
    setPopupStatus(value) {
        this._popupStatus.next(value);
    }

    /**
   * Getting reference of global pop up to open it.
   */
    getPopupStatus() {
        return this._popupStatus;
    }

    /**
   * Closing popup.
   */
    closeModal() {
        if (this.modalRef) {
            this.modalRef.close();
        }
    }

    hide() {
        this.alertOptions.message = null;
    }

    /**
     * @param value student details
     */
    setStudentDetails(value) {
        this._studentDetails = value;
    }
    /**
     * getiing student details
     */
    getStudentDetails() {
        return this._studentDetails;
    }

    /**
   * Setting medialist in global pop up.
   */
    setMediaList(value) {
        this._mediaList = value;
    }

    /**
   * Getting medialist in global pop up.
   */
    getMediaList() {
        return this._mediaList;
    }

    setAssessmentItemMedia(value) {
        this._assessmentMedia = value;
    }

    setAssessmentMedia() {
        this._assessmentItemMedia.next(this._assessmentMedia);
    }

    setCurrentAssessment(value) {
        this._currentAssessment = value;
    }

    getCurrentAssessment() {
        return this._currentAssessment;
    }

    getAssessmentItemMedia() {
        return this._assessmentMedia;
    }
    setPopupType(value) {
        this._popupType = value;
    }
    getPopupType() {
        return this._popupType;
    }
    setNotesConfirmation(value) {
        this._confirmNote.next(value);
    }
    getNotesConfirmation() {
        return this._confirmNote;
    }

    /**
     * Setting reference of media edit pop up to open it.
     */
    setMediaPopupRef(ref) {
        this.mediaPopupRef = (ref) ? ref : FileConstants.constants.content;
    }

    /**
     * Getting reference of media edit pop up to open it.
     */
    getMediaPopupRef() {
        return this.mediaPopupRef;
    }

    /**
     * Setting reference of notes edit pop up to open it.
     */
    setNotesPopupRef(ref) {
        this.notesPopupRef = (ref) ? ref : FileConstants.constants.content;
    }

    /**
     * Getting reference of notes edit pop up to open it.
     */
    getNotesPopupRef() {
        return this.notesPopupRef;
    }
}
