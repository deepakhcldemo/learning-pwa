// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { AppComponent } from './app.component';
// import { RouterTestingModule } from '@angular/router/testing';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { IndexedDbService } from './shared/services/indexed.db.service';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { environment } from 'src/environments/environment';
// import { AngularFireModule } from 'angularfire2';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
// import { FirebaseDbService } from './shared/services/firebase.db.service';

// describe('AppComponent', () => {
//     let component: AppComponent;
//     let fixture: ComponentFixture<AppComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         AppComponent
//       ],
//        imports: [ RouterTestingModule,
//         AngularFirestoreModule,
//         AngularFireModule.initializeApp(environment.firebase),
//         AngularFireDatabaseModule],
//        providers: [
//                 IndexedDbService,
//                 FirebaseDbService,
//             ],
//        schemas: [CUSTOM_ELEMENTS_SCHEMA]
//     }).compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(AppComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create the app component', () => {
//     expect(component).toBeTruthy();
//   });
// });
