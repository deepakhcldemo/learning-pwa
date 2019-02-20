// CORE Import
import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
// Constant Import
import { FileConstants } from '../constants/file-constants';
// Model Import
import { ProgramClassModel } from 'src/app/models/program.model';
import { TeacherClassModel } from 'src/app/models/class.model';
import { ProductProgramModel } from 'src/app/models/product-program.model';
// Service Import
import { ProgramDalService } from './cache-datalayer/program-dal.service';

@Injectable({
  providedIn: 'root'
})

export class ProgramService {
  private _CURRENTProgram = FileConstants.constants.currentProgram;
  private _currentProgram = new BehaviorSubject<ProgramClassModel>(null);
  private _currentProgramObject: ProgramClassModel;
  private _currentClass: TeacherClassModel;
  private programList = new Subject<Array<ProgramClassModel>>();
  private _allProgram: Array<ProgramClassModel>;

  constructor(private programDalService: ProgramDalService) { }

  /**
   * This function is used to set the current program details object.
   *
   * @param programObject Object having all the information about class program
   */
  public setCurrentProgram(programObject: ProgramClassModel): void {
    this._currentProgramObject = programObject;
    const currentProgram = this.getCurrentProgramFromSession();
    if (currentProgram) {
      this._currentProgram.next(currentProgram);
    } else {
      this._currentProgram.next(programObject);
      if (programObject) {
        this.setCurrentProgramInSession(programObject);
      }
    }

  }

  /**
   * This function is used to get the current program object details.
   */
  public getCurrentProgram(): Observable<ProgramClassModel> {
    return this._currentProgram.asObservable();
  }


  /**
   * Sets current program data for assessment.
   * @param programObject program object.
   * @returns void
   */
  public setCurrentProgramData(programObject: ProgramClassModel): void {
    this._currentProgramObject = programObject;
  }


  /**
   * Gets program by id
   * @param programId programid
   * @returns program by id
   */
  public getProgramById(programId: string): ProgramClassModel {
    let program: ProgramClassModel;
    if (this._allProgram && this._allProgram.length > 0) {
      this._allProgram.forEach(programInstance => {
        if (programInstance.program.identifier === programId) {
          program = programInstance;
        }
      });
      return program;
    }
  }

  /**
   * return current selected program object for assessment
   * @returns program data
   */
  public getCurrentProgramData(): ProgramClassModel {
    if (this._currentProgramObject) {
      return this._currentProgramObject;
    } else {
      const currentProgram = this.getCurrentProgramFromSession();
      return currentProgram;
    }
  }

  /**
   * set program list for selected class
   * @param teacherClass selected class object
   */
  public setProgramsByClass(teacherClass: TeacherClassModel): void {
    this._currentClass = teacherClass;
    this.programDalService.getAllPrograms(FileConstants.constants.productProgram, this.prepareProgramListByProductIds.bind(this));
  }

  /**
   * Get program list for selected class's product
   */
  private prepareProgramListByProductIds(programs: Array<ProductProgramModel>): void {
    programs.filter(program => {
      if (this._currentClass.productIds.indexOf(program.productId) > -1) {
        this.formatProgramList(program);
      }
    });
  }

  /**
   * Prepare program list as per required format
   * @param program program object
   */
  private formatProgramList(program: ProductProgramModel): void {
    const programList: Array<ProgramClassModel> = [];
    program['programDetails'].forEach((programObject) => {
      programList.push({
        'productId': program.productId,
        'teacherClass': this._currentClass,
        'program': programObject
      });
    });
    // set all program.
    this._allProgram = programList;
    this.programList.next(programList);
  }

  /**
   * Get Program list observable
   */
  public getProgramList(): Observable<Array<ProgramClassModel>> {
    return this.programList.asObservable();
  }

  /**
   * Set program in Session storage
   * @param programObject Program Object
   */
  private setCurrentProgramInSession(programObject: ProgramClassModel): void {
    sessionStorage.setItem(this._CURRENTProgram, JSON.stringify(programObject));
  }

  /**
   * Get Program from session storage
   */
  public getCurrentProgramFromSession(): ProgramClassModel {
    return JSON.parse(sessionStorage.getItem(this._CURRENTProgram));
  }

  /**
   * Clear Current Program from Session Storage
   */
  public clearProgramFromSession(): void {
    sessionStorage.removeItem(this._CURRENTProgram);
  }
}
