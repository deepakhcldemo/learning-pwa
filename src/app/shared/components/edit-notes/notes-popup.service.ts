import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotesDetail } from '../../../models/notes.model';

@Injectable()
export class NotesPopupService {
    _openNotePopupState: Subject<boolean> = new Subject();
    _noteDetails: Subject<NotesDetail> = new Subject();

    // /**
    //  * set note popup open/close status
    //  * @param value open/close status as boolean
    //  */
    // setNotePopupState(value) {
    //     this._openNotePopupState.next(value);
    // }

    /**
     * get note popup open/close status
     */
    // getNotePopupState() {
    //     return this._openNotePopupState;
    // }

    // /**
    //  * set notes list
    //  * @param value note list
    //  */
    // setNoteDetails(value) {
    //     this._noteDetails.next(value);
    // }

    // /**
    //  * get notes list
    //  */
    // getNoteDetails() {
    //     return this._noteDetails;
    // }

    // getNotePopupState() {
    //     let noteState;
    //     this._openNotePopupState.subscribe((notePopState) => {
    //         noteState = notePopState;
    //     });
    //     return noteState;
    // }
    // getNoteDetails() {
    //     let noteState;
    //     this._openNotePopupState.subscribe((notePopState) => {
    //         noteState = notePopState;
    //     });
    //     return noteState;
    // }
}
