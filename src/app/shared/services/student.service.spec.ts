// import { TestBed, inject } from '@angular/core/testing';

// import { StudentService } from './student.service';
// import { IndexedDbService } from './indexed.db.service';
// import { environment } from 'src/environments/environment';
// import { AngularFireModule } from 'angularfire2';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';
// import { RosterService } from './roster.service';
// import { ProductService } from './product.service';
// import { TeacherClassService } from './teacher-class.service';
// import { of } from 'rxjs';
// import { UserService } from 'src/app/auth/user.service';

// describe('StudentService', () => {
//   let studentService: StudentService;
//   let rosterService: RosterService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [StudentService,
//         IndexedDbService,
//         ProductService,
//         RosterService,
//         TeacherClassService
//       ],
//       imports: [
//         HttpClientModule,
//         AngularFireModule.initializeApp(environment.firebase),
//         AngularFirestoreModule,
//         AngularFireDatabaseModule
//       ],
//       schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
//     });
//     studentService = TestBed.get(StudentService);
//     rosterService = TestBed.get(RosterService);
//     studentService.setCurrentStudentFromStudentList({
//       avatar: '0a',
//       emailAddress: 'emailaddress@pearson.com',
//       firstName: '0911',
//       fullName: '0911 adaptive',
//       lastName: 'adaptive',
//       userId: 'ffffffff5bb290def856993930d369a2'
//     });
//     studentService.setCurrentStudent('ffffffff51c87040e4b07dddca2a0511');
//   });

//   it('should have a user service instance', () => {
//     expect(studentService).toBeDefined();
//   });

//   it('should have called all student list with details', () => {
//     studentService.getAllStudentDetail((studentLst) => {
//       expect(studentLst).toBeGreaterThanOrEqual(0);
//     });
//   });
//   it('should have called get student by product id', () => {

//     studentService.getStudentsByProductID('1730908', (studentLst) => {
//       if (studentLst) {

//       }
//     });
//   });

//   it('should have set valid student count', () => {
//     studentService.setTotalStudentCount(3);
//     expect(studentService._studentCount).toEqual(3);
//   });

//   it('should have get student count', () => {
//     studentService.setTotalStudentCount(3);
//     const studentCount = studentService.getTotalStudentCount();
//     expect(studentCount).toEqual(3);
//   });

//   it('should have set current student from student list', () => {
//     studentService.setCurrentStudentFromStudentList({
//       avatar: '0a',
//       emailAddress: 'emailaddress@pearson.com',
//       firstName: '0911',
//       fullName: '0911 adaptive',
//       lastName: 'adaptive',
//       userId: 'ffffffff5bb290def856993930d369a2'
//     });
//     expect(studentService._currentStudentFromStudentList).toBeDefined();
//   });

//   it('should have reset current student from student list', () => {
//     studentService.resetCurrentStudentFromStudentList();
//     expect(studentService._currentStudentFromStudentList).toEqual('');
//   });

//   it('should have get current student from student list', () => {
//     const currentUser = studentService.getCurrentStudentFromStudentList();
//     expect(currentUser.fullName).toEqual('0911 adaptive');
//   });

//   it('should call getStudentDetail method', () => {
//     studentService.getStudentDetail(1, () => { });
//     expect(studentService.getStudentDetail).toBeTruthy();
//   });

//   it('should have get student list by product id', () => {

//     studentService.getStudentDetailsByProduct('1730940', (studentLst) => {
//       expect(studentLst.length).toBeGreaterThanOrEqual(0);
//     });
//   });

// });
