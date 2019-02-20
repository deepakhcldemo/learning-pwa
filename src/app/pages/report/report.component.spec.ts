// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { ReportComponent } from './report.component';
// import { HeaderComponent } from 'src/app/shared/components/header/header.component';
// import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
// import { HeaderService } from 'src/app/shared/components/header/header.service';
// import { RouterTestingModule } from '@angular/router/testing';
// import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
// import { AngularFireModule } from 'angularfire2';
// import { environment } from 'src/environments/environment';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { HttpClientModule } from '@angular/common/http';
// import { IndexedDbService } from 'src/app/shared/services/indexed.db.service';
// import { AssessmentService } from 'src/app/shared/services/assessment.service';
// import { FirebaseDbService } from 'src/app/shared/services/firebase.db.service';
// import { CustomErrorHandlerService } from 'src/app/shared/services/custom.errorhandler.service';
// import { AlertService } from 'src/app/shared/components/alert/alert.service';
// import { NotesService } from 'src/app/shared/services/notes.service';
// import { MediaService } from 'src/app/shared/services/media.service';
// import { UploadFileService } from 'src/app/shared/services/upload-file.service';
// import { of } from 'rxjs';
// import { ModalService } from 'src/app/shared/components/global-modal/modal.service';
// import { TelemetryService } from 'src/app/shared/services/telemetry.service';
// import { FooterService } from 'src/app/shared/components/footer/footer.service';
// import { UserService } from 'src/app/auth/user.service';

// describe('ReportComponent', () => {
//     let component: ReportComponent;
//     let fixture: ComponentFixture<ReportComponent>;
//     let userService: UserService;

//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             declarations: [ReportComponent,
//                 HeaderComponent,
//                 FooterComponent,

//             ],
//             providers: [HeaderService,
//                 AngularFirestore,
//                 UserService,
//                 IndexedDbService,
//                 AssessmentService,
//                 FirebaseDbService,
//                 CustomErrorHandlerService,
//                 AlertService,
//                 NotesService,
//                 MediaService,
//                 UploadFileService,
//                 TelemetryService,
//                 FooterService
//             ],
//             imports: [RouterTestingModule,
//                 AngularFirestoreModule,
//                 AngularFireModule.initializeApp(environment.firebase),
//                 AngularFirestoreModule,
//                 AngularFireDatabaseModule,
//                 HttpClientModule
//             ],
//             schemas: [CUSTOM_ELEMENTS_SCHEMA]
//         })
//             .compileComponents();
//     }));

//     beforeEach(() => {
//         fixture = TestBed.createComponent(ReportComponent);
//         component = fixture.componentInstance;
//         userService = TestBed.get(UserService);
//         userService.setUser({ identityId: 'ffffffff51c87040e4b07dddca2a0511' });
//         fixture.detectChanges();
//     });

//     it('should create ReportComponent', async () => {
//         expect(component).toBeTruthy();
//     });

//     it('should return the mocked data in the subscribe', () => {
//         const spy = spyOn(userService, 'getCurrentUser').and.returnValue(
//             of({
//                 identityId: 'ffffffff51c87040e4b07dddca2a0511'
//             })
//         );
//         userService.getCurrentUser().subscribe(data => {
//             expect(data.identityId).toBe('ffffffff51c87040e4b07dddca2a0511');
//         });
//         expect(spy).toHaveBeenCalled();
//     });
//     it('should have set header title', () => {
//         let headerService: HeaderService;
//         headerService = TestBed.get(HeaderService);
//         headerService.setHeaderTitle('Reports');
//     });
//     it('should check the navigation for Observation report', () => {
//         const spy = spyOn(component, 'goToPage');
//         component.goToPage('observation');
//         expect(spy).toHaveBeenCalledWith('observation');
//     });
//     it('should check the navigation for Assessment checklist report', () => {
//         const spy = spyOn(component, 'goToPage');
//         component.goToPage('check-list');
//         expect(spy).toHaveBeenCalledWith('check-list');
//     });

// });
