import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class FooterService {
  private _footerNavItem = new Subject<string>();
  private footerDataSource = new BehaviorSubject<boolean>(true);

  constructor() { }

  /**
* set current footer.
* @param value updated value.
*/
  updateFooterStatus(value) {
    this.footerDataSource.next(value);
  }

  /**
   * Get updated filter.
   */
  getFooterStatus() {
    return this.footerDataSource.asObservable();
  }


}
