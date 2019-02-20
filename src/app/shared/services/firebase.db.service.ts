import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { FileConstants } from 'src/app/shared/constants/file-constants';
import { UserService } from 'src/app/auth/user.service';

@Injectable()
export class FirebaseDbService {
    private dbRef: AngularFirestoreDocument;
    constructor(private userService: UserService,
        private firestoreDb: AngularFirestore,
    ) {

    }

    public _getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    IDGenerator() {
        const length = 8;
        const timestamp = +new Date;
        const ts = timestamp.toString();
        const parts = ts.split('').reverse();
        let id = '';
        for (let i = 0; i < length; ++i) {
            const index = this._getRandomInt(0, parts.length - 1);
            id += parts[index];
        }
        return id;
    }

    /**
     * Initialize firebase datababe for logged user first time
     */
    initUserCollectionInFirebase() {
        const dbref = this.firestoreDb.collection(environment.firebasedb.userisbn).doc(this.userService.getCurrentUser().identityId);
        this.dbRef = dbref;
        dbref.ref.get().then((documentSnapshot) => {
            if (!documentSnapshot.exists) {
                dbref.set({ identityid: this.userService.getCurrentUser().identityId });
                dbref.collection(environment.firebasedb.assessmentItemComment)
                    .doc('1')
                    .set({
                        assessmentid: '1',
                        assessmentitemid: '1',
                        createdat: new Date(),
                        deleted: false,
                        isobserved: false,
                        parent: '1|1',
                        path: 'abc',
                        students: [],
                        updatedat: new Date(),
                        type: FileConstants.constants.checklist,
                        comments: '',
                        ctype: FileConstants.constants.comment,
                        mediaid: '',
                        assessmentitemdetails: {},
                        classid: '1',
                        programid: '1',
                        productid: '1'

                    });
                dbref.collection(environment.firebasedb.assessmentItemObservation)
                    .doc('1').set({
                        assessmentid: '1',
                        assessmentitemid: '1',
                        createdat: new Date(),
                        isobserved: false,
                        parent: '1|1',
                        path: 'a>b',
                        students: [],
                        updatedat: new Date(),
                        type: FileConstants.constants.checklist,
                        classid: '1',
                        programid: '1',
                        productid: '1',
                        commentCount: 0,
                        mediaCommentCount: 0,
                        updatedComment: ''
                    });
                dbref.collection(environment.firebasedb.media).doc('1').set({
                    createdat: new Date(),
                    caption: 'abc', mediaDescription: '', id: '1', mediakind: FileConstants.constants.image, mediaid: '1',
                    path: '', classid: '1', students: [], updatedat: new Date()
                });
                dbref.collection(environment.firebasedb.note).doc('1')
                    .set({
                        comment: 'test', createdat: new Date(), classid: '1',
                        flaggeddate: new Date(), noteid: 1, students: [], updatedat: new Date()
                    });
                dbref.collection(environment.firebasedb.studentContactInfo)
                    .doc('1').set({ camerapermission: false, guardian: [{ email: 'abc@gmail.com', mob: 1234567890, name: 'abc' }] });
            }
        });
    }
}
