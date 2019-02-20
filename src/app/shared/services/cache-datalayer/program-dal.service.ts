// Core Imports
import { Injectable } from '@angular/core';
// Service Imports
import { IndexedDbService } from '../indexed.db.service';
// File Constant Import
import { FileConstants } from '../../constants/file-constants';

@Injectable({
  providedIn: 'root'
})
export class ProgramDalService {
  constructor(
    private indexedDbService: IndexedDbService
  ) { }
  /**
   * Inserts into cache
   * @param productProgram
   */
  public insertIntoCache(productProgram: Object): void {
    this.indexedDbService.put(FileConstants.constants.productProgram as string,
      productProgram as Object
    ).subscribe();
  }

  public getAllPrograms(store: string, callBack: Function): void {
    this.indexedDbService.getAll(store as string,
      (response: Object) => {
        callBack(response as Object);
      });
  }
}
