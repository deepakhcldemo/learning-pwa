// import { async, TestBed, ComponentFixture } from '@angular/core/testing';
// import { CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';
// import { StudentComponent } from './student.component';
// import { DateFormatPipe } from 'src/app/shared/pipes/date-format.pipe';
// import { HeaderService } from 'src/app/shared/components/header/header.service';
// import { HttpClientModule } from '@angular/common/http';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
// import { AngularFireModule } from 'angularfire2';
// import { environment } from 'src/environments/environment';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { IndexedDbService } from 'src/app/shared/services/indexed.db.service';
// import { AssessmentService } from 'src/app/shared/services/assessment.service';
// import { FirebaseDbService } from 'src/app/shared/services/firebase.db.service';
// import { CustomErrorHandlerService } from 'src/app/shared/services/custom.errorhandler.service';
// import { AlertService } from 'src/app/shared/components/alert/alert.service';
// import { AccordionService } from 'src/app/shared/services/accordion.service';
// import { RouterTestingModule } from '@angular/router/testing';
// import { NotesService } from 'src/app/shared/services/notes.service';
// import { MediaService } from 'src/app/shared/services/media.service';
// import { UploadFileService } from 'src/app/shared/services/upload-file.service';
// import { ModalService } from 'src/app/shared/components/global-modal/modal.service';
// import { MediaPopupService } from 'src/app/shared/components/media-popup/media-popup.service';
// import { NotesPopupService } from 'src/app/shared/components/edit-notes/notes-popup.service';
// import { of } from 'rxjs';
// import { Notes } from 'src/app/models/notes';
// import { AssessmentDetail, Product } from 'src/app/models/assessment-detail.model';
// import { TelemetryService } from 'src/app/shared/services/telemetry.service';
// import { TruncatePipe } from 'src/app/shared/pipes/truncate.pipe';
// import { MediaMetaData } from 'src/app/models/media.model';
// import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
// import { Router } from '@angular/router';
// import { UniqueArrayPipe } from 'src/app/shared/pipes/unique-array.pipe';
// import { FooterService } from 'src/app/shared/components/footer/footer.service';
// import { CommentDalService } from 'src/app/shared/services/realtime-datalayer/comment-dal.service';
// import { ObservationDalService } from 'src/app/shared/services/realtime-datalayer/observation-dal.service';
// import { ProductService } from 'src/app/shared/services/product.service';
// import { StudentService } from 'src/app/shared/services/student.service';
// import { StudentMockData } from 'src/app/shared/mock-data/student.mock.data';
// import { ExportService } from 'src/app/shared/export.service';
// import { FileConstants } from 'src/app/shared/constants/file-constants';
// import { RosterService } from 'src/app/shared/services/roster.service';
// import { UserService } from 'src/app/auth/user.service';


// describe('StudentComponent', () => {
//     let component: StudentComponent;
//     let fixture: ComponentFixture<StudentComponent>;
//     let userService: UserService;
//     let assessmentService: AssessmentService;
//     let observationDalService: ObservationDalService;
//     let accordionService: AccordionService;
//     let mediaService: MediaService;
//     let customModalService: ModalService;
//     let mediaPopupService: MediaPopupService;
//     let notesService: NotesService;
//     let productService: ProductService;
//     let studentService: StudentService;

//     const mockRouter = {
//         navigate: jasmine.createSpy('navigate')
//     };

//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             declarations: [StudentComponent,
//                 DateFormatPipe,
//                 TruncatePipe,
//                 UniqueArrayPipe
//             ],
//             providers: [HeaderService,
//                 AssessmentService,
//                 IndexedDbService,
//                 UserService,
//                 FirebaseDbService,
//                 CustomErrorHandlerService,
//                 AlertService,
//                 AccordionService,
//                 NotesService,
//                 MediaService,
//                 UploadFileService,
//                 ModalService,
//                 MediaPopupService,
//                 NotesPopupService,
//                 TelemetryService,
//                 FooterService,
//                 HeaderService,
//                 CommentDalService,
//                 ObservationDalService,
//                 ExportService,
//                 RosterService,
//                 { provide: Router, useValue: mockRouter },
//             ],
//             imports: [HttpClientModule,
//                 RouterTestingModule,
//                 AngularFirestoreModule,
//                 AngularFireModule.initializeApp(environment.firebase),
//                 AngularFirestoreModule,
//                 AngularFireDatabaseModule,
//                 NgbModalModule,
//             ],
//             schemas: [CUSTOM_ELEMENTS_SCHEMA]
//         })
//             .compileComponents();
//     }));

//     beforeEach(() => {
//         fixture = TestBed.createComponent(StudentComponent);
//         component = fixture.componentInstance;
//         userService = TestBed.get(UserService);
//         assessmentService = TestBed.get(AssessmentService);
//         observationDalService = TestBed.get(ObservationDalService);
//         customModalService = TestBed.get(ModalService);
//         studentService = TestBed.get(StudentService);
//         productService = TestBed.get(ProductService);
//         userService.setUser({ identityId: 'ffffffff54738483e4b001bd4b61aaf0' });
//         productService.setCurrentProduct('336566');
//         component.students = [
//             {
//                 'avatar': '0a',
//                 'emailAddress': 'emailaddress@pearson.com',
//                 'firstName': '0911',
//                 'fullName': '0911 adaptive',
//                 'lastName': 'adaptive',
//                 'userId': 'ffffffff59b667fd45d99156d4fa1d53'
//             },
//             {
//                 'avatar': '1f',
//                 'emailAddress': 'emailaddress@pearson.com',
//                 'firstName': '10',
//                 'fullName': '10 feb',
//                 'lastName': 'feb',
//                 'userId': 'ffffffff5a7d7439f02ebd1b9347e303'
//             },
//             {
//                 'avatar': '1m',
//                 'emailAddress': 'emailaddress@pearson.com',
//                 'firstName': '16',
//                 'fullName': '16 mar',
//                 'lastName': 'mar',
//                 'userId': 'ffffffff5aab5e6ff856993c2720cf83'
//             },
//             {
//                 'avatar': '1a',
//                 'emailAddress': 'emailaddress@pearson.com',
//                 'firstName': '18',
//                 'fullName': '18 apr',
//                 'lastName': 'apr',
//                 'userId': 'ffffffff5ad6fa4645d9917d851248cb'
//             },
//             {
//                 'avatar': 'ad',
//                 'emailAddress': 'emailaddress@pearson.com',
//                 'firstName': 'ash',
//                 'fullName': 'ash dev',
//                 'lastName': 'dev',
//                 'userId': 'ffffffff5bb290def856993930d369a2'
//             },
//             {
//                 avatar: 'HG',
//                 emailAddress: 'emailaddress@pearson.com',
//                 firstName: 'Hermione',
//                 fullName: 'Hermione Granger',
//                 lastName: 'Granger',
//                 userId: 'ffffffff54738483e4b001bd4b61aaf0'
//             }
//         ];
//         component.selectedIndex = 0;
//         fixture.detectChanges();
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

//     it('should create StudentComponent', () => {
//         expect(component).toBeTruthy();
//     });

//     it('should have set header title', () => {
//         let headerService: HeaderService;
//         headerService = TestBed.get(HeaderService);
//         headerService.setHeaderTitle('Students');
//     });

//     it('should set mediaList', () => {
//         mediaService = TestBed.get(MediaService);
//         const mediaData = [
//             {
//                 caption: 'testing',
//                 id: '00907760',
//                 mediaDescription: '',
//                 mediaid: '00907760',
//                 mediakind: 'image', product: '1730940',
//                 students: ['ffffffff59b667fd45d99156d4fa1d53'],
//                 types: 'media'
//             }
//         ];
//         const spy = spyOn(mediaService, 'getMediaList').and.returnValue(of(mediaData));
//         const mediaSpy = spyOn(mediaService, 'setAllMedia');
//         component.ngOnInit();
//         mediaService.getMediaList().subscribe((mediaDetail) => {
//             expect(mediaDetail).not.toBeNull();
//             mediaService.setAllMedia(mediaDetail);
//         });
//         expect(spy).toHaveBeenCalled();
//         expect(mediaSpy).toHaveBeenCalledWith(mediaData);
//     });

//     it('should have called toggleEdit method', () => {
//         component.editable = false;
//         component.toggleEdit();
//         fixture.detectChanges();
//         expect(component.editable).toBe(true);
//     });

//     it('should have called setTabStatus method without tabvalue', () => {
//         component.selectedLink = 'Notes';
//         component.setTabStatus('Assessments', '');
//         fixture.detectChanges();
//         expect(component.selectedLink).toBe('Assessments');
//     });

//     it('should have called setTabStatus method with tabvalue', () => {
//         component.selectedLink = 'Notes';
//         component.setTabStatus('Assessments', 'Assessments');
//         fixture.detectChanges();
//         expect(component.selectedLink).toBe('Assessments');
//         expect(component.selectedTab).toBe('Assessments');
//     });

//     it('should call getAllStudentDetail and return list of Students', () => {
//         const response = [{
//             avatar: '0a',
//             emailAddress: 'emailaddress@pearson.com',
//             firstName: '0911',
//             fullName: '0911 adaptive',
//             lastName: 'adaptive',
//             userId: 'ffffffff59b667fd45d99156d4fa1d53'
//         }];

//         spyOn(studentService, 'getAllStudentDetail').and.returnValue(of(StudentMockData.students));

//         component.getStudents();
//         component.students = response;
//         fixture.detectChanges();

//         expect(component.students[0].emailAddress).toBe(StudentMockData.students[0].emailAddress);
//         expect(component.students[0].firstName).toBe(StudentMockData.students[0].firstName);
//         expect(component.students[0].lastName).toBe(StudentMockData.students[0].lastName);
//     });


//     it('should have called getContactInfo method', () => {
//         const student = {
//             'avatar': '0a',
//             'emailAddress': 'emailaddress@pearson.com',
//             'firstName': '0911',
//             'fullName': '0911 adaptive',
//             'lastName': 'adaptive',
//             'userId': 'ffffffff59b667fd45d99156d4fa1d53'
//         };
//         component.setStudentId = undefined;
//         component.getContactInfo();
//         component.setStudentId = student;
//         fixture.detectChanges();
//         expect(component.setStudentId).toBeDefined();
//     });

//     it('should have called editStudentNotes method', () => {
//         const response: Notes = {
//             flagged: true,
//             noteid: 59771507,
//             comment: 'to do added to check placement'
//         };
//         component.content = null;
//         component.editStudentNotes(response);
//         component.content = response;
//         fixture.detectChanges();
//         expect(component.content.comment).toBe('to do added to check placement');
//     });

//     it('should check the navigation for Ongoing Assessment', () => {
//         assessmentService = TestBed.get(AssessmentService);
//         accordionService = TestBed.get(AccordionService);
//         const checklist = {
//             type: 'ongoing',
//             path: 'Grade 2 > Unit 1 > Investigation 1 > Session 1.4',
//             parent: '3|17|64|253',
//             assessment: {
//                 'criteria': [{}],
//                 'id': '330',
//                 // tslint:disable-next-line:max-line-length
//                 'title': 'Students practice reading and writing numbers and using patterns
// in the sequence of numbers to think about what comes next.',
//                 'type': 'ongoing',
//             }
//         };
//        // component.assessmentArrayData.push(checklist as any);
//         const assessmentSpy = spyOn(assessmentService, 'setCurrentAssessment');
//         const accordianSpy = spyOn(accordionService, 'setBreadcrumb');
//         // component.openAssessment(checklist);
//         // component.assessmentItem = checklist as any;
//         // component.assessmentArrayData.map(item => {
//         //     if (item.parent === checklist.parent) {
//         //         checklist['title'] = item.assessment.title;
//         //     }
//         // });
//         assessmentService.setCurrentAssessment(checklist);
//         accordionService.setBreadcrumb(checklist.path);
//         fixture.detectChanges();
//         expect(assessmentSpy).toHaveBeenCalledWith(checklist);
//         expect(accordianSpy).toHaveBeenCalledWith(checklist.path);
//     });

//     it('should assign the value of index to selectedIndex', () => {
//         component.selectedIndex = 2;
//         component.setSelectedStudentIndex(4);
//         fixture.detectChanges();
//         expect(component.selectedIndex).toBe(4);
//     });

//     it('should assign the value of index to selectedIndex and tabindex for mobile screen', () => {
//         component.selectedTab = '';
//         const window = {
//             screen:
//             {
//                 availHeight: 728,
//                 availLeft: 0,
//                 availTop: 0,
//                 availWidth: 1366,
//                 colorDepth: 24,
//                 height: 768,
//                 width: 320
//             }
//         };
//         fixture.detectChanges();
//         expect(window.screen.width).toBeLessThan(768);
//         component.m_studentDetailsStatus = true;
//         component.studentDetailsStatus = false;
//         component.selectedIndex = 2;
//         component.setSelectedStudentIndex(4);
//         expect(component.selectedIndex).toBe(4);
//     });

//     it('should have called getNotesByStudentId method', () => {
//         notesService = TestBed.get(NotesService);
//         const noteList = [
//             {
//                 data: {
//                     comment: 'test',
//                     noteid: '82052108',
//                     product: '1730939',
//                     students: ['ffffffff59b667fd45d99156d4fa1d53'],
//                     types: 'notes'

//                 },
//                 id: '82052108'
//             }
//         ];
//         component.students[0].userId = 'ffffffff59b667fd45d99156d4fa1d53';
//         const spy = spyOn(notesService, 'getStudentNotesList').and.returnValue(of(noteList));
//         // component.getNotesByStudentId();
//         // notesService.getStudentNotesList(component.students[4].userId).subscribe(notes => {
//         //     expect(notes).not.toBeNull();
//         // });
//         fixture.detectChanges();
//         expect(spy).toHaveBeenCalledWith(component.students[4].userId);
//     });


//     it('should have called selectStudentNotes method', () => {
//         const noteList = [
//             {
//                 data: {
//                     comment: 'test',
//                     noteid: '82052108',
//                     product: '1730939',
//                     students: ['ffffffff59b667fd45d99156d4fa1d53'],
//                     types: 'notes'

//                 },
//                 id: '82052108'
//             }
//         ];
//         const spy = spyOn(component, 'getNotesByStudentId').and.returnValue(of(noteList));
//         component.selectStudentNotes();
//         component.getNotesByStudentId().subscribe(notes => {
//             component.noteList = notes;
//             component.noteList.map((noteItem) => {
//                 noteItem.data.id = noteItem.id;
//             });
//             expect(noteList.length).toBeGreaterThan(0);
//             component.showNoRec = false;
//             fixture.detectChanges();
//             expect(notes[0]['data'].comment).toEqual('test');
//         });
//         fixture.detectChanges();
//         expect(spy).toHaveBeenCalled();
//     });


//     it('should have called removeNotes method', () => {
//         const noteInstance = {
//             data: {
//                 comment: 'test',
//                 noteid: 82052108,
//                 flagged: true,
//                 flaggeddate: new Date(),
//                 product: '1730939',
//                 students: ['ffffffff59b667fd45d99156d4fa1d53',
//                     'ffffffff5bb290def856993930d369a2'],
//                 types: 'notes',
//                 createdat: new Date()

//             },
//             id: '82052108'
//         };
//         component.removeNotes();
//         noteInstance.data.students.splice(0, 1);
//         const noteData = {
//             comment: noteInstance.data.comment,
//             flagged: noteInstance.data.flagged,
//             flaggeddate: noteInstance.data.flaggeddate,
//             product: noteInstance.data.product,
//             students: noteInstance.data.students,
//             createdat: noteInstance.data.createdat,
//         };
//         const spy = spyOn(notesService, 'removeNotes');
//         notesService.removeNotes(noteInstance, noteData);
//         fixture.detectChanges();
//         expect(spy).toHaveBeenCalled();
//     });

//     it('should have called getStudentMedia method', () => {
//         mediaService = TestBed.get(MediaService);
//         const mediaList: Array<MediaMetaData> =
//             [{
//                 mediaid: '12964969',
//                 caption: 'untitled',
//                 id: '12964969',
//                 classid: '0',
//                 mediaDescription: '',
//                 mediakind: 'image',
//                 product: '1730939',
//                 students: ['ffffffff59b667fd45d99156d4fa1d53',
//                     'ffffffff5bb290def856993930d369a2'],
//             }];
//         const product: Product = {
//             name: '',
//             productID: '1730939'
//         };
//         const assessmentSpy = spyOn(productService, 'getCurrentProduct').and.returnValue(product);
//         const userSpy = spyOn(mediaService, 'getStudentMedia').and.returnValue(of(mediaList));
//         component.getStudentMedia();
//         const productId = productService.getCurrentProduct().productID;
//         mediaService.getStudentMedia(component.students[0].userId).subscribe(mediaDetails => {
//             component.studentMedia.length = 0;
//             mediaDetails.map(media => {
//                 let tempMedia: any;
//                 tempMedia = media;
//                 tempMedia['type'] = FileConstants.constants.media;
//                 component.studentMedia.push(tempMedia);
//             });
//         });
//         fixture.detectChanges();
//         expect(assessmentSpy).toHaveBeenCalled();
//         expect(productId).toBe('1730939');
//         expect(userSpy).toHaveBeenCalledWith(component.students[0].userId);
//         expect(component.studentMedia[0].caption).toBe('untitled');
//     });

//     it('should sort studentList', () => {
//         const response = [
//             {
//                 'avatar': 'ad',
//                 'emailAddress': 'emailaddress@pearson.com',
//                 'firstName': 'ash',
//                 'fullName': 'ash dev',
//                 'lastName': 'dev',
//                 'userId': 'ffffffff5bb290def856993930d369a2'
//             },
//             {
//                 'avatar': '1a',
//                 'emailAddress': 'emailaddress@pearson.com',
//                 'firstName': '18',
//                 'fullName': '18 apr',
//                 'lastName': 'apr',
//                 'userId': 'ffffffff5ad6fa4645d9917d851248cb'
//             },
//             {
//                 'avatar': '0a',
//                 'emailAddress': 'emailaddress@pearson.com',
//                 'firstName': '0911',
//                 'fullName': '0911 adaptive',
//                 'lastName': 'adaptive',
//                 'userId': 'ffffffff59b667fd45d99156d4fa1d53'
//             }

//         ];
//         const userServiceSpy = spyOn(studentService, 'getAllStudentDetail').and.returnValue(of(response));
//         component.getStudents();
//         studentService.getAllStudentDetail((studentList) => {
//             component.studentList = studentList.sort(function (a, b) {
//                 const x = a.firstName.toLowerCase();
//                 const y = b.firstName.toLowerCase();
//                 if (x < y) { return -1; }
//                 if (x > y) { return 1; }
//                 return 0;
//             });
//             component.students = studentList;
//             component.getStudentAssessments();
//         });
//         expect(response).not.toBeNull();
//         expect(response.length).not.toEqual(0);
//         fixture.detectChanges();
//         expect(component.students[0].avatar).toBe('0a');
//     });

//     it('should call prepareNotesToDelete and push note object to deleteNotes list', () => {
//         const noteList = {
//             data: {
//                 comment: 'test',
//                 noteid: 82052108,
//                 flagged: true,
//                 product: '1730939',
//                 students: ['ffffffff59b667fd45d99156d4fa1d53',
//                     'ffffffff5bb290def856993930d369a2'],
//                 types: 'notes',
//                 createdat: new Date()

//             },
//             id: '82052108'
//         };
//         const checkboxEvent = { target: { checked: true } };
//         component.prepareNotesToDelete(checkboxEvent, noteList);
//         expect(checkboxEvent.target.checked).toBe(true);
//         component._deleteNotes.push(noteList);
//         fixture.detectChanges();
//         expect(component._deleteNotes[0].data.noteid).toEqual(82052108);
//     });

//     it('should call prepareNotesToDelete and remove note object from deleteNotes list when unchecked', () => {
//         const noteList = {
//             data: {
//                 comment: 'test',
//                 noteid: 82052108,
//                 flagged: true,
//                 product: '1730939',
//                 students: ['ffffffff59b667fd45d99156d4fa1d53',
//                     'ffffffff5bb290def856993930d369a2'],
//                 types: 'notes',
//                 createdat: new Date

//             },
//             id: '82052108'
//         };
//         const checkboxEvent = { target: { checked: false } };
//         component.prepareNotesToDelete(checkboxEvent, noteList);
//         expect(checkboxEvent.target.checked).toBe(false);
//         component._deleteNotes.push(noteList);
//         const notesList_length = component._deleteNotes.length;
//         const indexNumber = component._deleteNotes.indexOf(noteList);
//         component._deleteNotes.splice(indexNumber, 1);
//         fixture.detectChanges();
//         expect(notesList_length - 1).toEqual(component._deleteNotes.length);
//     });


//     it('should have called openMediaPopup method', () => {
//         mediaPopupService = TestBed.get(MediaPopupService);
//         const element: ElementRef = { nativeElement: { innerHTML: '' } };
//         const mediaObj = {
//             mediaid: '12964969',
//             caption: 'untitled',
//             id: '12964969',
//             type: 'media',
//             mediaDescription: '',
//             mediakind: 'image',
//             product: '1730939',
//             students: ['ffffffff59b667fd45d99156d4fa1d53',
//                 'ffffffff5bb290def856993930d369a2'],
//         };
//         component.openMediaPopup(mediaObj);
//         const modalSpy = spyOn(customModalService, 'getMediaPopupRef').and.returnValue(of(element));
//         const openModalSpy = spyOn(customModalService, 'openModal');
//         const mediaDetailSpy = spyOn(mediaPopupService, 'setMediaDetails');
//         const popupStateSpy = spyOn(mediaPopupService, 'setMediaPopupState');
//         const elementRef = customModalService.getMediaPopupRef();
//         customModalService.openModal(elementRef);
//         component.mediaDetails.media = mediaObj;
//         component.mediaDetails.students = component.students;
//         mediaPopupService.setMediaDetails(component.mediaDetails);
//         mediaPopupService.setMediaPopupState(true);
//         fixture.detectChanges();
//         expect(modalSpy).toHaveBeenCalled();
//         expect(openModalSpy).toHaveBeenCalledWith(elementRef);
//         expect(mediaDetailSpy).toHaveBeenCalledWith(component.mediaDetails);
//         expect(popupStateSpy).toHaveBeenCalledWith(true);
//     });

//     it('should check the navigation for Assessment Checklist', () => {
//         assessmentService = TestBed.get(AssessmentService);
//         accordionService = TestBed.get(AccordionService);
//         const checklist = {
//             type: 'ongoing',
//             path: 'Grade 2 > Unit 1 > Investigation 1 > Session 1.4',
//             parent: '3|17|64|253',
//             assessment: {
//                 'criteria': [{}],
//                 'id': '330',
//                 // tslint:disable-next-line:max-line-length
//                 'title': 'Students practice reading and writing numbers and using
// patterns in the sequence of numbers to think about what comes next.',
//                 'type': 'ongoing',
//             }
//         };
//         component.assessmentArrayData.push(checklist as any);
//         const assessmentSpy = spyOn(assessmentService, 'setCurrentAssessment');
//         const accordianSpy = spyOn(accordionService, 'setBreadcrumb');
//         component.openAssessment(checklist);
//         component.assessmentItem = checklist as any;
//         component.assessmentArrayData.map(item => {
//             expect(item.parent).toEqual(checklist.parent);
//             checklist['title'] = item.assessment.title;
//         });
//         assessmentService.setCurrentAssessment(checklist);
//         accordionService.setBreadcrumb(checklist.path);
//         fixture.detectChanges();
//         expect(checklist.assessment.type).toEqual(FileConstants.constants.checklist);
//         expect(assessmentSpy).toHaveBeenCalledWith(checklist);
//         expect(accordianSpy).toHaveBeenCalledWith(checklist.path);
//     });
//     it('should have called getStudentAssessments method and return empty list', () => {
//         const assessmentItem: AssessmentDetail = null;
//         const spy = spyOn(observationDalService, 'getObserveInformation').and.returnValue(of(assessmentItem));
//         observationDalService.getObserveInformation(component.students[0].userId).subscribe(() => {
//             component.assessmentArrayData.length = 0;
//             expect(component.assessmentArrayData.length).toEqual(0);
//             component.showNoAssessment = true;
//             fixture.detectChanges();
//         });
//         fixture.detectChanges();
//         expect(spy).toHaveBeenCalledWith(component.students[0].userId);
//         expect(component.showNoAssessment).toEqual(true);
//     });

//     it('should call openExportPopup() function', () => {
//         component.openExportPopup();
//         component.studentDetails = StudentMockData.students[0];
//         component.studentName = component.studentDetails.fullName;
//         fixture.detectChanges();
//     });

//     it('should assign the value of index to selectedIndex for mobile screen ', () => {
//         component.selectedIndex = 2;
//         const window = {
//             screen: { width: 360, height: 640 }
//         };
//         component.setSelectedStudentIndex(4);
//         expect(window.screen.width).toBeLessThan(768);
//         component.m_studentDetailsStatus = true;
//         component.studentDetailsStatus = false;
//         setTimeout(() => {
//             const element = document.getElementById('m_studentDetails');
//             if (element) {
//                 element.focus();
//             }
//         }, 1000);
//         fixture.detectChanges();
//         expect(component.selectedIndex).toBe(4);
//     });
// });

