// import { async, ComponentFixture, TestBed, fakeAsync, inject } from '@angular/core/testing';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { HttpClient, HttpHandler } from '@angular/common/http';
// import { AngularFirestore } from 'angularfire2/firestore';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { HeaderComponent } from './header.component';
// import { IndexedDbService } from '../../services/indexed.db.service';
// import { FirebaseDbService } from '../../services/firebase.db.service';
// import { AuthTokenService } from 'src/app/auth/authtoken.service';
// import { RosterService } from '../../services/roster.service';
// import { AvatarComponent } from '../avatar/avatar.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { HeaderService } from './header.service';
// import { Title } from '@angular/platform-browser';
// import { Router, ActivatedRoute } from '@angular/router';
// import { AssessmentService } from '../../services/assessment.service';
// import { CustomErrorHandlerService } from '../../services/custom.errorhandler.service';
// import { NotesService } from '../../services/notes.service';
// import { MediaService } from '../../services/media.service';
// import { UploadFileService } from '../../services/upload-file.service';
// import { AngularFireDatabase } from 'angularfire2/database';
// import { AngularFireModule } from 'angularfire2';
// import { environment } from '../../../../environments/environment';
// import { AlertService } from '../alert/alert.service';
// import { TelemetryService } from '../../services/telemetry.service';
// import { AuthenticationService } from 'src/app/auth/authentication.service';
// import { UserService } from 'src/app/auth/user.service';

// const fakeActivatedRoute = {
//   snapshot: { data: {} }
// } as ActivatedRoute;

// const mockRouter = {
//   navigate: jasmine.createSpy('navigate')
// };

// const FirestoreStub = {
//   collection: (name: string) => ({
//     doc: (_id: string) => ({
//       valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
//       set: (_d: any) => new Promise((resolve, _reject) => resolve()),
//     }),
//   }),
// };

// describe('HeaderComponent', () => {
//   let component: HeaderComponent;
//   let fixture: ComponentFixture<HeaderComponent>;
//   let headerService: HeaderService;
//   let mediaService: MediaService;
//   const headerServ: Title = new Title('Dashboard');

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [ReactiveFormsModule, FormsModule, NgbModule, AngularFireModule.initializeApp(environment.firebase)],
//       declarations: [HeaderComponent, AvatarComponent],
//       providers: [
//         { provide: Router, useValue: mockRouter }, UserService, HttpClient, HttpHandler, AssessmentService,
//         CustomErrorHandlerService,
//         {
//           provide: AngularFirestore,
//           useValue: FirestoreStub
//         },
//         IndexedDbService, AuthenticationService, FirebaseDbService,
//         AuthTokenService, RosterService, AlertService,
//         { provide: HeaderService, useValue: headerServ }, HeaderService,
//          NotesService, MediaService, UploadFileService, AngularFireDatabase, TelemetryService, AlertService
//       ],
//     })
//       .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(HeaderComponent);
//     component = fixture.componentInstance;
//     headerService = TestBed.get(HeaderService);
//     mediaService = TestBed.get(MediaService);
//     headerService.setHeaderTitle('Dashboard');
//     component.ngOnInit();
//     fixture.detectChanges();
//   });

//   it('should create header component instance', () => {
//     expect(component).toBeTruthy();
//   });
//   it('should call openSearch method', () => {
//     component.openSearch();
//     expect(component.openSearch).toBeTruthy();
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
//     headerService.headerTitle().subscribe((title) => {
//       expect(title).toEqual('Dashboard');
//     });
//   });

//   it('should call navigatetoDashboard method', () => {
//       component.navigatetoDashboard();
//       expect(component).toBeTruthy();
//   });

// });
