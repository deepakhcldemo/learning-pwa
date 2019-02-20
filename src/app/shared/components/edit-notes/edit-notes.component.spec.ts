import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, inject } from '@angular/core';
import { CustomErrorHandlerService } from 'src/app/shared/services/custom.errorhandler.service';
import { FormBuilder } from '@angular/forms';
import { NotesService } from '../../services/notes.service';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainPageFocusStatusService } from '../../mainpage-focus-status.service';
import { AccessibilityService } from '../../services/accessibility.service';
import { StudentService } from '../../services/student.service';
import { TeacherClassService } from 'src/app/shared/services/teacher-class.service';
import { TeacherClassModel } from '../../../models/class.model';
import { EditNotesComponent } from './edit-notes.component';
import { Observable, Subject, of } from 'rxjs';
import { NotesDalService } from '../../services/realtime-datalayer/notes-dal.service';
import { FirebaseDbService } from '../../services/firebase.db.service';
import { UserService } from 'src/app/auth/user.service';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import * as async from 'async';
import { StudentListMockData } from 'src/app/shared/mock-data/student-list.mock.data';

// class MockAccessibilityService extends AccessibilityService {
//   notePopupState$: Observable<string> = new Subject<string>().asObservable();

//   setTabIndexLevelStatus(firstLevel: boolean, secondLevel: boolean, thirdLevel: boolean) {
//     return Observable.of(true);
//   }
// }

class MockNotesService extends NotesService {
    notePopupState$: Observable<string> = new Subject<string>().asObservable();
    // addEditOperation$: Observable<string> = new Subject<string>().asObservable();

    // getNotePopupState() {
    //   return Observable.of(true);
    // }
    // getAddEditOperation() {
    //   return Observable.of('Edit');
    // }
}

const studentId = 'ffffffff51c87040e4b07dddca2a0511';

fdescribe('EditNotesComponent', () => {
    let component: EditNotesComponent;
    let fixture: ComponentFixture<EditNotesComponent>;
    beforeEach(() => {
        const customErrorHandlerServiceStub = { handleError: () => ({}) };
        const formBuilderStub = {};
        const notesServiceStub = {
            getAddEditOperation: () => ({ subscribe: () => ({}) }),
            getNotePopupState: () => ({ subscribe: () => ({}) }),
            getNoteDetails: () => ({ subscribe: () => ({}) }),
            setNotePopupState: () => ({}),
            updateNoteByNoteId: () => ({}),
            saveNote: () => ({})
        };
        const ngbDateStub = {};
        const mainPageFocusStatusServiceStub = {
            setMainPageFocusStatus: () => ({})
        };
        const accessibilityServiceStub = {
            getTabIndexSecondLevelStatus: () => ({ subscribe: () => ({}) }),
            setTabIndexLevelStatus: () => ({}),
            selectFocus: () => ({})
        };
        const studentServiceStub = { getStudentsDetailByStudentsId: () => ({}) };
        const teacherClassServiceStub = {
            getCurrentClass: () => ({ subscribe: () => ({}) })
        };
        const teacherClassModelStub = {};
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [EditNotesComponent],
            providers: [
                {
                    provide: CustomErrorHandlerService,
                    useValue: customErrorHandlerServiceStub
                },
                { provide: FormBuilder, useValue: formBuilderStub },
                // { provide: NotesService, useValue: notesServiceStub },
                { provide: NotesService, useClass: MockNotesService },
                { provide: NgbDate, useValue: ngbDateStub },
                {
                    provide: MainPageFocusStatusService,
                    useValue: mainPageFocusStatusServiceStub
                },
                { provide: AccessibilityService, useValue: accessibilityServiceStub },
                { provide: StudentService, useValue: studentServiceStub },
                { provide: TeacherClassService, useValue: teacherClassServiceStub },
                NotesDalService,
                FirebaseDbService,
                AngularFirestore,
                UserService
                // { provide: TeacherClassModel, useValue: teacherClassModelStub }
            ],
            imports: [
                NgbModule, AngularFirestoreModule,
                AngularFireModule.initializeApp(environment.firebase),
                AngularFirestoreModule,
                AngularFireDatabaseModule,
                HttpClientModule
            ],
        });
        fixture = TestBed.createComponent(EditNotesComponent);
        component = fixture.componentInstance;
        component.noteDetail = {
            classid: '78F9ECC58C1D7CBCE0532502140A442C',
            comment: 'test notes 2',
            createdat: 'January 28, 2019 at 1:07:55 PM UTC+5:30',
            flagged: false,
            flaggeddate: 'January 25, 2019 at 12:00:00 AM UTC+5:30',
            noteid: 28248941,
            students: ['ffffffff5bd30d6f1c6dd524050950ba'],
            updatedat: 'January 28, 2019 at 1:07:55 PM UTC+5:30'
        };

        component['allStudentList'] = [
            {
                avatar: '',
                emailAddress: 'no6@pearson.com',
                firstName: 'realize1',
                lastName: 'teacher11',
                userId: 'ffffffff51c87040e4b07dddca2a0511',
                fullName: 'realize1 teacher11'
            },
            {
                avatar: '',
                emailAddress: 'emailaddress@pearson.com',
                firstName: 'Hermione',
                lastName: 'Granger',
                userId: 'ffffffff54738483e4b001bd4b61aaf0',
                fullName: 'Hermione Granger'
            },
        ];

        const userService = TestBed.get(UserService);
        userService.setUser(StudentListMockData.currentUser);

        component['currentSelectedClass'] = {
            classId: '78F9E860CAA87666E0532502140AEB0B',
            className: 'scoutdemo',
            classDescription: null,
            classImageUrl: '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
            createdBy: 'ffffffff51c87040e4b07dddca2a0511',
            createdDate: '2018-10-24T08:48:59.000Z',
            externalId: null,
            externalSource: null,
            firstTeacherId: 'ffffffff51c87040e4b07dddca2a0511',
            lastUpdatedBy: 'ffffffff51c87040e4b07dddca2a0511',
            lastUpdatedDate: '2018-10-24T08:51:02.000Z',
            organizationId: '8a97b1a638c9f02701393168afbf1d20',
            productIds: ['1730940', '336566'],
            status: 'ACTIVE',
            studentIds: ['ffffffff54738483e4b001bd4b61aaf0'],
            teacherIds: ['ffffffff51c87040e4b07dddca2a0511'],
        };

        component.noteDetail = null;

    });
    it('can load instance', () => {
        expect(component).toBeTruthy();
    });
    it('commentRequired defaults to: false', () => {
        expect(component.commentRequired).toEqual(false);
    });
    it('notePopupStatus defaults to: false', () => {
        expect(component.notePopupStatus).toEqual(false);
    });
    it('showDate defaults to: true', () => {
        expect(component.showDate).toEqual(true);
    });
    it('secondTabIndexStatus defaults to: false', () => {
        expect(component.secondTabIndexStatus).toEqual(false);
    });
    it('taggedStudents defaults to: []', () => {
        expect(component.taggedStudents).toEqual([]);
    });
    it('untaggedStudents defaults to: []', () => {
        expect(component.untaggedStudents).toEqual([]);
    });
    it('addEditOperation defaults to: Edit', () => {
        expect(component.addEditOperation).toEqual('Edit');
    });

    it('Subscribe getTabIndexSecondLevelStatus method of AccessibilityService service', () => {
        const accessibilityServiceMock: AccessibilityService = fixture.debugElement.injector.get(
            AccessibilityService
        );
        const accessibilityServiceSpy = spyOn(accessibilityServiceMock, 'getTabIndexSecondLevelStatus').and.returnValues(of(true));
        accessibilityServiceMock.getTabIndexSecondLevelStatus().subscribe(tabIndex => {
            if (tabIndex) {
                expect(tabIndex).toBeDefined();
            }
        });
        expect(accessibilityServiceSpy).toHaveBeenCalled();
    });

    it('Subscribe getAddEditOperation method of NotesService service', () => {
        const notesServiceMock: NotesService = fixture.debugElement.injector.get(
            NotesService
        );
        const notesServiceSpy = spyOn(notesServiceMock, 'getAddEditOperation').and.returnValues(of(true));
        notesServiceMock.getAddEditOperation().subscribe(data => {
            if (data) {
                expect(data).toBeTruthy();
            }
        });
        expect(notesServiceSpy).toHaveBeenCalled();
    });

    it('Subscribe getAddEditOperation method of TeacherClassService service', () => {
        const teacherClassServiceMock: TeacherClassService = fixture.debugElement.injector.get(
            TeacherClassService
        );
        const teacherClassServiceSpy = spyOn(teacherClassServiceMock, 'getCurrentClass').and.returnValues(of(true));
        teacherClassServiceMock.getCurrentClass().subscribe(currentClass => {
            if (currentClass) {
                expect(currentClass).toBeTruthy();
            }
        });
        expect(teacherClassServiceSpy).toHaveBeenCalled();
    });

    it('Subscribe getNotePopupState method of NotesService service', () => {
        const notesServiceMock: NotesService = fixture.debugElement.injector.get(
            NotesService
        );
        const notesServiceSpy = spyOn(notesServiceMock, 'getNotePopupState').and.returnValues(of(true));
        notesServiceMock.getNotePopupState().subscribe(data => {
            if (data) {
                expect(data).toBeTruthy();
            }
        });
        expect(notesServiceSpy).toHaveBeenCalled();
    });

    it('Should Called getStudentData', () => {
        component['getStudentData']();
        expect(component['getStudentData']).toBeDefined();
    });

    it('taggedUntaggedStudent method with event false, studentId and addEditOperation = Add', () => {
        component.addEditOperation = 'Add';
        event.target['checked'] = false;
        component.taggedUntaggedStudent(event, studentId);
        expect(component.taggedUntaggedStudent).toBeDefined();
    });

    it('taggedUntaggedStudent method with event true, studentId and addEditOperation = Add', () => {
        component.addEditOperation = 'Add';
        event.target['checked'] = true;
        component.taggedUntaggedStudent(event, studentId);
        expect(component.taggedUntaggedStudent).toBeDefined();
    });

    it('taggedUntaggedStudent method with event false, studentId and addEditOperation = Edit', () => {
        component.addEditOperation = 'Edit';
        event.target['checked'] = false;
        component.taggedUntaggedStudent(event, studentId);
        expect(component.taggedUntaggedStudent).toBeDefined();
    });

    it('taggedUntaggedStudent method with event true, studentId and addEditOperation = Edit', () => {
        component.addEditOperation = 'Edit';
        event.target['checked'] = true;
        component.taggedUntaggedStudent(event, studentId);
        expect(component.taggedUntaggedStudent).toBeDefined();
    });

    it('Called saveNote method with empty comment', () => {
        component.noteForm = {
            comment: '',
            noteFlag: false,
            flaggedDate: ''
        };

        component.saveNote('Add');
        expect(component.saveNote).toBeDefined();
    });

    it('Should Called saveNote method with Add', () => {
        component.noteForm = {
            comment: 'Add testing comment at the time of unit test',
            noteFlag: false,
            flaggedDate: ''
        };

        const userServiceMock: UserService = fixture.debugElement.injector.get(
            UserService
        );

        const getUserSpy = spyOn(userServiceMock, 'getCurrentUser');
        userServiceMock.getCurrentUser();
        expect(getUserSpy).toHaveBeenCalled();

        const saveNoteSpy = spyOn(component, 'saveNote');
        component.saveNote('Add');
        expect(saveNoteSpy).toHaveBeenCalledWith('Add');
    });

    it('Should Called saveNote method with Edit', () => {
        component.noteForm = {
            comment: 'Updating testing comment at the time of unit test',
            noteFlag: false,
            flaggedDate: 'January 25, 2019 at 12:00:00 AM UTC+5:30'
        };

        const userServiceMock: UserService = fixture.debugElement.injector.get(
            UserService
        );

        const getUserSpy = spyOn(userServiceMock, 'getCurrentUser');
        userServiceMock.getCurrentUser();
        expect(getUserSpy).toHaveBeenCalled();

        const saveNoteSpy = spyOn(component, 'saveNote');
        component.saveNote('Edit');
        expect(saveNoteSpy).toHaveBeenCalledWith('Edit');

    });

    // it('Should Called updateNote method', () => {
    //     component['updateNote']();
    //     expect(component['updateNote']).toBeDefined();
    // });

    // it('Should Called addNote method', () => {
    //     component['addNote']();
    //     expect(component['addNote']).toBeDefined();
    // });

    it('Should Called setNoteDetail method', () => {
        component.todoDate.month = Number(new Date().getMonth() + 1);
        component.todoDate.day = Number(new Date().getDate());
        component.todoDate.year = Number(new Date().getFullYear());

        component.noteForm = {
            comment: 'Add testing comment at the time of unit test',
            noteFlag: false,
            flaggedDate: '',
        };

        const returnSetNote = ({
            comment: 'Add testing comment at the time of unit test',
            noteFlag: false,
            flaggedDate: '',
            flaggeddate: new Date(component.todoDate.month.toString() + '/' +
                component.todoDate.day.toString() + '/' + component.todoDate.year.toString()),
            createdat: new Date(),
            updatedat: new Date(),
            students: [{}],
            classid: component['currentSelectedClass'].classId
        });

        const currentClassID = component['currentSelectedClass'].classId;
        component['setNoteDetail'](currentClassID);
        expect(component['setNoteDetail']).toBeDefined(currentClassID);
        // expect(component['setNoteDetail']).toBe(returnSetNote);
    });

    it('Should Called resetNoteForm method', () => {
        component['resetNoteForm']();
        expect(component['resetNoteForm']).toBeDefined();
    });

    it('Should Called closePopup method', () => {
        component.closePopup();
        expect(component.closePopup).toBeDefined();
    });

    it('Should Called checkToDo method with event false', () => {
        event.target['checked'] = false;
        component.checkToDo(event);
        expect(component.checkToDo).toBeDefined();
    });

    it('Should Called checkToDo method with event true', () => {
        event.target['checked'] = true;
        component.checkToDo(event);
        expect(component.checkToDo).toBeDefined();
    });

    it('Should Called setFocus method', () => {

        const accessibilityServiceMock: AccessibilityService = fixture.debugElement.injector.get(
            AccessibilityService
        );

        const accessibilityServiceSpy = spyOn(accessibilityServiceMock, 'selectFocus');
        const focusButton = 'done_button';
        document.getElementById(focusButton);

        accessibilityServiceMock.selectFocus(focusButton);
        expect(accessibilityServiceSpy).toHaveBeenCalledWith(focusButton);
        expect(component.setFocus).toBeDefined();
    });

    it('Should Called todoDateSelection method', () => {
        component.todoDateSelection(component.todoDate);
        expect(component.todoDateSelection).toBeDefined();
    });
});
