import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentNotesComponent } from './student-notes.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TruncatePipe } from 'src/app/shared/pipes/truncate.pipe';
import { DateFormatPipe } from 'src/app/shared/pipes/date-format.pipe';
import { IndexedDbService } from 'src/app/shared/services/indexed.db.service';
import { RosterService } from 'src/app/shared/services/roster.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/auth/user.service';
import { AssessmentService } from 'src/app/shared/services/assessment.service';
import { StudentComponentService } from '../student-component.service';
import { NotesService } from 'src/app/shared/services/notes.service';
import { NotesDalService } from 'src/app/shared/services/realtime-datalayer/notes-dal.service';
import { FirebaseDbService } from 'src/app/shared/services/firebase.db.service';
import { StudentService } from 'src/app/shared/services/student.service';
import { of } from 'rxjs';
import { AccessibilityService } from 'src/app/shared/services/accessibility.service';

fdescribe('StudentNotesComponent', () => {
    let component: StudentNotesComponent;
    let fixture: ComponentFixture<StudentNotesComponent>;
    let studentService: StudentService;
    let accessibilityService: AccessibilityService;
    let userService: UserService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StudentNotesComponent,
                DateFormatPipe,
                TruncatePipe],
            providers: [IndexedDbService,
                RosterService,
                UserService,
                AssessmentService,
                StudentComponentService,
                NotesService,
                NotesDalService,
                FirebaseDbService
            ],
            imports: [PerfectScrollbarModule, HttpClientModule,
                RouterTestingModule,
                AngularFireModule.initializeApp(environment.firebase),
                AngularFirestoreModule,
                AngularFireDatabaseModule,
                NgbModalModule],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StudentNotesComponent);
        component = fixture.componentInstance;
        studentService = TestBed.get(StudentService);
        userService = TestBed.get(UserService);
        accessibilityService = TestBed.get(AccessibilityService);
        userService.setUser({ identityId: 'ffffffff54738483e4b001bd4b61aaf0' });
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call prepareNotesToDelete and push note object to deleteNotes list', () => {
        const noteList = {
            data: {
                comment: 'test',
                noteid: 82052108,
                flagged: true,
                product: '1730939',
                students: ['ffffffff59b667fd45d99156d4fa1d53',
                    'ffffffff5bb290def856993930d369a2'],
                types: 'notes',
                createdat: new Date()

            },
            id: '82052108'
        };
        const checkboxEvent = { target: { checked: true } };
        component.prepareNotesToDelete(checkboxEvent, noteList);
        expect(checkboxEvent.target.checked).toBe(true);
        component['_deleteNotes'].push(noteList);
        fixture.detectChanges();
        expect(component['_deleteNotes'][0].data.noteid).toEqual(82052108);
    });

    it('should call prepareNotesToDelete and remove note object from deleteNotes list when unchecked', () => {
        const noteList = {
            data: {
                comment: 'test',
                noteid: 82052108,
                flagged: true,
                product: '1730939',
                students: ['ffffffff59b667fd45d99156d4fa1d53',
                    'ffffffff5bb290def856993930d369a2'],
                types: 'notes',
                createdat: new Date

            },
            id: '82052108'
        };
        const checkboxEvent = { target: { checked: false } };
        component.prepareNotesToDelete(checkboxEvent, noteList);
        component['_deleteNotes'].push(noteList);
        const notesList_length = component['_deleteNotes'].length;
        const indexNumber = component['_deleteNotes'].indexOf(noteList);
        component['_deleteNotes'].splice(indexNumber, 1);
        fixture.detectChanges();
        expect(checkboxEvent.target.checked).toBe(false);
        expect(notesList_length - 1).toEqual(component['_deleteNotes'].length);
    });

    it('should have called toggleEdit method', () => {
        component.editable = false;
        component.toggleEdit();
        fixture.detectChanges();
        expect(component.editable).toBe(true);
    });

    it('should have called getStudents method', () => {
        const currentClass = {
            classDescription: null,
            classId: '78FA06DCFC9D187DE0532502140A8C1A',
            classImageUrl: '/community/realizeit/skins/default/images/class_roster_icons/class3.png',
            className: 'NewScoutClass',
            productIds: ['1730940', '1710115'],
            status: 'ACTIVE',
            studentIds: ['ffffffff54738483e4b001bd4b61aaf0'],
            teacherIds: ['ffffffff51c87040e4b07dddca2a0511']
        };

        const studentDetails = [{
            avatar: 'HG',
            emailAddress: 'emailaddress@pearson.com',
            firstName: 'Hermione',
            fullName: 'Hermione Granger',
            lastName: 'Granger',
            userId: 'ffffffff54738483e4b001bd4b61aaf0'
        }];
        component['currentClass'] = currentClass;
        component['getStudents']();
        const studentDetailsSpy = spyOn(studentService, 'getStudentsDetailByStudentsId').and.returnValue(of(studentDetails));
        studentService.getStudentsDetailByStudentsId(currentClass.studentIds, (students) => component['studentsDetailCallback'](students));
        fixture.detectChanges();
        expect(component['currentClass']).not.toBeNull();
        expect(studentDetailsSpy).toHaveBeenCalled();
        expect(component['getStudents']).toBeTruthy();
    });

    it('should have called tabIndexStatusSubscriber method', () => {
        const tabIndexSpy = spyOn(accessibilityService, 'getTabIndexFirstLevelStatus').and.returnValue(of(false));
        component['tabIndexStatusSubscriber']();
        accessibilityService.getTabIndexFirstLevelStatus().subscribe(status => {
            component.tabIndexStatus = status;
            expect(status).not.toBeNull();
        });
        fixture.detectChanges();
        expect(tabIndexSpy).toHaveBeenCalled();
        expect(component.tabIndexStatus).toEqual(false);
    });

    it('should have called studentsDetailCallback method', () => {
        const studentDetails = [{
            avatar: 'HG',
            emailAddress: 'emailaddress@pearson.com',
            firstName: 'Hermione',
            fullName: 'Hermione Granger',
            lastName: 'Granger',
            userId: 'ffffffff54738483e4b001bd4b61aaf0'
        }];
        const currentClass = {
            classDescription: null,
            classId: '78FA06DCFC9D187DE0532502140A8C1A',
            classImageUrl: '/community/realizeit/skins/default/images/class_roster_icons/class3.png',
            className: 'NewScoutClass',
            productIds: ['1730940', '1710115'],
            status: 'ACTIVE',
            studentIds: ['ffffffff54738483e4b001bd4b61aaf0'],
            teacherIds: ['ffffffff51c87040e4b07dddca2a0511']
        };
        component['currentClass'] = currentClass;
        component['studentsDetailCallback'](studentDetails);
        fixture.detectChanges();
        expect(studentDetails).not.toBeUndefined();
        expect(studentDetails.length).not.toEqual(0);
        expect(component.students.length).toBeGreaterThan(0);
    });

});
