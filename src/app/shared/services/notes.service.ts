import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { NotesDetail } from 'src/app/models/notes.model';
import { NotesDalService } from './realtime-datalayer/notes-dal.service';

@Injectable()
export class NotesService {
    private _openNotePopupState: Subject<boolean> = new Subject();
    private _noteDetails: Subject<NotesDetail> = new Subject();
    private addEditOperation = new BehaviorSubject('Edit');

    public constructor(
        private notesDalService: NotesDalService) {
    }

    /**
     * Saving note.
     * @param notedata Note details.
     */
    public saveNote(notedata: NotesDetail): void {
        this.notesDalService.saveNote(notedata);
    }

    /**
     * Deleting note by Id.
     * @param noteId noteId tobe deleted.
     */
    public deleteNoteByNoteId(noteId: string): void {
        this.notesDalService.deleteNoteByNoteId(noteId);
    }

    /**
     * Update note by Id.
     * @param noteId noteId.
     * @param noteData note tobe updated
     */
    public updateNoteByNoteId(noteId: string, noteData: NotesDetail): void {
        this.notesDalService.updateNoteByNoteId(noteId, noteData);
    }

    /**
     *  Get note list.
     * @param currentSelectedClass is classid for which notes list is requested
     */
    public getNotesList(currentSelectedClass: string) {
        return this.notesDalService.getNotesList(currentSelectedClass);
    }

    /**
     * Function used to get the Recent Notes List from the firebase
     * @param classid classid for which recent notes are requested
     */
    public getRecentNotesList(currentSelectedClass: string) {
        return this.notesDalService.getRecentNotesList(currentSelectedClass);
    }

    /**
     * Returns notes list on which a particular student is tagged
     * @param studentId studnet id as hash string
     */
    public getStudentNotesList(studentId: string, currentClassId: string) {
        return this.notesDalService.getStudentNotesList(studentId, currentClassId);
    }

    /**
   * Remove student tag from notes at Student page
   * @param noteInstance note object
   * @param noteData note data to be saved
   */
    public removeNotes(noteInstance, noteData: NotesDetail): void {
        this.notesDalService.removeNotes(noteInstance, noteData);
    }

    /**
     * set note popup open/close status
     * @param value open/close status as boolean
     */
    public setNotePopupState(isPopupOpen: boolean): void {
        this._openNotePopupState.next(isPopupOpen);
    }

    /**
    * set notes list
    * @param value note list
    */
    public setNoteDetails(noteDetail: NotesDetail): void {
        this._noteDetails.next(noteDetail);
    }

    /**
     * open edit notes pop up
     */
    public getNotePopupState() {
        return this._openNotePopupState;
    }

    /**
    * get notes list
    */
    public getNoteDetails() {
        return this._noteDetails.asObservable();
    }

    /**
     * Method for setting Add/Edit operation.
     * @param operation : should be either add or edit.
     */
    public setAddEditOperation(operation: string): void {
        this.addEditOperation.next(operation);
    }

    /**
     * Method for getting add/edit operation.
     */
    public getAddEditOperation(): Observable<string> {
        return this.addEditOperation.asObservable();
    }
}
