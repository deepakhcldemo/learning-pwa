// import { TestBed, inject } from '@angular/core/testing';

// import { ContactInfoService } from './contact-info.service';
// import { Guardian } from 'src/app/models/guardian.model';
// import { HttpClientModule } from '@angular/common/http';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
// import { AngularFireModule } from 'angularfire2';
// import { environment } from 'src/environments/environment';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { IndexedDbService } from 'src/app/shared/services/indexed.db.service';
// import { UserService } from 'src/app/auth/user.service';

// describe('ContactInfoService', () => {
//   let contactInfoService: ContactInfoService;
//   let userService: UserService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [ContactInfoService,
//         UserService,
//         IndexedDbService
//       ],
//         imports: [HttpClientModule,
//           AngularFirestoreModule,
//           AngularFireModule.initializeApp(environment.firebase),
//           AngularFirestoreModule,
//           AngularFireDatabaseModule]
//     });
//     contactInfoService = TestBed.get(ContactInfoService);
//     userService = TestBed.get(UserService);
//     userService.setUser({ identityId: 'ffffffff54738483e4b001bd4b61aaf0' });
//   });

//   it('should have a contact info service instance', () => {
//     expect(contactInfoService).toBeDefined();
// });

//   it('should have set student contact info', () => {
//     const contactInformation: Guardian = {
//       camerapermission: true,
//       guardian: [{
//         email: 'jd@gmail.com',
//         mob: 12345678,
//         name: 'John Doe'
//       }]
//     };
//     contactInfoService.setContactInfo('ffffffff5a7d7439f02ebd1b9347e303', contactInformation);
//     expect(contactInformation.camerapermission).toEqual(true);
//   });

//   it('should have get student contact info', () => {
//     contactInfoService.getContactInfo('ffffffff5a7d7439f02ebd1b9347e303');
//     expect(contactInfoService.getContactInfo).toBeDefined();
//   });
// });
