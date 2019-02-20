import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';

import { UserService } from 'src/app/auth/user.service';

import { environment } from 'src/environments/environment';
import { Guardian } from 'src/app/models/guardian.model';

@Injectable({
  providedIn: 'root'
})
export class ContactInfoDalService {

  constructor(private db: AngularFirestore, private userService: UserService) { }

  /**
  * Get Contact details for student
  * @param userId studentid for whicg student details is required
  */
  getContactInfo(studentId: string): Observable<firebase.firestore.DocumentSnapshot> {
    const dbRef = this.db.collection(environment.firebasedb.userisbn).doc(this.userService.getCurrentUser().identityId);
    return dbRef.collection(environment.firebasedb.studentContactInfo).doc(studentId).get();
  }

  /**
   * Save contact details for student
   * @param userId studentid of student for which contact details has to be saved
   * @param contactInfo contact info object
   */
  setContactInfo(studentId: string, contactInfo: Guardian): Promise<void> {
    const dbRef = this.db.collection(environment.firebasedb.userisbn).doc(this.userService.getCurrentUser().identityId);
    return dbRef.collection(environment.firebasedb.studentContactInfo).doc(studentId).set(contactInfo);
  }
}
