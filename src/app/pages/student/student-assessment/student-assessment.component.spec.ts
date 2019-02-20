// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { StudentAssessmentComponent } from './student-assessment.component';
// import { HttpClientModule } from '@angular/common/http';
// import { RouterTestingModule } from '@angular/router/testing';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
// import { AngularFireModule } from 'angularfire2';
// import { environment } from 'src/environments/environment';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
// import { UniqueArrayPipe } from 'src/app/shared/pipes/unique-array.pipe';
// import { StudentComponentService } from '../student-component.service';
// import { ObservationDalService } from 'src/app/shared/services/realtime-datalayer/observation-dal.service';
// import { UserService } from 'src/app/auth/user.service';

// fdescribe('StudentAssessmentComponent', () => {
//     let component: StudentAssessmentComponent;
//     let fixture: ComponentFixture<StudentAssessmentComponent>;
//     let userService: UserService;

//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             declarations: [StudentAssessmentComponent,
//                 UniqueArrayPipe],
//             providers: [StudentComponentService,
//                 ObservationDalService,
//                 UserService,
//             ],
//             imports: [HttpClientModule,
//                 RouterTestingModule,
//                 AngularFirestoreModule,
//                 AngularFireModule.initializeApp(environment.firebase),
//                 AngularFirestoreModule,
//                 AngularFireDatabaseModule,
//                 NgbModalModule,
//                 PerfectScrollbarModule
//             ],
//             schemas: [CUSTOM_ELEMENTS_SCHEMA]
//         })
//             .compileComponents();
//     }));

//     beforeEach(() => {
//         fixture = TestBed.createComponent(StudentAssessmentComponent);
//         component = fixture.componentInstance;
//         userService = TestBed.get(UserService);
//         userService.setUser({ identityId: 'ffffffff51c87040e4b07dddca2a0511' });
//         fixture.detectChanges();
//     });

//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });
// });
