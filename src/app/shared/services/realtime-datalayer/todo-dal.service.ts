import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import {FileConstants} from 'src/app/shared/constants/file-constants';
import { UserService } from 'src/app/auth/user.service';
import { NotesDetail } from 'src/app/models/notes.model';
import { Observable } from 'rxjs';

@Injectable()
export class ToDoService {
    public constructor(private userService: UserService,
        private db: AngularFirestore
    ) { }

    /**
     * Function used to get the recent todo List from the firebase
     * @param classID classid for which recent todo items are requested
     */
    public getRecentToDoList(classID: string): Observable<Array<NotesDetail>> {
        return this.db.collection(environment.firebasedb.userisbn)
            .doc(this.userService.getCurrentUser().identityId).collection(environment.firebasedb.note, ref =>
                ref.where('flagged', '==', true)
                    .where('classid', '==', classID).limit(10).orderBy('updatedat', 'desc')).snapshotChanges()
            .pipe(map(actions => {
                return actions.map(s => {
                    const data = s.payload.doc.data();
                    data['types'] = FileConstants.constants.notes;
                    const id = s.payload.doc.id;
                    return { id, ...data } as NotesDetail;
                });
            }));
    }
}
