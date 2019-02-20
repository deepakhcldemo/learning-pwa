// import { TestBed } from '@angular/core/testing';
// import { IndexedDbService } from '../indexed.db.service';
// import { ProgramDalService } from './program-dal.service';
// import { HierarchyAssessment } from 'src/app/models/assessment.model';
// import { ProgramClassModel } from 'src/app/models/program.model';
// import { TeacherClassModel } from 'src/app/models/class.model';
// import { AssessmentDalService } from './assessment-dal.service';
// describe('AssessmentDalService', () => {
//   let service: AssessmentDalService;
//   beforeEach(() => {
//     const indexedDbServiceStub = {
//       put: () => ({ subscribe: () => ({}) }),
//       get: () => ({}),
//       getAll: () => ({})
//     };
//     const programDalServiceStub = {
//       getProgramsByClass: () => ({ subscribe: () => ({}) }),
//       setProgramsByClass: () => ({})
//     };
//     const hierarchyAssessmentStub = { assessmentPath: {} };
//     const programClassModelStub = {
//       productId: {},
//       program: { identifier: {} }
//     };
//     const teacherClassModelStub = {};
//     TestBed.configureTestingModule({
//       providers: [
//         AssessmentDalService,
//         { provide: IndexedDbService, useValue: indexedDbServiceStub },
//         { provide: ProgramDalService, useValue: programDalServiceStub },
//         { provide: HierarchyAssessment, useValue: hierarchyAssessmentStub },
//         { provide: ProgramClassModel, useValue: programClassModelStub },
//         { provide: TeacherClassModel, useValue: teacherClassModelStub }
//       ]
//     });
//     service = TestBed.get(AssessmentDalService);
//   });
//   it('can load instance', () => {
//     expect(service).toBeTruthy();
//   });
//   describe('setAssessmentClassDataMap', () => {
//     it('makes expected calls', () => {
//       const programDalServiceStub: ProgramDalService = TestBed.get(
//         ProgramDalService
//       );
//       const teacherClassModelStub: TeacherClassModel = TestBed.get(
//         TeacherClassModel
//       );
//       spyOn(programDalServiceStub, 'getProgramsByClass');
//       spyOn(programDalServiceStub, 'setProgramsByClass');
//       service.setAssessmentClassDataMap(teacherClassModelStub);
//       expect(programDalServiceStub.getProgramsByClass).toHaveBeenCalled();
//       expect(programDalServiceStub.setProgramsByClass).toHaveBeenCalled();
//     });
//   });
//   describe('setAllAssessments', () => {
//     it('makes expected calls', () => {
//       const indexedDbServiceStub: IndexedDbService = TestBed.get(
//         IndexedDbService
//       );
//       spyOn(indexedDbServiceStub, 'getAll');
//       service.setAllAssessments();
//       expect(indexedDbServiceStub.getAll).toHaveBeenCalled();
//     });
//   });
// });
