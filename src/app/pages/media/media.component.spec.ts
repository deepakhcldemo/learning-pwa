
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { MediaComponent } from './media.component';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
// import { AngularFireModule } from 'angularfire2';
// import { environment } from '../../../environments/environment.prod';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { HeaderComponent } from '../../shared/components/header/header.component';
// import { DateFormatPipe } from '../../shared/pipes/date-format.pipe';
// import { FooterComponent } from '../../shared/components/footer/footer.component';
// import { HttpClient, HttpHandler } from '@angular/common/http';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { UploadFileService } from '../../shared/services/upload-file.service';
// import { MediaService } from '../../shared/services/media.service';
// import { HeaderService } from '../../shared/components/header/header.service';
// import { IndexedDbService } from '../../shared/services/indexed.db.service';
// import { CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';
// import { FirebaseDbService } from '../../shared/services/firebase.db.service';
// import { AssessmentService } from '../../shared/services/assessment.service';
// import { CustomErrorHandlerService } from '../../shared/services/custom.errorhandler.service';
// import { MediaPopupService } from '../../shared/components/media-popup/media-popup.service';
// import { Router, ActivatedRoute } from '@angular/router';
// import { of } from 'rxjs';
// import { MediaMockData } from '../../shared/services/media.service.mock.data';
// import { NotesService } from '../../shared/services/notes.service';
// import { TelemetryService } from '../../shared/services/telemetry.service';
// import { ModalService } from '../../shared/components/global-modal/modal.service';
// import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
// import { AlertService } from '../../shared/components/alert/alert.service';
// import { FooterService } from '../../shared/components/footer/footer.service';
// import { StudentListMockData } from 'src/app/shared/services/student-list.mock.data';
// import { AccessibilityService } from 'src/app/shared/services/accessibility.service';
// import { ProductService } from 'src/app/shared/services/product.service';
// import { GlobalService } from 'src/app/global.service';
// import {FileConstants} from 'src/app/shared/constants/file-constants';
// import { UserService } from 'src/app/auth/user.service';
// const fakeActivatedRoute = {
//     snapshot: { data: {} }
// } as ActivatedRoute;

// const mockRouter = {
//     navigate: jasmine.createSpy('navigate')
// };
// describe('MediaComponent', () => {
//     let component: MediaComponent;
//     let fixture: ComponentFixture<MediaComponent>;
//     let userService: UserService;
//     let headerService: HeaderService;
//     let mediaService: MediaService;
//     let assessmentService: AssessmentService;
//     let footerService: FooterService;
//     let accessibilityService: AccessibilityService;
//     const progress = { percentage: 100 };
//     let mpopupService: MediaPopupService;
//     let productService: ProductService;
//     let globalService: GlobalService;
//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             imports: [
//                 ReactiveFormsModule,
//                 FormsModule,
//                 AngularFirestoreModule,
//                 AngularFireModule.initializeApp(environment.firebase),
//                 AngularFireDatabaseModule,
//                 NgbModalModule
//             ],
//             declarations: [
//                 MediaComponent,
//                 HeaderComponent,
//                 DateFormatPipe,
//                 FooterComponent,
//             ],
//             providers: [
//                 { provide: Router, useValue: mockRouter },
//                 { provide: ActivatedRoute, useValue: fakeActivatedRoute },
//                 HttpClient,
//                 HttpHandler,
//                 HttpClientTestingModule,
//                 HeaderService,
//                 UserService,
//                 IndexedDbService,
//                 MediaService,
//                 UploadFileService,
//                 FirebaseDbService,
//                 AssessmentService,
//                 CustomErrorHandlerService,
//                 UploadFileService,
//                 IndexedDbService,
//                 AlertService,
//                 MediaPopupService,
//                 NotesService,
//                 TelemetryService,
//                 ModalService,
//                 FooterService,
//                 GlobalService
//             ],
//             schemas: [CUSTOM_ELEMENTS_SCHEMA]
//         })
//             .compileComponents();
//     }));

//     beforeEach(() => {
//         fixture = TestBed.createComponent(MediaComponent);
//         component = fixture.componentInstance;
//         userService = TestBed.get(UserService);
//         headerService = TestBed.get(HeaderService);
//         footerService = TestBed.get(FooterService);
//         productService = TestBed.get(ProductService);
//         globalService = TestBed.get(GlobalService);
//         accessibilityService = TestBed.get(AccessibilityService);
//         footerService.setFooterTitle(FileConstants.constants.mediaTitle);
//         userService.setUser(StudentListMockData.currentUser);
//         const setProduct = {
//             name: 'test',
//             productID: '336566'
//         };
//         // assessmentService.setCurrentProduct(setProduct);
//         headerService.setHeaderTitle('Media');
//         component.ngOnInit();
//         assessmentService = TestBed.get(AssessmentService);
//         productService.setCurrentProduct(setProduct);
//         accessibilityService.getTabIndexFirstLevelStatus().subscribe(levelStatus => {
//             component.tabIndexStatus = levelStatus;
//         });

//         fixture.detectChanges();
//     });

//     it('should create an media component instance', () => {
//         expect(component).toBeTruthy();
//     });

//     it('get media list method call with error response', () => {
//         mediaService = TestBed.get(MediaService);
//         const mediaListSpy = spyOn(mediaService, 'getMediaList').and.returnValue(of({
//             success: false,
//             error: 'failed to get media'
//         }));

//         mediaService.getMediaList().subscribe(media => {
//             expect(media['success']).toBe(false);
//             expect(media.length).toBeUndefined();
//             expect(media['error']).toBe('failed to get media');
//         });

//         expect(mediaListSpy).toHaveBeenCalledTimes(1);
//     });

//     it('get media list method call for failed condition', () => {
//         mediaService = TestBed.get(MediaService);
//         const mediaListSpy = spyOn(mediaService, 'getMediaList').and.returnValue(of({
//             mediaList: [],
//             mediaUndefined: undefined
//         }));

//         mediaService.getMediaList().subscribe(media => {
//             expect(media['mediaList'].length).toBe(0);
//             expect(media['mediaUndefined']).toBe(undefined);
//         });

//         expect(mediaListSpy).toHaveBeenCalledTimes(1);
//     });

//     it('get media list method call for success condition', () => {
//         mediaService = TestBed.get(MediaService);
//         const mediaListSpy = spyOn(mediaService, 'getMediaList').and.returnValue(of({
//             fileName: 'Screen Shot 2018-10-12 at 13.45.03 - Copy.png',
//             caption: 'untitled'
//         }));

//         mediaService.getMediaList().subscribe(media => {
//             expect(media['fileName']).toBe('Screen Shot 2018-10-12 at 13.45.03 - Copy.png');
//         });

//         expect(mediaListSpy).toHaveBeenCalledTimes(1);
//     });

//     it('get recent media list method call with error response', () => {
//         mediaService = TestBed.get(MediaService);
//         const mediaListSpy = spyOn(mediaService, 'getRecentMediaList').and.returnValue(of({
//             success: false,
//             error: 'failed to get recent media'
//         }));

//         // mediaService.getRecentMediaList().subscribe(media => {
//         //     expect(media['success']).toEqual(false);
//         //     expect(media['error']).toEqual('failed to get recent media');
//         // });

//         expect(mediaListSpy).toHaveBeenCalled();
//     });

//     it('get recent media list method call for failed condition', () => {
//         mediaService = TestBed.get(MediaService);
//         const mediaListSpy = spyOn(mediaService, 'getRecentMediaList').and.returnValue(of({
//             recentMediaList: [],
//             recentMediaUndefined: undefined
//         }));

//         // mediaService.getRecentMediaList().subscribe(media => {
//         //     expect(media['recentMediaList'].length).toEqual(0);
//         //     expect(media['recentMediaUndefined']).toBeUndefined();
//         // });

//         expect(mediaListSpy).toHaveBeenCalled();
//     });

//     it('get recent media list method call for success condition', () => {
//         mediaService = TestBed.get(MediaService);
//         const mediaListSpy = spyOn(mediaService, 'getRecentMediaList').and.returnValue(of({
//             fileName: 'Screen Shot 2018-10-12 at 13.45.03 - Copy.png',
//             caption: 'untitled'
//         }));

//         // mediaService.getRecentMediaList().subscribe(media => {
//         //     expect(media['fileName']).toEqual(MediaMockData[0].fileName);
//         // });

//         expect(mediaListSpy).toHaveBeenCalled();
//     });
//     // not inserting data into firebase
//     /* it('set media method call for success condition', () => {
//         mediaService = TestBed.get(MediaService);
//         const fileData = {};
//         const mediaType = 'image';
//         const spy = spyOn(mediaService, 'setMedia');
//         mediaService.setMedia(fileData, mediaType);
//         expect(spy).toHaveBeenCalled();
//         expect(spy).toHaveBeenCalledTimes(1);
//         expect(spy).toHaveBeenCalledWith(fileData, mediaType);
//     }); */
//     /* it('set media method call for error condition', () => {
//         mediaService = TestBed.get(MediaService);
//         const fileData = {};
//         const mediaType = 'image';
//         const spy = spyOn(mediaService, 'setMedia').and.throwError('error');
//         expect(spy).toThrowError('error');
//         expect(spy).toHaveBeenCalled();
//         expect(spy).toHaveBeenCalledTimes(1);
//     }); */
//     it('getAll media method call for success condition', () => {
//         const mediaList = [];
//         mediaService = TestBed.get(MediaService);
//         const fileData = {};
//         const mediaType = 'image';
//         const spy = spyOn(mediaService, 'getAllMedia').and.callFake(function () {
//             return mediaList;
//         });
//         expect(mediaService.getAllMedia()).toEqual(mediaList);
//         expect(spy).toHaveBeenCalled();
//         expect(spy).toHaveBeenCalledTimes(1);
//     });
//     it('should check the isSelected for media component', () => {
//         component.isSelected('allMedia');
//         const spy = spyOn(component, 'isSelected');
//         component.isSelected('allMedia');
//         expect(spy).toHaveBeenCalledWith('allMedia');
//         expect(spy).not.toBeFalsy();
//         expect(spy).toBeTruthy();

//     });


//     it('should check the isSelected for media component', () => {
//         component.isSelected('');
//         component.selectedLink = 'allMedia';
//         fixture.detectChanges();
//         if (!component.selectedLink) {
//             return false;
//         }
//         const spy = spyOn(component, 'isSelected');
//         expect(spy).not.toBeFalsy();
//         expect(spy).toBeTruthy();

//     });
//     it('should check the error condition in getMedia for media component', () => {
//         component.getMedia();
//         const spy = spyOn(component, 'getMedia');
//         component.getMedia();
//         expect(spy).toBeTruthy();
//         mediaService = TestBed.get(MediaService);
//         const mediaListSpy = spyOn(mediaService, 'getMediaList').and.returnValue(of({
//             success: false,
//             error: 'failed to get media'
//         }));
//         mediaService.getMediaList().subscribe(media => {
//             expect(media['success']).toBe(false);
//             expect(media['error']).toBe('failed to get media');
//         });

//         expect(mediaListSpy).toHaveBeenCalledTimes(1);
//     });
//     it('should check the deleteMedia in media component', () => {
//         component.deleteMedia();
//         const spy = spyOn(component, 'deleteMedia');
//         component.deleteItemIds = ['100001'];
//         component.deleteItemIds.length = 0;
//         component.deleteMedia();
//         expect(spy).toHaveBeenCalled();
//         expect(spy).toHaveBeenCalledWith();
//     });

//     it('should success for delete media service', () => {
//         const mediaList = [];
//         mediaService = TestBed.get(MediaService);
//         const fileData = {};
//         const mediaType = 'image';
//         const spy = spyOn(mediaService, 'deleteMedia').and.callFake(function () {
//             return mediaList;
//         });
//         mediaService.deleteMedia('100001');
//         expect(mediaService.deleteMedia('100001'));
//         expect(spy).toHaveBeenCalled();
//     });

//     // it('should check the clearIDs for media component', () => {
//     //     component.clearIDs();
//     //     const spy = spyOn(component, 'clearIDs');
//     //     component.deleteItemIds = [];
//     //     component.clearIDs();
//     //     expect(spy).toHaveBeenCalled();
//     // });

//     it('should check the toggleEdit in getMedia in media component', () => {
//         component.toggleEdit();
//         const spy = spyOn(component, 'toggleEdit').and.callThrough();
//         component.isEditable = true;
//         component.toggleEdit();
//         expect(spy).toHaveBeenCalled();
//     });

//     it('should check the selectedMediaTab in media component', () => {
//         component.selectedMediaTab(FileConstants.constants.allMedia);
//         const spy = spyOn(component, 'selectedMediaTab');
//         component.selectedMediaTab(FileConstants.constants.allMedia);
//         expect(spy).toHaveBeenCalled();
//         expect(spy).toHaveBeenCalledWith(FileConstants.constants.allMedia);
//     });
//     it('should check the selectedMediaTab in media component with "pictures"', () => {
//         component.selectedMediaTab(FileConstants.constants.pictures);
//         const spy = spyOn(component, 'selectedMediaTab');
//         component.selectedMediaTab(FileConstants.constants.pictures);
//         expect(spy).toHaveBeenCalled();
//         expect(spy).toHaveBeenCalledWith(FileConstants.constants.pictures);
//     });
//     it('should check the selectedMediaTab in media component with "Video"', () => {
//         component.selectedMediaTab(FileConstants.constants.Video);
//         const spy = spyOn(component, 'selectedMediaTab');
//         component.selectedMediaTab(FileConstants.constants.Video);
//         expect(spy).toHaveBeenCalled();
//         expect(spy).toHaveBeenCalledWith(FileConstants.constants.Video);
//     });
//     it('should have called editMedia method', () => {
//         const mediaPopupService = TestBed.get(MediaPopupService);
//         let customModalService: ModalService;
//         customModalService = TestBed.get(ModalService);
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
//         const modalSpy = spyOn(customModalService, 'getMediaPopupRef').and.returnValue(of(element));
//         const openModalSpy = spyOn(customModalService, 'openModal');
//         const mediaDetailSpy = spyOn(mediaPopupService, 'setMediaDetails');
//         const popupStateSpy = spyOn(mediaPopupService, 'setMediaPopupState');
//         const elementRef = customModalService.getMediaPopupRef();
//         customModalService.openModal(elementRef);
//         component.mediaDetails.media = mediaObj;
//         component.mediaDetails.students = component.studentList;
//         mediaPopupService.setMediaDetails(component.mediaDetails);
//         mediaPopupService.setMediaPopupState(true);
//         component.studentList = [{
//             avatar: '0a',
//             emailAddress: 'emailaddress@pearson.com',
//             firstName: '0911',
//             fullName: '0911 adaptive',
//             lastName: 'adaptive',
//             userId: 'ffffffff59b667fd45d99156d4fa1d53'
//         }, {
//             avatar: '0a',
//             emailAddress: 'emailaddress@pearson.com',
//             firstName: '0911',
//             fullName: '0911 adaptive',
//             lastName: 'adaptive',
//             userId: 'ffffffff59b667fd45d99156d4fa1d53'
//         }];
//         component.mediaDetails.media = mediaObj;
//         component.mediaDetails.students = component.studentList;
//         mpopupService = TestBed.get(MediaPopupService);
//         mpopupService.setMediaDetails(component.mediaDetails, FileConstants.constants.media);
//         mpopupService.setMediaPopupState(true);
//         accessibilityService.setTabIndexLevelStatus(false, true, false);
//         accessibilityService.setMediaPopUpTabIndexStatus(true, 1);
//         component.editMedia(mediaObj);
//         fixture.detectChanges();
//         expect(modalSpy).toHaveBeenCalled();
//         expect(openModalSpy).toHaveBeenCalledWith(elementRef);
//         expect(mediaDetailSpy).toHaveBeenCalledWith(component.mediaDetails);
//         expect(popupStateSpy).toHaveBeenCalledWith(true);
//     });

//     it('mediaToDelete call in media component', () => {
//         const mediaId = '100001';
//         const event = { 'target': { 'checked': true } };
//         component.mediaToDelete(event, mediaId);
//         const spy = spyOn(component, 'mediaToDelete');
//         component.mediaToDelete(event, mediaId);
//         expect(spy).toHaveBeenCalled();
//         expect(spy).toHaveBeenCalledWith(event, mediaId);
//     });

//     it('mediaToDelete call in media component with non checked condition', () => {
//         const mediaId = '100001';
//         const event = { 'target': { 'checked': false } };
//         component.mediaToDelete(event, mediaId);
//         const spy = spyOn(component, 'mediaToDelete');
//         component.mediaToDelete(event, mediaId);
//         expect(spy).toHaveBeenCalled();
//         expect(spy).toHaveBeenCalledWith(event, mediaId);
//     });

//     it('onFileSelected call in media component', () => {
//         const file = { target: { files: { name: 'new file', type: 'image' } } };
//         component.onFileSelected(file);
//         const spy = spyOn(component, 'onFileSelected');
//         component.onFileSelected(file);
//         expect(spy).toHaveBeenCalled();
//         expect(spy).toHaveBeenCalledWith(file);
//     });

//     // it('open call in media component', () => {
//     //     const content = { header: 'new file', footer: 'image' };
//     //     component.open(content);
//     //     const spy = spyOn(component, 'open').and.callFake(function () {
//     //         return true;
//     //     });
//     //     component.open(content);
//     //     expect(spy).toHaveBeenCalled();
//     //     expect(spy).toHaveBeenCalledWith(content);
//     // });

//     // it('getDismissReason call in media component', () => {
//     //     const resaon = 'test';
//     //     component.getDismissReason(resaon);
//     //     const spy = spyOn(component, 'getDismissReason');
//     //     component.getDismissReason(resaon);
//     //     expect(spy).toHaveBeenCalled();
//     //     expect(spy).toHaveBeenCalledWith(resaon);
//     // });
//     // it('getDismissReason call in media component with "reason === ModalDismissReasons.ESC"', () => {
//     //     const resaon = ModalDismissReasons.ESC;
//     //     component.getDismissReason(resaon);
//     //     const spy = spyOn(component, 'getDismissReason').and.returnValue(
//     //         FileConstants.constants.pressEsc);
//     //     component.getDismissReason(resaon);
//     //     expect(spy).toHaveBeenCalled();
//     //     expect(spy).toHaveBeenCalledWith(resaon);
//     // });
//     // it('getDismissReason call in media component with "reason === ModalDismissReasons.BACKDROP_CLICK"', () => {
//     //     const resaon = ModalDismissReasons.BACKDROP_CLICK;
//     //     const allMedia = [];
//     //     component.getDismissReason(resaon);
//     //     const spy = spyOn(component, 'getDismissReason');
//     //     component.getDismissReason(resaon);
//     //     expect(spy).toHaveBeenCalled();
//     //     expect(spy).toHaveBeenCalledWith(resaon);
//     // });

//     it('uploadImageData call in media component', () => {
//         const imageData = { name: 'test iamge', caption: 'test iamge' };
//         component.uploadImageData(imageData);
//         const spy = spyOn(component, 'uploadImageData');
//         component.uploadImageData(imageData);
//         expect(spy).toHaveBeenCalled();
//         expect(spy).toHaveBeenCalledWith(imageData);
//     });

//     /* it('should check indexDB insert in UploadService ', () => {
//         uploadService = TestBed.get(UploadFileService);
//         const localData = {
//             createdat: new Date(),
//             updatedat: new Date(),
//             mediaid: '1',
//             mediakind: FileConstants.constants.image,
//             product: '1',
//             mediaDescription: '',
//             caption: FileConstants.constants.untitled,
//             path: '',
//             encodedPath: '',
//             teacherId: ''

//         };
//         const IDBSpy = spyOn(uploadService, 'saveMediaInLocalDBForOfflineMode').and.returnValue(of({

//             createdat: new Date(),
//             updatedat: new Date(),
//             mediaid: '1',
//             mediakind: FileConstants.constants.image,
//             product: '1',
//             mediaDescription: '',
//             caption: FileConstants.constants.untitled,
//             path: '',
//             encodedPath: '',
//             teacherId: ''

//         }));
//         uploadService.saveMediaInLocalDBForOfflineMode(localData);
//         expect(IDBSpy).toBeTruthy();
//     }); */

//     /* it('should check indexDB insert in UploadService catch case ', () => {
//         uploadService = TestBed.get(UploadFileService);
//         const localData = {
//             createdat: new Date(),
//             updatedat: new Date(),
//             mediaid: '1',
//             mediakind: FileConstants.constants.image,
//             product: '1',
//             mediaDescription: '',
//             caption: FileConstants.constants.untitled,
//             path: '',
//             encodedPath: '',
//             teacherId: '',
//             abx: ''

//         };
//         const IDBSpy = spyOn(uploadService, 'saveMediaInLocalDBForOfflineMode').and.returnValue(of({
//             error: { message: 'error case' },
//         }));
//         uploadService.saveMediaInLocalDBForOfflineMode(localData);
//     }); */
//     /* it('should call uploadFileMetaDataToStorage method without student condition', () => {
//         const localData = {
//             createdat: new Date(),
//             updatedat: new Date(),
//             mediaid: '1',
//             mediakind: FileConstants.constants.image,
//             product: '1',
//             mediaDescription: '',
//             caption: FileConstants.constants.untitled,
//             path: '',
//             encodedPath: '',
//             teacherId: ''
//         };
//         const file = { target: { files: { name: 'new file', type: 'image' } } };
//         uploadService = TestBed.get(UploadFileService);
//         const mediaListSpy = spyOn(uploadService, 'uploadFileMetaDataToStorage').and.returnValue(of({
//             mediaList: [],
//             mediaUndefined: undefined
//         }));
//         // fileUpload: any, progress: { percentage: number }, studentData, mediaType, id, assesmentData
//         uploadService.uploadFileMetaDataToStorage(file, progress, localData, '1', {});
//         expect(mediaListSpy).toHaveBeenCalled();
//     }); */
//     /* it('should call uploadFileMetaDataToStorage method with students condition', () => {
//         const file = { target: { files: { name: 'new file', type: 'image' } } };
//         const localData = {
//             createdat: new Date(),
//             updatedat: new Date(),
//             mediaid: '1',
//             mediakind: FileConstants.constants.image,
//             product: '1',
//             mediaDescription: '',
//             caption: FileConstants.constants.untitled,
//             path: '',
//             encodedPath: '',
//             teacherId: ''

//         };
//         uploadService = TestBed.get(UploadFileService);
//         const mediaListSpy = spyOn(uploadService, 'uploadFileMetaDataToStorage').and.returnValue(of({
//             mediaList: [],
//             mediaUndefined: undefined
//         }));
//         // fileUpload: any, progress: { percentage: number }, studentData, mediaType, id, assesmentData
//         uploadService.uploadFileMetaDataToStorage(file, progress, localData, '1', {});
//         localData['student'] = ['1'];

//         expect(mediaListSpy).toHaveBeenCalled();
//     }); */

//     /**
//      * Testcases for Service__Media
//      */
//     // it('should call getMediaByIds method in media service', () => {
//     //     mediaService.getMediaById('09664367');
//     //     mediaService = TestBed.get(MediaService);
//     //     const mediaListSpy = spyOn(mediaService, 'getMediaByIds').and.returnValue(of({
//     //         mediaList: [],
//     //         mediaUndefined: undefined
//     //     }));
//     //     mediaService.getMediaById('09664367');
//     //     expect(mediaListSpy).toBeDefined();
//     // });
//     it('should call getAllMedia method in media service', () => {
//         const mediaMockData = {
//             createdat: new Date(),
//             updatedat: new Date(),
//             mediaid: '1',
//             mediakind: FileConstants.constants.image,
//             classid: '1',
//             mediaDescription: '',
//             caption: FileConstants.constants.untitled,
//             path: '',
//             encodedPath: '',
//             teacherId: '',
//             students: []
//         };
//         mediaService._mediaList = [mediaMockData];
//         mediaService.getAllMedia();
//         mediaService = TestBed.get(MediaService);
//         const mediaListSpy = spyOn(mediaService, 'getAllMedia').and.callFake(function () {
//             return mediaMockData;
//         });
//         mediaService.getAllMedia();
//         expect(mediaListSpy).toBeDefined();
//     });

//     /* it('should call setMedia method in media service with optional parameters', () => {
//         const fileData = { 'type': 'image/data' };
//         const base64Data = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
//         const assessmentData = { 'assessmentType': 'checklist' };
//         const setProduct = {
//             name: 'test',
//             productID: '336566'
//         };
//         // assessmentService.setCurrentProduct(setProduct);
//         mediaService.setMedia(fileData, base64Data, assessmentData);
//         mediaService = TestBed.get(MediaService);
//         const mediaListSpy = spyOn(mediaService, 'getAllMedia').and.callFake(function () {
//             return true;
//         });
//         mediaService.setMedia(fileData, base64Data, assessmentData);
//         expect(mediaListSpy).toBeTruthy();
//     }); */

//     it('should call getRecentMediaList method in media service', () => {
//         const fileData = {};
//         const mediaType = 'image';
//         const assessmentData = { 'assessmentType': 'checklist' };
//         // mediaService.getRecentMediaList();
//         mediaService = TestBed.get(MediaService);
//         const mediaListSpy = spyOn(mediaService, 'getRecentMediaList').and.callFake(function () {
//             return MediaMockData;
//         });
//        // mediaService.getRecentMediaList();
//         expect(mediaListSpy).toHaveBeenCalled();
//     });

//     it('should success for delete media service', () => {
//         const mediaList = [];
//         component.deleteMedia();
//         component.deleteItemIds = ['09664367'];
//         mediaService.deleteMedia(['09664367']);
//         expect(mediaService.deleteMedia).toBeTruthy();
//         mediaService = TestBed.get(MediaService);
//         const spy = spyOn(mediaService, 'deleteMedia');
//         mediaService.deleteMedia(['09664367']);
//         expect(mediaService.deleteMedia(['09664367']));
//         expect(spy).toHaveBeenCalled();
//     });
//     it('should error for delete media service', () => {
//         const mediaList = [];
//         component.deleteMedia();
//         component.deleteItemIds = ['09664367'];
//         mediaService.deleteMedia(['096643671']);
//         expect(mediaService.deleteMedia).toBeTruthy();
//         mediaService = TestBed.get(MediaService);
//         const spy = spyOn(mediaService, 'deleteMedia');
//         mediaService.deleteMedia(['096643671']);
//         expect(mediaService.deleteMedia(['096643671']));
//         expect(spy).toBeDefined();
//     });

//     // it('should success for index db service', () => {
//     //     const indexdb = TestBed.get(IndexedDbService);
//     //     indexdb.getAll(FileConstants.constants.media).subscribe(success => { });
//     //     expect(indexdb.getAll).toBeTruthy();
//     // });

//     it('should success for getMediaByProductId media service', () => {
//         const mediaList = [];
//         mediaService.getMediaByProductId('09664367');
//         expect(mediaService.deleteMedia).toBeTruthy();
//         mediaService = TestBed.get(MediaService);
//         const spy = spyOn(mediaService, 'getMediaByProductId');
//         mediaService.getMediaByProductId('09664367');
//         expect(mediaService.getMediaByProductId('09664367'));
//         expect(spy).toHaveBeenCalled();
//     });
// });
