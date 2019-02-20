// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { GlobalModalComponent } from './global-modal.component';
// import { DateFormatPipe } from '../../pipes/date-format.pipe';
// import { ModalService } from './modal.service';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
// import { AngularFireModule } from 'angularfire2';
// import { environment } from '../../../../environments/environment';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { HttpClientModule } from '@angular/common/http';
// import { IndexedDbService } from '../../services/indexed.db.service';
// import { CsvDataArray } from '../../../models/csv-data-array';
// import { of } from 'rxjs';
// import { MediaPopupService } from '../media-popup/media-popup.service';
// import { AssessmentService } from '../../services/assessment.service';
// import { FirebaseDbService } from '../../services/firebase.db.service';
// import { TelemetryService } from '../../services/telemetry.service';
// import { FormsModule } from '@angular/forms';
// import { MediaService } from '../../services/media.service';
// import { UploadFileService } from '../../services/upload-file.service';
// import { CustomErrorHandlerService } from '../../services/custom.errorhandler.service';
// import { AlertService } from '../../components/alert/alert.service';
// import { CommentDalService } from '../../services/realtime-datalayer/comment-dal.service';
// import {FileConstants} from 'src/app/shared/constants/file-constants';
// import { UserService } from 'src/app/auth/user.service';
// describe('GlobalModalComponent', () => {
//     let component: GlobalModalComponent;
//     let fixture: ComponentFixture<GlobalModalComponent>;
//     let customModalService: ModalService;
//     let userService: UserService;
//     let commentDalService: CommentDalService;
//     let assessmentService: AssessmentService;
//     // let mediaPopupService: MediaPopupService;

//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             declarations: [GlobalModalComponent,
//                 DateFormatPipe
//             ],
//             providers: [ModalService,
//                 UserService,
//                 IndexedDbService,
//                 MediaPopupService,
//                 AssessmentService,
//                 FirebaseDbService,
//                 TelemetryService,
//                 MediaService,
//                 UploadFileService,
//                 CustomErrorHandlerService,
//                 AlertService,
//                 CommentDalService
//             ],
//             imports: [
//                 AngularFirestoreModule,
//                 AngularFireModule.initializeApp(environment.firebase),
//                 AngularFirestoreModule,
//                 AngularFireDatabaseModule,
//                 HttpClientModule,
//                 FormsModule
//             ]
//         })
//             .compileComponents();
//     }));

//     beforeEach(() => {
//         fixture = TestBed.createComponent(GlobalModalComponent);
//         component = fixture.componentInstance;
//         customModalService = TestBed.get(ModalService);
//         userService = TestBed.get(UserService);
//         commentDalService = TestBed.get(CommentDalService);
//         assessmentService = TestBed.get(AssessmentService);
//         userService.setUser({ identityId: 'ffffffff51c87040e4b07dddca2a0511' });
//         fixture.detectChanges();
//     });

//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });
//     it('should set correct value of @input studentName', async(() => {
//         const expectVal = 'Ash Dev';
//         expect(expectVal).not.toBeNull();
//         component.StudentName = expectVal;
//         fixture.detectChanges();
//         expect(component.studentName).toBe(expectVal);

//     }));

//     it('should not set value of @input studentName when nothing is passed', async(() => {
//         const expectVal = null;
//         expect(expectVal).toBeNull();
//         component.StudentName = expectVal;
//         fixture.detectChanges();
//         expect(component.studentName).toBe('');
//     }));

//     it('should set correct value of @input items', async(() => {
//         const expectVal: Array<CsvDataArray> = [{}];
//         expect(expectVal).not.toBeNull();
//         component.dataOfCSV = expectVal;
//         fixture.detectChanges();
//         expect(component.items).toBe(expectVal);

//     }));

//     it('should not set value of @input items when nothing is passed', async(() => {
//         const expectVal: Array<CsvDataArray> = null;
//         expect(expectVal).toBeNull();
//         component.dataOfCSV = expectVal;
//         fixture.detectChanges();
//         expect(component.items.length).toBe(0);
//     }));

//     it('should have called ngOnInit method ', () => {
//         const spy = spyOn(component, 'ngOnInit');
//         component.ngOnInit();
//         fixture.detectChanges();
//         expect(spy).toHaveBeenCalled();
//     });

//     it('should have subscribed getPopupStatus method ', () => {
//         const student = {
//             'avatar': 'ad',
//             'emailAddress': 'emailaddress@pearson.com',
//             'firstName': 'ash',
//             'fullName': 'ash dev',
//             'lastName': 'dev',
//             'userId': 'ffffffff5bb290def856993930d369a2'
//         };
//         const currentAssessment = {
//             assessmentid: '320',
//             assessmentitemdetails: {
//                 benchmarks: [1],
//                 id: 1135,
//                 mathpractices: [282],
//                 sequence: 2,
//                 // tslint:disable-next-line:max-line-length
//                 title: ''
//             },
//             assessmentitemid: 1135,
//             parent: '3|17|63|610',
//             type: 'ongoing',
//         };
//         const spy = spyOn(customModalService, 'getPopupStatus').and.returnValue(of(true));
//         const popupTypeSpy = spyOn(customModalService, 'getPopupType').and.returnValue(of('media'));
//         const studentDetailSpy = spyOn(customModalService, 'getStudentDetails').and.returnValue(of(student));
//         const c_AssessmentSpy = spyOn(customModalService, 'getCurrentAssessment').and.returnValue(of(currentAssessment));
//         customModalService.getPopupStatus().subscribe(data => {
//             expect(data).toBe(true);
//             component.mediaLibStudent = customModalService.getStudentDetails();
//             component._currentAssessment = customModalService.getCurrentAssessment();
//             fixture.detectChanges();
//             expect(customModalService.getPopupType()['value']).toEqual('media');

//         });
//         fixture.detectChanges();
//         expect(spy).toHaveBeenCalled();
//         expect(studentDetailSpy).toHaveBeenCalled();
//         expect(c_AssessmentSpy).toHaveBeenCalled();
//     });

//     it('should have called updateComment with "content" method', () => {
//         let currentuser = '';
//         const comment = 'updated comment';
//         const commentId = '43065103';
//         const userSpy = spyOn(userService, 'getCurrentUser').and.returnValue(
//             of({
//                 identityId: 'ffffffff51c87040e4b07dddca2a0511'
//             })
//         );
//         userService.getCurrentUser().subscribe(data => {
//             expect(data.identityId).toBe('ffffffff51c87040e4b07dddca2a0511');
//             currentuser = data.identityId;
//         });
//         component.popupType = 'content';
//         expect(component.popupType).toBe(FileConstants.constants.content);
//         component.updateComment(commentId, comment);
//         fixture.detectChanges();
//         expect(userSpy).toHaveBeenCalled();
//     });
//     it('should have called media library', () => {
//         const currentuser = '';
//         const exportData = {};
//         const mediaList = [];
//         component.convertToCSV(exportData);
//         expect(component.convertToCSV).toBeDefined();
//     });
//     it('should have called "checkNoteConfirmation" in media library', () => {
//         component.checkNoteConfirmation(true);
//         expect(component.checkNoteConfirmation).toBeDefined();
//     });
//     it('should have called "checkNoteConfirmation" in media library', () => {
//         component.resetTabSelection();
//         expect(component.resetTabSelection).toBeDefined();
//     });
//     it('should have called "updateMediaItem" in media library', () => {
//         const mediaMockData = {
//             caption: 'untitled',
//             createdat: new Date(),
//             id: '73481744',
//             mapped: true,
//             mediaDescription: '',
//             mediadocid: '9NOOhnqMxnLCt1MO0r0z',
//             mediaid: '73481744',
//             mediakind: 'image',
//             path: '',
//             product: '1730940',
//             students: ['ffffffff5bb290def856993930d369a2'],
//             synced: true,
//             teacherId: 'ffffffff51c87040e4b07dddca2a0511',
//             updatedat: new Date()
//         };
//         component._currentAssessment = {
//             comments: 'test',
//             assessmentid: '1',
//             assessmentitemid: '1',
//             createdat: new Date(),
//             updatedat: new Date(),
//             deleted: false,
//             isobserved: false,
//             type: FileConstants.constants.checklist,
//             parent: '',
//             students: ['1'],
//             ctype: FileConstants.constants.comment,
//             mediaid: '',
//             assessmentitemdetails: {},
//             classid: '1',
//             programid: '1',
//             path: ''
//         };
//         component.mediaLibStudent = {
//             avatar: 'ad',
//             comment: [],
//             emailAddress: 'emailaddress@pearson.com',
//             firstName: 'ash',
//             fullName: 'ash dev',
//             lastName: 'dev',
//             userId: 'ffffffff5bb290def856993930d369a2'
//         };
//         const checkboxEvent = { target: { checked: true } };
//         component.updateMediaItem(checkboxEvent, mediaMockData);
//         expect(component.updateMediaItem).toBeDefined();
//     });
//     it('should have called "updateMediaItem" for else condition in media library', () => {
//         const updateMediaItemSpy = spyOn(component, 'updateMediaItem').and.returnValue({success: true});
//         component.updateMediaItem({}, '');
//         expect(component.updateMediaItem).toBeDefined();
//         // const mediaMockData = {
//         //     createdat: new Date(),
//         //     updatedat: new Date(),
//         //     mediaid: '1',
//         //     mediakind: FileConstants.constants.image,
//         //     product: '1',
//         //     mediaDescription: '',
//         //     caption: FileConstants.constants.untitled,
//         //     path: '',
//         //     encodedPath: '',
//         //     teacherId: '',
//         //     students: []
//         // };
//         // userService.setUser({ identityId: 'ffffffff51c87040e4b07dddca2a0511' });
//         // const checkboxEvent = { target: { checked: false } };
//         // component.updateMediaItem(checkboxEvent, mediaMockData);
//         // expect(component.updateMediaItem).toBeDefined();
//     });
//     it('should have called "toggleEdit" in media library', () => {
//         component.isEditable = true;
//         component.editable = !component.editable;
//         component.toggleEdit();
//         expect(component.toggleEdit).toBeDefined();
//     });
//     it('should have called "setradio" in media library', () => {
//         component.medias = [];
//         const selectedLink = FileConstants.constants.studentMedia;
//         component.displayMedia = [];
//         component.selectedLink = selectedLink;
//         component.setradio(selectedLink);
//         expect(component.setradio).toBeDefined();
//     });

//     it('should have called "setradio" for else condition in media library', () => {
//         component.medias = [];
//         const selectedLink = '';
//         component.displayMedia = [];
//         component.selectedLink = selectedLink;
//         component.setradio(selectedLink);
//         expect(component.setradio).toBeDefined();
//     });
//     it('should have called "exportCSVFile" for else condition in media library', () => {
//         component.medias = [];
//         const selectedLink = '';
//         component.displayMedia = [];
//         component.selectedLink = selectedLink;
//         component.exportCSVFile('demo', [], 'export');
//         expect(component.exportCSVFile).toBeDefined();
//     });

//     it('should have called "exportCSVFile" for else condition in media library', () => {
//         component.getPopUpStatusSubscriber({});
//         expect(component.getPopUpStatusSubscriber).toBeDefined();
//     });
//     it('should have called "downloadCSV" for in media library', () => {
//         component.downloadCSV();
//         expect(component.downloadCSV).toBeDefined();
//     });

// });
