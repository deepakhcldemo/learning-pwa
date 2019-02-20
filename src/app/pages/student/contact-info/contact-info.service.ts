import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Guardian } from 'src/app/models/guardian.model';

import { ContactInfoDalService } from 'src/app/shared/services/realtime-datalayer/contact-info-dal.service';


@Injectable()
export class ContactInfoService {

  constructor(private contactinfodalService: ContactInfoDalService) { }

  /**
    * Get Contact details for student
    * @param userId studentid for whicg student details is required
    */
  getContactInfo(studentId: string): Observable<firebase.firestore.DocumentSnapshot> {
    return this.contactinfodalService.getContactInfo(studentId);
  }

  /**
   * Save contact details for studenr
   * @param userId studentid of student for which contact details has to be saved
   * @param contactInfo contact info object
   */
  setContactInfo(studentId: string, contactInfo: Guardian): Promise<void> {
    return this.contactinfodalService.setContactInfo(studentId, contactInfo);
  }
}
