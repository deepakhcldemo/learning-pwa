// import { TestBed } from '@angular/core/testing';
// import { ToDoService } from './todo-dal.service';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { HttpClientModule } from '@angular/common/http';
// import { AngularFireModule } from 'angularfire2';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
// import { UserService } from 'src/app/auth/user.service';
// import { IndexedDbService } from '../indexed.db.service';
// import { environment } from 'src/environments/environment';
// import { RosterService } from '../roster.service';

// describe('ToDoService', () => {
//     let userService: UserService;
//     let toDoService: ToDoService;
//     let indexedDbService: IndexedDbService;

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [
//                 NgbModule.forRoot(),
//                 HttpClientModule,
//                 AngularFireModule.initializeApp(environment.firebase),
//                 AngularFirestoreModule
//             ],
//             providers: [
//                 UserService, ToDoService, IndexedDbService, RosterService
//             ],
//             schemas: [CUSTOM_ELEMENTS_SCHEMA]
//         });
//     });

//     beforeEach(() => {
//         toDoService = TestBed.get(ToDoService);
//         userService = TestBed.get(UserService);
//         indexedDbService = TestBed.get(IndexedDbService);
//         userService.setUser(
//             {
//                 'identityId': 'ffffffff51c87040e4b07dddca2a0511'
//             }
//         );
//     });
// });




