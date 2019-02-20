import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { IndexedDbService } from './shared/services/indexed.db.service';
import { FileConstants } from 'src/app/shared/constants/file-constants';
import { StudentService } from './shared/services/student.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = FileConstants.constants.appTitle;
  constructor(private afs: AngularFirestore,
    private idbService: IndexedDbService,
    private studentService: StudentService
  ) {
    this.afs.firestore.enablePersistence()
      .catch(function (err) {
        if (err.code === 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
        } else if (err.code === 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
        }
      });
  }
  ngOnInit() {
    this.idbService.create(this.idbService.dbSchema()).subscribe(data => {
    });
    this.studentService.setStudentBulkIds.subscribe((students) => {
      this.studentService.setStudentsDetail(students);
    });
    this.idbService.create(this.idbService.assessmentPersistantDBSchema(),
      `${FileConstants.constants.assessmentPersistantDB}`).subscribe(persistentDB => {
    });
  }
}
