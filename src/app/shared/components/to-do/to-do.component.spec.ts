// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
// import { of } from 'rxjs';
// import { ToDoComponent } from './to-do.component';
// import { CustomErrorHandlerService } from '../../services/custom.errorhandler.service';
// import { AlertService } from '../../components/alert/alert.service';
// import { HttpClient, HttpHandler } from '@angular/common/http';
// import { AngularFirestore } from 'angularfire2/firestore';
// import { AngularFireModule } from 'angularfire2';
// import { environment } from '../../../../environments/environment.prod';
// import { IndexedDbService } from '../../services/indexed.db.service';
// import { NotesService } from '../../services/notes.service';
// import { FirebaseDbService } from '../../services/firebase.db.service';
// import { AssessmentService } from '../../services/assessment.service';
// import { TelemetryService } from '../../services/telemetry.service';
// import { ToDoService } from '../../services/todo-dal.service';
// import { ProductService } from '../../services/product.service';
// import {FileConstants} from 'src/app/shared/constants/file-constants';
// import { RosterService } from '../../services/roster.service';
// import { StudentService } from '../../services/student.service';
// import { UserService } from 'src/app/auth/user.service';

// describe('ToDoComponent', () => {
//   let component: ToDoComponent;
//   let fixture: ComponentFixture<ToDoComponent>;
//   let indexedDbService: IndexedDbService;
//   let toDoService: ToDoService;
//   let productService: ProductService;
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ToDoComponent, DateFormatPipe],
//       providers: [CustomErrorHandlerService, AlertService, UserService,
//         HttpClient, HttpHandler, AngularFirestore, IndexedDbService,
// NotesService, FirebaseDbService, AssessmentService, TelemetryService,
//         ToDoService, StudentService, RosterService],
//       imports: [AngularFireModule.initializeApp(environment.firebase)]
//     })
//       .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ToDoComponent);
//     component = fixture.componentInstance;
//     toDoService = TestBed.get(ToDoService);
//     indexedDbService = TestBed.get(IndexedDbService);
//     productService = TestBed.get(ProductService);
//     productService.setCurrentProduct('44444444');
//     component.ngOnInit();
//     fixture.detectChanges();
//   });

//   it('should create the instance of To Do component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should have card heading', () => {
//     expect(component.toDoActivityHeading).toBeDefined();
//   });

//   it('should have card heading equal to', () => {
//     expect(component.toDoActivityHeading).toEqual(FileConstants.constants.toDoHeading);
//   });

//   it('should have called toggleContentHidden method', () => {
//     component.contentHidden = true;
//     component.toggleContentHidden();
//     expect(component.contentHidden).toEqual(false);
//   });

//   it('should have called editNotesToggle method', () => {
//     component.editNotesToggle('todo');
//     expect(component.contentHidden).toBeTruthy();
//   });

//   it('should have called setToDoList method', () => {
//     const notesList = [{
//       comment: 'test note 123',
//       createdat: '',
//       flagged: true,
//       flaggeddate: '',
//       id: '76595539',
//       noteid: 76595539,
//       product: '1730939',
//       student: [{
//         avatar: '0a',
//         emailAddress: 'emailaddress@pearson.com',
//         firstName: '0911',
//         fullName: '0911 adaptive',
//         lastName: 'adaptive',
//         userId: 'ffffffff59b667fd45d99156d4fa1d53',
//       }],
//       students: ['ffffffff59b667fd45d99156d4fa1d53'],
//       types: 'notes',
//       updatedat: ''
//     }];
//     component.setToDoList();

//     const spy = spyOn(toDoService, 'getRecentToDoList').and.returnValue(of(notesList));
//     toDoService.getRecentToDoList('123').subscribe(noteList => {
//       this.getRecentToDoSubscriber(noteList);
//     });

//     // expect(spy).toHaveBeenCalledWith(notesList);
//     // expect(component.setToDoList).toBeTruthy();
//     // component.getRecentToDoSubscriber(notesList);
//     fixture.detectChanges();
//   });

//   it('should have called getRecentToDoSubscriber method', () => {
//     component.recenttoDo = [];
//     const notesList = [{
//       comment: 'test note 123',
//       createdat: '',
//       flagged: true,
//       flaggeddate: '',
//       id: '76595539',
//       noteid: 76595539,
//       product: '1730939',
//       student: [{
//         avatar: '0a',
//         emailAddress: 'emailaddress@pearson.com',
//         firstName: '0911',
//         fullName: '0911 adaptive',
//         lastName: 'adaptive',
//         userId: 'ffffffff59b667fd45d99156d4fa1d53',
//       }],
//       students: ['ffffffff59b667fd45d99156d4fa1d53'],
//       types: 'notes',
//       updatedat: ''
//     }];
//     component.getRecentToDoSubscriber(notesList);
//     expect(component.getRecentToDoSubscriber).toBeTruthy();
//     component.recenttoDo.sort(function (previous, next) {
//       return previous.flaggeddate.seconds - next.flaggeddate.seconds;
//     });
//   });

//   // it('should have called getCurrentProductOnChange method', () => {
//   //   const spy = spyOn(productService, 'getCurrentProductOnChange');
//   //   productService.getCurrentProductOnChange().subscribe(() => {
//   //     this.setToDoList();
//   //   });
//   //  // expect(spy).toHaveBeenCalled();
//   // });

// });
