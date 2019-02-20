// Core Imports
import { Injectable } from '@angular/core';
// Service Imports
import { IndexedDbService } from '../indexed.db.service';
// Model Imports
import { ProgramClassModel } from 'src/app/models/program.model';
import { Hierarchy } from 'src/app/models/accordion.model';
// File Constant Import
import { FileConstants } from '../../constants/file-constants';

@Injectable({
  providedIn: 'root'
})
export class HierarchyDalService {
  constructor(
    private indexedDbService: IndexedDbService
  ) { }

  /**
   * Inserts into Cache
   * @param hierarcies
   */
  public insertIntoCache(hierarcies: Object): void {
    this.indexedDbService.put(FileConstants.constants.hierarchy as string, hierarcies as Object)
      .subscribe();
  }

  /**
   * Gets hierarchy by program
   * @param programClass
   * @param callBack
   */
  public getHierarchyByProgram(programClass: ProgramClassModel, callBack: Function): void {
    const product_programId = programClass.productId + '_' + programClass.program.identifier;
    this.indexedDbService.get(FileConstants.constants.hierarchy as string, product_programId as string,
      (response: Object) => {
        response['programProduct'] = programClass;
        callBack(response as Hierarchy);
      });
  }
}
