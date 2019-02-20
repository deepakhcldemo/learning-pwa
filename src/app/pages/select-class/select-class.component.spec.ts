// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { SelectClassComponent } from './select-class.component';
// import { FormsModule } from '@angular/forms';
// import { HeaderService } from 'src/app/shared/components/header/header.service';
// import { FooterService } from 'src/app/shared/components/footer/footer.service';
// import { TeacherClassService } from 'src/app/shared/services/teacher-class.service';
// import { Router } from '@angular/router';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { of } from 'rxjs';
// const mockRouter = {
//   navigate: jasmine.createSpy('navigate')
// };
// describe('SelectClassComponent', () => {
//   let selectclassComponentInstance: SelectClassComponent;
//   let fixture: ComponentFixture<SelectClassComponent>;
//   let headerService: HeaderService;
//   let footerService: FooterService;
//   let teacherClassService: TeacherClassService;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [SelectClassComponent],
//       imports: [
//         FormsModule],
//       providers: [
//         { provide: Router },
//         HeaderService,
//         FooterService,
//         TeacherClassService
//       ],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA]
//     })
//       .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(SelectClassComponent);
//     selectclassComponentInstance = fixture.componentInstance;
//     headerService = TestBed.get(HeaderService);
//     footerService = TestBed.get(FooterService);
//     teacherClassService = TestBed.get(TeacherClassService);
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(selectclassComponentInstance).toBeTruthy();
//   });
//   it('should check if window inner width is less than 768 then classNameLength should be equal to 20', () => {
//     const spyOnWindowWidth = spyOn(window, 'innerWidth').and.returnValue(767);
//     expect(window.innerWidth).toBeLessThan(768);
//     expect(spyOnWindowWidth).toHaveBeenCalled();
//     expect(selectclassComponentInstance.classNameLength).toBe(20);
//   });
//   it('should check if window inner width is equal to 768 then classNameLength should be equal to 20', () => {
//     const spyOnWindowWidth = spyOn(window, 'innerWidth').and.returnValue(768);
//     expect(window.innerWidth).toEqual(768);
//     expect(spyOnWindowWidth).toHaveBeenCalled();
//     expect(selectclassComponentInstance.classNameLength).toBe(20);
//   });
//   it('should check if window inner width is greater than 768 then classNameLength should be equal to 35', () => {
//     const spyOnWindowWidth = spyOn(window, 'innerWidth').and.returnValue(769);
//     expect(window.innerWidth).toBeGreaterThan(768);
//     expect(spyOnWindowWidth).toHaveBeenCalled();
//     expect(selectclassComponentInstance.classNameLength).toBe(35);
//   });
//   it('header title is hidden when user wants to select a class', () => {
//     spyOn(headerService, 'setHeaderTitle').and.returnValue('');
//     expect(headerService.setHeaderTitle).toBe('');
//     expect(headerService).toBeDefined();
//   });
//   it('footer is hidden when user wants to select a class', () => {
//     expect(footerService.updateFooterStatus).toBe(true);
//     spyOn(footerService, 'updateFooterStatus').and.returnValue(false);
//     fixture.detectChanges();
//     expect(footerService.updateFooterStatus).toBe(false);
//     expect(footerService).toHaveBeenCalled();
//   });
//   it('should get all class list', () => {
//     const teacherSpy = spyOn(teacherClassService, 'getAllClasses').and.returnValue(
//       of({
//         classId: '550C3A3888F34A5DE0532402140AABB5',
//         classImageUrl: '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
//         className: 'class_notebook',
//         firstTeacherId: 'ffffffff51c87040e4b07dddca2a0511',
//         teacherIds: ['ffffffff51c87040e4b07dddca2a0511']

//       })
//     );
//     teacherClassService.getAllClasses().subscribe(classes => {
//       if (!classes.length) {
//         expect(footerService.updateFooterStatus).toBe(true);
//         expect(teacherClassService.setToggleForClassSelector).toBe(true);
//         this.router.navigate(['dashboard']);
//       }
//     });
//     expect(teacherSpy).toHaveBeenCalled();
//   });
//   it('should  set current class and redirect to "dashboard" page', () => {
//     selectclassComponentInstance.allClasses =  [{
//       classDescription: null,
//       classId: '78F9E860CAA87666E0532502140AEB0B',
//       classImageUrl: '/community/realizeit/skins/default/images/class_roster_icons/class1.png',
//       className: 'scoutdemo',
//       createdBy: 'ffffffff51c87040e4b07dddca2a0511',
//       createdDate: '2018-10-24T08:48:59.000Z',
//       externalId: null,
//       externalSource: null,
//       firstTeacherId: 'ffffffff51c87040e4b07dddca2a0511',
//       lastUpdatedBy: 'ffffffff51c87040e4b07dddca2a0511',
//       lastUpdatedDate: '2018-10-24T08:51:02.000Z',
//       organizationId: '8a97b1a638c9f02701393168afbf1d20',
//       status: 'ACTIVE',
//       studentIds: ['ffffffff54738483e4b001bd4b61aaf0'],
//       teacherIds: ['ffffffff51c87040e4b07dddca2a0511']
//   }];
//     expect(teacherClassService.setCurrentClass(this.selectclassComponentInstance.allClasses)).toHaveBeenCalled();
//     expect(footerService.updateFooterStatus).toBe(true);
//     expect(teacherClassService.setToggleForClassSelector).toBe(true);
//     this.router.navigate(['dashboard']);
//   });
//   it('should have destroyed component', () => {
//     expect(footerService.updateFooterStatus).toBe(true);
//     selectclassComponentInstance.ngOnDestroy();
//     fixture.detectChanges();
//   });
// });
