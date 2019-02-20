// import { TestBed, inject } from '@angular/core/testing';

// import { AuthenticationService } from './authentication.service';
// import { HttpClientModule, HttpClient } from '@angular/common/http';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { BehaviorSubject } from 'rxjs';

// import { AngularFirestore } from 'angularfire2/firestore';
// import { AngularFireModule } from 'angularfire2';
// import { environment } from 'src/environments/environment.prod';
// import { IndexedDbService } from '../shared/services/indexed.db.service';
// import { UserService } from './user.service';
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
// describe('AuthenticationService', () => {
//   let authenticationService: AuthenticationService;
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         NgbModule.forRoot(),
//         HttpClientModule,
//         AngularFireModule.initializeApp(environment.firebase)
//       ],
//       providers: [
//         HttpClient,
//         AuthenticationService,
//         UserService,
//         IndexedDbService,
//         AngularFirestore
//       ],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA]
//     });
//     authenticationService = TestBed.get(AuthenticationService);
//   });


//   it('should be authentication service instance', () => {
//     expect(authenticationService).toBeTruthy();
//   });

//   it('should have called login function with success', () => {
//     authenticationService.login('realize_teacher', 'testing123$');
//   });

//   it('should have called login function with invalid credential', () => {
//     authenticationService.login('realize_teacher', 'testing123');
//   });

//   it('should have call logout function', () => {
//     const logoutSpy = spyOn(authenticationService, 'logout').and.returnValue(
//       () => {
//         this.router.navigate(['login']);
//       }
//     );
//     authenticationService.logout(() => {
//       this.router.navigate(['login']);
//     });
//     expect(logoutSpy).toHaveBeenCalled();
//   });
// });
