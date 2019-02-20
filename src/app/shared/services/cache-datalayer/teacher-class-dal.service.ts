// Core Imports
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Service Imports
import { IndexedDbService } from '../indexed.db.service';
// Model Imports
import { TeacherClassModel } from 'src/app/models/class.model';
// File Constant Import
import { FileConstants } from '../../constants/file-constants';

@Injectable({
  providedIn: 'root'
})
export class TeacherClassDalService {

  constructor(
    private indexedDbService: IndexedDbService
  ) { }

  public getAllClasses(callBack: Function): void {
    this.indexedDbService.getAll(FileConstants.constants.teacherClass as string, (allClasses: Array<TeacherClassModel>) => {
      callBack(allClasses as Array<TeacherClassModel>);
    });
  }

  public insertIntoCache(classList: Array<TeacherClassModel>): Observable<Object> {
    return this.indexedDbService.put(FileConstants.constants.teacherClass as string, classList as Array<TeacherClassModel>);
  }
}
