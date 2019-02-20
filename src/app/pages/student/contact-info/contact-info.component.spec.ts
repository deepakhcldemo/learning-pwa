// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { ContactInfoComponent } from './contact-info.component';
// import { FormsModule } from '@angular/forms';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
// import { AngularFireModule } from 'angularfire2';
// import { environment } from '../../../../environments/environment';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http';
// import { IndexedDbService } from '../../../shared/services/indexed.db.service';
// import { of } from 'rxjs';
// import { NgxSpinnerService } from 'ngx-spinner';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { StudentComponent } from '../student.component';
// import { HeaderService } from 'src/app/shared/components/header/header.service';
// import { AssessmentService } from 'src/app/shared/services/assessment.service';
// import { FirebaseDbService } from 'src/app/shared/services/firebase.db.service';
// import { TelemetryService } from 'src/app/shared/services/telemetry.service';
// import { AccordionService } from 'src/app/shared/services/accordion.service';
// import { RouterTestingModule } from '@angular/router/testing';
// import { MediaService } from 'src/app/shared/services/media.service';
// import { UploadFileService } from 'src/app/shared/services/upload-file.service';
// import { CustomErrorHandlerService } from 'src/app/shared/services/custom.errorhandler.service';
// import { AlertService } from 'src/app/shared/components/alert/alert.service';
// import { ModalService } from 'src/app/shared/components/global-modal/modal.service';
// import { MediaPopupService } from 'src/app/shared/components/media-popup/media-popup.service';
// import { NotesPopupService } from 'src/app/shared/components/edit-notes/notes-popup.service';
// import { FooterService } from 'src/app/shared/components/footer/footer.service';
// import { AccessibilityService } from 'src/app/shared/services/accessibility.service';
// import { NotesService } from 'src/app/shared/services/notes.service';
// import { ContactInfoService } from './contact-info.service';
// import { CommentDalService } from 'src/app/shared/services/realtime-datalayer/comment-dal.service';
// import { ObservationDalService } from 'src/app/shared/services/realtime-datalayer/observation-dal.service';
// import { UserService } from 'src/app/auth/user.service';

// describe('ContactInfoComponent', () => {
//     let component: ContactInfoComponent;
//     let fixture: ComponentFixture<ContactInfoComponent>;
//     let userService: UserService;
//     let spiner: NgxSpinnerService;
//     let accessibilityService: AccessibilityService;
//     let contactInfoService: ContactInfoService;

//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             declarations: [ContactInfoComponent],
//             imports: [
//                 FormsModule,
//                 AngularFirestoreModule,
//                 AngularFireModule.initializeApp(environment.firebase),
//                 AngularFirestoreModule,
//                 AngularFireDatabaseModule,
//                 HttpClientModule,
//                 RouterTestingModule,
//             ],
//             providers: [
//                 ObservationDalService,
//                 CommentDalService,
//                 UserService,
//                 HttpClientModule,
//                 HttpClient,
//                 HttpHandler,
//                 IndexedDbService,
//                 NgxSpinnerService,
//                 HeaderService,
//                 NotesService,
//                 AssessmentService,
//                 FirebaseDbService,
//                 TelemetryService,
//                 AccordionService,
//                 MediaService,
//                 ContactInfoService,
//                 UploadFileService,
//                 CustomErrorHandlerService,
//                 AlertService,
//                 ModalService,
//                 MediaPopupService,
//                 NotesPopupService,
//                 StudentComponent,
//                 FooterService
//             ],
//             schemas: [CUSTOM_ELEMENTS_SCHEMA]
//         })
//             .compileComponents();
//     }));

//     beforeEach(() => {
//         fixture = TestBed.createComponent(ContactInfoComponent);
//         component = fixture.componentInstance;
//         userService = TestBed.get(UserService);
//         contactInfoService = TestBed.get(ContactInfoService);
//         component.studentId = ({
//             avatar: '0a',
//             emailAddress: 'emailaddress@pearson.com',
//             firstName: '0911',
//             fullName: '0911 adaptive',
//             lastName: 'adaptive',
//             userId: 'ffffffff59b667fd45d99156d4fa1d53'
//         });
//         userService.setUser({ identityId: 'ffffffff51c87040e4b07dddca2a0511' });
//         component.ngOnInit();
//         fixture.detectChanges();
//     });

//     it('should create contact-info component', () => {
//         expect(component).toBeTruthy();
//     });

//     it('should have called getTabIndexFirstLevelStatus method', () => {
//         accessibilityService = TestBed.get(AccessibilityService);
//         const spy = spyOn(accessibilityService, 'getTabIndexFirstLevelStatus').and.returnValue(of(true));
//         accessibilityService.getTabIndexFirstLevelStatus().subscribe(status => {
//             component.tabindexStatus = status;
//         });
//         expect(spy).toHaveBeenCalled();
//     });

//     it('should have called getContactInfo method when doc does not exist', () => {
//         const document = { exists: false };
//         const objContactInfo = {
//             'camerapermission': false,
//             'guardian': [
//                 { 'email': '', 'mob': '', 'name': '' },
//                 { 'email': '', 'mob': '', 'name': '' }
//             ]
//         };
//         const spy = spyOn(contactInfoService, 'getContactInfo').and.returnValue(of(document));
//         contactInfoService.getContactInfo(component.studentId.userId).subscribe((doc) => {
//             expect(doc.exists).toBe(false);
//             component.contactInfoEdit = Object.assign({}, objContactInfo);
//         });
//         fixture.detectChanges();
//         expect(spy).toHaveBeenCalledWith(component.studentId.userId);
//         expect(component.contactInfoEdit['camerapermission']).toEqual(false);
//     });

//     it('should have called getContactInfo method when doc exist', () => {

//         spiner = TestBed.get(NgxSpinnerService);
//         const document = {
//             exists: true,
//             data: {
//                 camerapermission: true,
//                 guardian: [
//                     {
//                         email: 'abc@xyz.com',
//                         mob: '9999999998',
//                         name: 'John Doe'
//                     },
//                     {
//                         email: 'abc@xyz.com',
//                         mob: '7777777666',
//                         name: 'Mary'
//                     }
//                 ]
//             }
//         };
//         const spy = spyOn(contactInfoService, 'getContactInfo').and.returnValue(of(document));
//         contactInfoService.getContactInfo(component.studentId.userId).subscribe((doc) => {
//             expect(doc.exists).toBe(true);
//             component.contactInfoEdit = doc.data;
//             component.contactInfo = doc.data;
//         }, error => {
//             spiner.hide();
//         });
//         fixture.detectChanges();
//         expect(spy).toHaveBeenCalledWith(component.studentId.userId);
//         expect(component.contactInfoEdit['camerapermission']).toBe(true);
//         expect(component.contactInfo['camerapermission']).toBe(true);
//     });
//     it('should have called addContactInfo method', () => {
//         const contactInfo = {
//             camerapermission: true,
//             guardian: [
//                 {
//                     email: 'abc@xyz.com',
//                     mob: '9999999998',
//                     name: 'John Doe'
//                 },
//                 {
//                     email: 'abc@xyz.com',
//                     mob: '7777777666',
//                     name: 'Mary'
//                 }
//             ]

//         };
//         component.contactInfoEdit = contactInfo;
//         const spy = spyOn(contactInfoService, 'setContactInfo');
//         const contactSpy = spyOn(component, 'getContactInfo');
//         contactInfoService.setContactInfo(component.studentId.userId, component.contactInfoEdit);
//         component.getContactInfo();
//         component.addContactInfo();
//         fixture.detectChanges();
//         expect(spy).toHaveBeenCalledWith(component.studentId.userId, component.contactInfoEdit);
//         expect(contactSpy).toHaveBeenCalled();
//     });

//     it('should have called toggleEdit method', () => {
//         component.contactInfoEdit = null;
//         component.editable = false;
//         component.toggleEdit();
//         fixture.detectChanges();
//         expect(component.contactInfoEdit).toBeDefined();
//         expect(component.contactInfoEdit.hasOwnProperty('camerapermission')).toBeDefined();
//         component.contactInfoEdit = Object.assign({}, component.objContactInfo);
//         fixture.detectChanges();
//         expect(component.editable).toEqual(true);
//         expect(component.contactInfoEdit['camerapermission']).toBe(false);

//     });

//     it('should have called ngOnDestroy method', () => {
//         const spy = spyOn(component, 'ngOnDestroy');
//         component.ngOnDestroy();
//         fixture.detectChanges();
//         expect(spy).toHaveBeenCalled();
//     });
// });
