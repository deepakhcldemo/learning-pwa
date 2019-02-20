import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable()
export class StudentComponentService {

  private _selectedStudentIndex = new BehaviorSubject<number>(0);

  constructor() { }

  /**
   * This function is used to set the index of currently selected student from student list
   * @param index Index of selected student from student list
   */
  setCurrentStudentIndex(index: number) {
    this._selectedStudentIndex.next(index);
  }

  /**
   * This function is used to get the index of currently selected student from student list
   */
  getCurrentStudentIndex(): Observable<number> {
    return this._selectedStudentIndex.asObservable();
  }
}
