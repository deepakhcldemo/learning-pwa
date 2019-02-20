// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { HttpClient, HttpHandler } from '@angular/common/http';
// import { AngularFirestore } from 'angularfire2/firestore';
// import { BehaviorSubject } from 'rxjs';
// import { IndexedDbService } from '../../services/indexed.db.service';
// import { FirebaseDbService } from '../../services/firebase.db.service';
// import { AuthTokenService } from 'src/app/auth/authtoken.service';
// import { RosterService } from '../../services/roster.service';
// import { AlertService } from '../../components/alert/alert.service';
// import { AvatarComponent } from '../avatar/avatar.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { Router, ActivatedRoute } from '@angular/router';
// import { AssessmentService } from '../../services/assessment.service';
// import { CustomErrorHandlerService } from '../../services/custom.errorhandler.service';
// import { NotesService } from '../../services/notes.service';
// import { MediaService } from '../../services/media.service';
// import { UploadFileService } from '../../services/upload-file.service';
// import { AngularFireDatabase } from 'angularfire2/database';
// import { AngularFireModule } from 'angularfire2';
// import { environment } from '../../../../environments/environment';
// import { FooterComponent } from './footer.component';
// import { FooterService } from './footer.service';
// import { TelemetryService } from '../../services/telemetry.service';
// import { Title } from '@angular/platform-browser';
// import { AccessibilityService } from '../../services/accessibility.service';
// import { AuthenticationService } from 'src/app/auth/authentication.service';
// import { UserService } from 'src/app/auth/user.service';

// const fakeActivatedRoute = {
//   snapshot: { data: {} }
// } as ActivatedRoute;

// // ADDED CLASS
// class MockRouter {
//   navigateByUrl(url: string) { return url; }
// }

// const FirestoreStub = {
//   collection: (name: string) => ({
//     doc: (_id: string) => ({
//       valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
//       set: (_d: any) => new Promise((resolve, _reject) => resolve()),
//     }),
//   }),
// };

// describe('FooterComponent', () => {
//   let component: FooterComponent;
//   let footerService: FooterService;
//   let accessibilityService: AccessibilityService;
//   let fixture: ComponentFixture<FooterComponent>;
//   const footerServ: Title = new Title('Dashboard');
//   const mockRouter = {
//     navigate: jasmine.createSpy('navigate')
//   };
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [ReactiveFormsModule, FormsModule, NgbModule, AngularFireModule.initializeApp(environment.firebase)],
//       declarations: [FooterComponent, AvatarComponent],
//       providers: [
//         { provide: Router, useValue: mockRouter }, UserService, HttpClient, HttpHandler, AssessmentService,
//         CustomErrorHandlerService,
//         {
//           provide: AngularFirestore,
//           useValue: FirestoreStub
//         },
//         IndexedDbService, AuthenticationService, FirebaseDbService,
//         AuthTokenService, RosterService,
//         AlertService, MediaService, { provide: FooterService, useValue: footerServ }, FooterService,
//          NotesService, MediaService, UploadFileService, AngularFireDatabase,
//         TelemetryService
//       ],
//     })
//       .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(FooterComponent);
//     component = fixture.componentInstance;
//     footerService = TestBed.get(FooterService);
//     accessibilityService = TestBed.get(AccessibilityService);
//     footerService.setFooterTitle('Dashboard');
//     accessibilityService.setTabIndexLevelStatus(true, true, true);
//     component.ngOnInit();
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should call Router.navigateByUrl("pages/:pageName") with the Name of the page', () => {
//     component.goToPage('dashboard');
//     // expect(mockRouter.navigate).toHaveBeenCalledWith(['pages/dashboard']);
//   });

//   it('triggerCamera call in media component', () => {
//     const file = { target: { files: { name: 'new file', type: 'image' } } };
//     component.triggerCamera(file);
//     const spy = spyOn(component, 'triggerCamera');
//     component.triggerCamera(file);
//     expect(spy).toHaveBeenCalled();
//     expect(spy).toHaveBeenCalledWith(file);
//   });

//   it('should have the title as dashboard', () => {
//       footerService.footerTitle().subscribe((title) => {
//       expect(title).toEqual('Dashboard');
//     });
//   });

//   it('should have set accessibility service', () => {
//     accessibilityService.getTabIndexFirstLevelStatus().subscribe((firstLayerStatus) => {
//     expect(firstLayerStatus).toEqual(true);
//   });
// });

// });
