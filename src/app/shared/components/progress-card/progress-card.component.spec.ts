// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { ProgressCardComponent } from './progress-card.component';
// import { TruncatePipe } from '../../pipes/truncate.pipe';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { DateFormatPipe } from '../../pipes/date-format.pipe';

// describe('ProgressCardComponent', () => {
//     let component: ProgressCardComponent;
//     let fixture: ComponentFixture<ProgressCardComponent>;

//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             declarations: [ProgressCardComponent,
//                 TruncatePipe,
//                 DateFormatPipe
//             ],
//             schemas: [CUSTOM_ELEMENTS_SCHEMA]
//         })
//             .compileComponents();
//     }));

//     beforeEach(() => {
//         fixture = TestBed.createComponent(ProgressCardComponent);
//         component = fixture.componentInstance;
//         component.checklist = {
//             path: 'Kindergarten > Unit 8 > Investigation 3>Session 3.5',
//             title: 'Fluency within 5',
//             assessment: {
//                 templatekind: '0',
//                 title: 'Fluency within 5',
//                 id: '14',
//                 type: 'checklist',
//                 criteria: [{
//                     id: 52,
//                     title: 'Subtraction within 5',
//                     'sequence': 1,
//                     'benchmarks': [1],
//                     'mathpractices': [282]
//                 },
//                 {
//                     id: 53, title: 'Addition within 5', sequence: 2, benchmarks: [1], mathpractices: [282]
//                 }]
//             },
//             shortname: 'Session 3.5', sequence: 140,
//             assessmentItem: {
//                 templatekind: '0',
//                 title: 'Fluency within 5',
//                 id: '14', type: 'checklist',
//                 criteria: [{
//                     id: 52, title: 'Subtraction within 5',
//                     sequence: 1,
//                     benchmarks: [1], mathpractices: [282]
//                 }, {
//                     id: 53, title: 'Addition within 5', sequence: 2, benchmarks: [1], mathpractices: [282]
//                 }]
//             }, parent: '1|8|21|140', parentid: '140', type: 'checklist', progressCount: 0
//         };
//         fixture.detectChanges();
//     });

//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });
// });
