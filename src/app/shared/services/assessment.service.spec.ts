// import { async, TestBed } from '@angular/core/testing';
// import { AngularFirestore } from 'angularfire2/firestore';
// import { AngularFireModule } from 'angularfire2';
// import { HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http';
// import { MediaService } from '../../shared/services/media.service';
// import { AngularFireDatabase } from 'angularfire2/database';
// import { Router, ActivatedRoute } from '@angular/router';
// import { BehaviorSubject } from 'rxjs';
// import { AssessmentService } from '../../shared/services/assessment.service';
// import { NotesService } from './notes.service';
// import { IndexedDbService } from '../../shared/services/indexed.db.service';
// import { environment } from '../../../environments/environment';
// import { CustomErrorHandlerService } from '../../shared/services/custom.errorhandler.service';
// import { AlertService } from '../../shared/components/alert/alert.service';
// import { FirebaseDbService } from '../../shared/services/firebase.db.service';
// import { FormsModule, FormBuilder } from '@angular/forms';
// import { UploadFileService } from '../../shared/services/upload-file.service';
// import { ModalService } from '../../shared/components/global-modal/modal.service';
// import { AccordionService } from './accordion.service';
// import { HeaderService } from '../../shared/components/header/header.service';
// import { MediaPopupService } from '../../shared/components/media-popup/media-popup.service';
// import { TelemetryService } from '../../shared/services/telemetry.service';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { of } from 'rxjs';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { AssessmentNavigationData } from '../mock-data/Assessment-checklist';
// import { GlobalService } from 'src/app/global.service';
// import { UserService } from 'src/app/auth/user.service';

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

// const navigationData = [
//   {
//     'title': 'Kindergarten',
//     'shortname': 'Kindergarten',
//     'sequence': 1,
//     'id': '1',
//     'isbn': [
//       '9780328946143',
//       '9780328938490'
//     ],
//     'nodes': [
//       {
//         'title': 'Counting People, Sorting Buttons',
//         'shortname': 'Unit 1',
//         'sequence': 1,
//         'id': '1',
//         'parent': '1',
//         'practice': {
//           'benchmarks': [
//             1,
//             2
//           ],
//           'mathpractices': [
//             282,
//             283
//           ]
//         },
//         'nodes': [
//           {
//             'title': 'Counting and Exploring Math Materials',
//             'shortname': 'Investigation 1',
//             'sequence': 1,
//             'id': '2',
//             'parent': '1|1',
//             'nodes': [
//               {
//                 'title': 'The Attendance Routine: How Many Are We?',
//                 'shortname': 'Session 1.1',
//                 'sequence': 1,
//                 'id': '1',
//                 'parent': '1|1|2',
//                 'path': 'Kindergarten|Unit 1|Investigation 1',
//                 'assessments': [
//                   93,
//                   71,
//                   70,
//                   69
//                 ]
//               },
//               {
//                 'title': 'Attendance: Counting Around the Circle',
//                 'shortname': 'Session 1.2',
//                 'sequence': 2,
//                 'id': '2',
//                 'parent': '1|1|2',
//                 'path': 'Kindergarten|Unit 1|Investigation 1',
//                 'assessments': [
//                   126
//                 ]
//               },
//               {
//                 'title': 'The Calendar Routine',
//                 'id': '3',
//                 'shortname': 'Session 1.3',
//                 'sequence': 3,
//                 'parent': '1|1|2',
//                 'path': 'Kindergarten|Unit 1|Investigation 1',
//                 'assessments': [
//                   126
//                 ]
//               },
//               {
//                 'title': 'Calendar: Counting on the Calendar',
//                 'id': '4',
//                 'shortname': 'Session 1.4',
//                 'sequence': 4,
//                 'parent': '1|1|2',
//                 'path': 'Kindergarten|Unit 1|Investigation 1',
//                 'assessments': [
//                   126
//                 ]
//               },
//               {
//                 'title': 'Counting and Representing the Class Attendance',
//                 'id': '5',
//                 'shortname': 'Session 1.5',
//                 'sequence': 5,
//                 'parent': '1|1|2',
//                 'path': 'Kindergarten|Unit 1|Investigation 1',
//                 'assessments': [
//                   813,
//                   67,
//                   72,
//                   66,
//                   126
//                 ]
//               }
//             ]
//           },
//           {
//             'title': 'Counting and Describing Attributes',
//             'shortname': 'Investigation 2',
//             'sequence': 2,
//             'parent': '1|1',
//             'id': '3',
//             'nodes': [
//               {
//                 'title': 'Counting Jar: How Many Did You Find?',
//                 'shortname': 'Session 2.5',
//                 'sequence': 10,
//                 'id': '10',
//                 'parent': '1|1|3',
//                 'path': 'Kindergarten|Unit 1|Investigation 2',
//                 'assessments': [
//                   7,
//                   126
//                 ]
//               },
//               {
//                 'title': 'The Counting Jar',
//                 'shortname': 'Session 2.1',
//                 'sequence': 6,
//                 'id': '6',
//                 'parent': '1|1|3',
//                 'path': 'Kindergarten|Unit 1|Investigation 2',
//                 'assessments': [
//                   40,
//                   126,
//                   7
//                 ]
//               },
//               {
//                 'title': 'Describing Attributes of Buttons',
//                 'id': '7',
//                 'shortname': 'Session 2.2',
//                 'sequence': 7,
//                 'parent': '1|1|3',
//                 'path': 'Kindergarten|Unit 1|Investigation 2',
//                 'assessments': [
//                   126,
//                   7
//                 ]
//               },
//               {
//                 'title': 'Button Match-Up',
//                 'id': '8',
//                 'parent': '1|1|3',
//                 'shortname': 'Session 2.3',
//                 'sequence': 8,
//                 'path': 'Kindergarten|Unit 1|Investigation 2',
//                 'assessments': [
//                   7,
//                   126,
//                   7,
//                   84
//                 ]
//               },
//               {
//                 'title': 'Calendar:Counting on the calendar',
//                 'id': '9',
//                 'parent': '1|1|3',
//                 'shortname': 'Session 2.4',
//                 'sequence': 9,
//                 'path': 'Kindergarten|Unit 1|Investigation 2',
//                 'assessments': [
//                   810,
//                   7,
//                   126
//                 ]
//               }
//             ]
//           },
//           {
//             'title': 'Collecting Data, Counting, and Sorting',
//             'shortname': 'Investigation 3',
//             'id': '4',
//             'parent': '1|1',
//             'sequence': 3,
//             'nodes': [
//               {
//                 'title': 'Today',
//                 'shortname': 'Session 3.1',
//                 'sequence': 11,
//                 'id': '11',
//                 'parent': '1|1|4',
//                 'path': 'Kindergarten|Unit 1|Investigation 3',
//                 'assessments': [
//                   104
//                 ]
//               },
//               {
//                 'title': 'Counting Jar: Recording',
//                 'shortname': 'Session 3.2',
//                 'sequence': 12,
//                 'id': '12',
//                 'parent': '1|1|4',
//                 'path': 'Kindergarten|Unit 1|Investigation 3',
//                 'assessments': [
//                   7,
//                   46,
//                   126
//                 ]
//               },
//               {
//                 'title': 'Sorting Students',
//                 'id': '13',
//                 'shortname': 'Session 3.3',
//                 'sequence': 13,
//                 'parent': '1|1|4',
//                 'path': 'Kindergarten|Unit 1|Investigation 3',
//                 'assessments': [
//                   7,
//                   126
//                 ]
//               },
//               {
//                 'title': 'Sorting Attribute Blocks',
//                 'id': '14',
//                 'parent': '1|1|4',
//                 'shortname': 'Session 3.4',
//                 'sequence': 14,
//                 'path': 'Kindergarten|Unit 1|Investigation 3',
//                 'assessments': [
//                   114,
//                   7,
//                   126
//                 ]
//               },
//               {
//                 'title': 'Today',
//                 'shortname': 'Session 3.5',
//                 'sequence': 15,
//                 'id': '15',
//                 'parent': '1|1|4',
//                 'path': 'Kindergarten|Unit 1|Investigation 3',
//                 'assessments': [
//                   7,
//                   126
//                 ]
//               },
//               {
//                 'title': 'Counting Jar: How Did You Record?',
//                 'shortname': 'Session 3.6',
//                 'sequence': 16,
//                 'id': '16',
//                 'parent': '1|1|4',
//                 'path': 'Kindergarten|Unit 1|Investigation 3',
//                 'assessments': [
//                   126,
//                   7
//                 ]
//               }
//             ]
//           }
//         ]
//       },
//       {
//         'title': 'Counting Quantities, Comparing Lengths',
//         'id': '2',
//         'shortname': 'Unit 2',
//         'parent': '1',
//         'sequence': 2,
//         'practice': {
//           'benchmarks': [
//             1,
//             2
//           ],
//           'mathpractices': [
//             282,
//             283
//           ]
//         },
//         'nodes': [
//           {
//             'shortname': 'Investigation 1',
//             'title': 'Counting and Representing Quantities',
//             'id': '5',
//             'sequence': 4,
//             'parent': '1|2',
//             'nodes': [
//               {
//                 'title': 'A Counting Book',
//                 'shortname': 'Session 1.1',
//                 'sequence': 17,
//                 'id': '17',
//                 'parent': '1|2|5',
//                 'path': 'Kindergarten|Unit 2|Investigation 1',
//                 'assessments': [
//                   8,
//                   94
//                 ]
//               },
//               {
//                 'title': 'Grab and Count',
//                 'shortname': 'Session 1.2',
//                 'sequence': 18,
//                 'id': '18',
//                 'parent': '1|2|5',
//                 'path': 'Kindergarten|Unit 2|Investigation 1',
//                 'assessments': [
//                   98,
//                   8
//                 ]
//               },
//               {
//                 'title': 'Counting Jar',
//                 'shortname': 'Session 1.3',
//                 'sequence': 19,
//                 'id': '19',
//                 'parent': '1|2|5',
//                 'path': 'Kindergarten|Unit 2|Investigation 1',
//                 'assessments': [
//                   43,
//                   8
//                 ]
//               },
//               {
//                 'title': 'Roll and Record',
//                 'shortname': 'Session 1.4',
//                 'sequence': 20,
//                 'id': '20',
//                 'parent': '1|2|5',
//                 'path': 'Kindergarten|Unit 2|Investigation 1',
//                 'assessments': [
//                   57
//                 ]
//               },
//               {
//                 'title': 'How Did I Count?',
//                 'shortname': 'Session 1.5',
//                 'sequence': 21,
//                 'id': '21',
//                 'parent': '1|2|5',
//                 'path': 'Kindergarten|Unit 2|Investigation 1',
//                 'assessments': [
//                   8
//                 ]
//               },
//               {
//                 'title': 'Does Order Matter When You Count?',
//                 'shortname': 'Session 1.6',
//                 'sequence': 22,
//                 'id': '22',
//                 'parent': '1|2|5',
//                 'path': 'Kindergarten|Unit 2|Investigation 1',
//                 'assessments': [
//                   8
//                 ]
//               },
//               {
//                 'title': 'Build It',
//                 'shortname': 'Session 1.7',
//                 'sequence': 23,
//                 'id': '23',
//                 'parent': '1|2|5',
//                 'path': 'Kindergarten|Unit 2|Investigation 1',
//                 'assessments': [
//                   100,
//                   8
//                 ]
//               },
//               {
//                 'title': 'Counting Jar',
//                 'shortname': 'Session 1.8',
//                 'sequence': 24,
//                 'id': '24',
//                 'parent': '1|2|5',
//                 'path': 'Kindergarten|Unit 2|Investigation 1',
//                 'assessments': [
//                   8,
//                   785,
//                   126
//                 ]
//               },
//               {
//                 'title': 'Inventories',
//                 'shortname': 'Session 1.9',
//                 'sequence': 25,
//                 'id': '25',
//                 'parent': '1|2|5',
//                 'path': 'Kindergarten|Unit 2|Investigation 1',
//                 'assessments': [
//                   39,
//                   8
//                 ]
//               },
//               {
//                 'title': 'Strategies for Accurate Counting',
//                 'shortname': 'Session 1.10',
//                 'sequence': 26,
//                 'id': '26',
//                 'parent': '1|2|5',
//                 'path': 'Kindergarten|Unit 2|Investigation 1',
//                 'assessments': [
//                   8
//                 ]
//               }
//             ]
//           },
//           {
//             'title': 'Comparing Lengths and Quantities',
//             'shortname': 'Investigation 2',
//             'sequence': 5,
//             'parent': '1|2',
//             'id': '6',
//             'nodes': [
//               {
//                 'title': 'Measurement Collections',
//                 'shortname': 'Session 2.1',
//                 'sequence': 27,
//                 'id': '27',
//                 'parent': '1|2|6',
//                 'path': 'Kindergarten|Unit 2|Investigation 2',
//                 'assessments': [
//                   8,
//                   4
//                 ]
//               },
//               {
//                 'title': 'How Did You Compare Lengths?',
//                 'shortname': 'Session 2.2',
//                 'sequence': 28,
//                 'id': '28',
//                 'parent': '1|2|6',
//                 'path': 'Kindergarten|Unit 2|Investigation 2',
//                 'assessments': [
//                   8,
//                   4
//                 ]
//               },
//               {
//                 'title': 'Counting and Comparing',
//                 'shortname': 'Session 2.3',
//                 'sequence': 29,
//                 'id': '29',
//                 'parent': '1|2|6',
//                 'path': 'Kindergarten|Unit 2|Investigation 2',
//                 'assessments': [
//                   4,
//                   8
//                 ]
//               },
//               {
//                 'title': 'Grab and Count: Compare',
//                 'shortname': 'Session 2.4',
//                 'sequence': 30,
//                 'id': '30',
//                 'parent': '1|2|6',
//                 'path': 'Kindergarten|Unit 2|Investigation 2',
//                 'assessments': [
//                   5,
//                   58,
//                   126,
//                   4,
//                   8
//                 ]
//               },
//               {
//                 'title': 'Compare',
//                 'shortname': 'Session 2.5',
//                 'sequence': 31,
//                 'id': '31',
//                 'parent': '1|2|6',
//                 'path': 'Kindergarten|Unit 2|Investigation 2',
//                 'assessments': [
//                   50,
//                   5
//                 ]
//               },
//               {
//                 'title': 'Comparing Lengths and Quantities',
//                 'shortname': 'Session 2.6',
//                 'sequence': 32,
//                 'id': '32',
//                 'parent': '1|2|6',
//                 'path': 'Kindergarten|Unit 2|Investigation 2',
//                 'assessments': [
//                   64,
//                   5,
//                   4
//                 ]
//               },
//               {
//                 'title': 'How Many Letters in Your Name?',
//                 'shortname': 'Session 2.7',
//                 'sequence': 33,
//                 'id': '33',
//                 'parent': '1|2|6',
//                 'path': 'Kindergarten|Unit 2|Investigation 2',
//                 'assessments': [
//                   4,
//                   5,
//                   120
//                 ]
//               },
//               {
//                 'title': 'Counting Jar',
//                 'shortname': 'Session 2.8',
//                 'sequence': 34,
//                 'id': '34',
//                 'parent': '1|2|6',
//                 'path': 'Kindergarten|Unit 2|Investigation 2',
//                 'assessments': [
//                   4,
//                   5,
//                   21
//                 ]
//               },
//               {
//                 'title': 'Comparing Name Lengths',
//                 'shortname': 'Session 2.9',
//                 'sequence': 35,
//                 'id': '35',
//                 'parent': '1|2|6',
//                 'path': 'Kindergarten|Unit 2|Investigation 2',
//                 'assessments': [
//                   51,
//                   8,
//                   5
//                 ]
//               },
//               {
//                 'title': 'Grab and Count: Ordering',
//                 'shortname': 'Session 2.10',
//                 'sequence': 36,
//                 'id': '36',
//                 'parent': '1|2|6',
//                 'path': 'Kindergarten|Unit 2|Investigation 2',
//                 'assessments': [
//                   49,
//                   5,
//                   126
//                 ]
//               },
//               {
//                 'title': 'Assessment and Comparing',
//                 'shortname': 'Session 2.11',
//                 'sequence': 37,
//                 'id': '37',
//                 'parent': '1|2|6',
//                 'path': 'Kindergarten|Unit 2|Investigation 2',
//                 'assessments': [
//                   4,
//                   5,
//                   8
//                 ]
//               },
//               {
//                 'title': 'Assessment',
//                 'shortname': 'Session 2.12',
//                 'sequence': 38,
//                 'id': '38',
//                 'parent': '1|2|6',
//                 'path': 'Kindergarten|Unit 2|Investigation 2',
//                 'assessments': [
//                   4,
//                   5,
//                   8
//                 ]
//               }
//             ]
//           }
//         ]
//       },
//       {
//         'title': 'Make a Shape, Fill a Hexagon',
//         'id': '3',
//         'parent': '1',
//         'shortname': 'Unit 3',
//         'sequence': 3,
//         'practice': {
//           'benchmarks': [
//             1,
//             2
//           ],
//           'mathpractices': [
//             282,
//             283
//           ]
//         },
//         'nodes': [
//           {
//             'title': 'Describing and Making 2-D Shapes',
//             'id': '7',
//             'sequence': 6,
//             'shortname': 'Investigation 1',
//             'parent': '1|3',
//             'nodes': [
//               {
//                 'title': 'Shape Pictures',
//                 'shortname': 'Session 1.1',
//                 'sequence': 39,
//                 'id': '39',
//                 'parent': '1|3|7',
//                 'path': 'Kindergarten|Unit 3|Investigation 1',
//                 'assessments': [
//                   60,
//                   12
//                 ]
//               },
//               {
//                 'title': 'Circles and Rectangles',
//                 'shortname': 'Session 1.2',
//                 'sequence': 40,
//                 'id': '40',
//                 'parent': '1|3|7',
//                 'path': 'Kindergarten|Unit 3|Investigation 1',
//                 'assessments': [
//                   126,
//                   80,
//                   79,
//                   78,
//                   12,
//                   801
//                 ]
//               },
//               {
//                 'title': 'Making and Describing 2-D Shapes',
//                 'id': '41',
//                 'shortname': 'Session 1.3',
//                 'sequence': 41,
//                 'parent': '1|3|7',
//                 'path': 'Kindergarten|Unit 3|Investigation 1',
//                 'assessments': [
//                   12,
//                   36,
//                   17
//                 ]
//               },
//               {
//                 'title': 'Shapes on the Geoboard',
//                 'id': '42',
//                 'parent': '1|3|7',
//                 'shortname': 'Session 1.4',
//                 'sequence': 42,
//                 'path': 'Kindergarten|Unit 3|Investigation 1',
//                 'assessments': [
//                   17,
//                   91,
//                   126,
//                   92,
//                   12
//                 ]
//               },
//               {
//                 'title': 'Our Book of Shapes',
//                 'id': '43',
//                 'parent': '1|3|7',
//                 'shortname': 'Session 1.5',
//                 'sequence': 43,
//                 'path': 'Kindergarten|Unit 3|Investigation 1',
//                 'assessments': [
//                   17,
//                   12
//                 ]
//               }
//             ]
//           },
//           {
//             'title': 'Making and Combining 2-D Shapes',
//             'shortname': 'Investigation 2',
//             'sequence': 7,
//             'parent': '1|3',
//             'id': '8',
//             'nodes': [
//               {
//                 'title': 'Shape Mural',
//                 'shortname': 'Session 2.1',
//                 'sequence': 44,
//                 'id': '44',
//                 'parent': '1|3|8',
//                 'path': 'Kindergarten|Unit 3|Investigation 2',
//                 'assessments': [
//                   12,
//                   121,
//                   17,
//                   126
//                 ]
//               },
//               {
//                 'title': 'Pattern Block Puzzles: Combining Shapes',
//                 'shortname': 'Session 2.2',
//                 'sequence': 45,
//                 'id': '45',
//                 'parent': '1|3|8',
//                 'path': 'Kindergarten|Unit 3|Investigation 2',
//                 'assessments': [
//                   2,
//                   75,
//                   796,
//                   12,
//                   126,
//                   17,
//                   126
//                 ]
//               },
//               {
//                 'title': 'Fill the Hexagons',
//                 'shortname': 'Session 2.3',
//                 'sequence': 46,
//                 'id': '46',
//                 'parent': '1|3|8',
//                 'path': 'Kindergarten|Unit 3|Investigation 2',
//                 'assessments': [
//                   2,
//                   74,
//                   12
//                 ]
//               },
//               {
//                 'title': 'Combining Shapes',
//                 'shortname': 'Session 2.4',
//                 'sequence': 47,
//                 'id': '47',
//                 'parent': '1|3|8',
//                 'path': 'Kindergarten|Unit 3|Investigation 2',
//                 'assessments': [
//                   2,
//                   126,
//                   12,
//                   1
//                 ]
//               },
//               {
//                 'title': 'Ways to Make a Hexagon',
//                 'shortname': 'Session 2.5',
//                 'sequence': 48,
//                 'id': '48',
//                 'parent': '1|3|8',
//                 'path': 'Kindergarten|Unit 3|Investigation 2',
//                 'assessments': [
//                   2,
//                   27,
//                   12
//                 ]
//               },
//               {
//                 'title': 'Assessment and the Counting Jar',
//                 'shortname': 'Session 2.6',
//                 'sequence': 49,
//                 'id': '49',
//                 'parent': '1|3|8',
//                 'path': 'Kindergarten|Unit 3|Investigation 2',
//                 'assessments': [
//                   17,
//                   2,
//                   12
//                 ]
//               },
//               {
//                 'title': 'Assessment',
//                 'shortname': 'Session 2.7',
//                 'sequence': 50,
//                 'id': '50',
//                 'parent': '1|3|8',
//                 'path': 'Kindergarten|Unit 3|Investigation 2',
//                 'assessments': [
//                   126,
//                   12,
//                   17,
//                   2
//                 ]
//               }
//             ]
//           }
//         ]
//       },
//       {
//         'title': 'Collect, Count, and Measure',
//         'id': '4',
//         'parent': '1',
//         'shortname': 'Unit 4',
//         'sequence': 4,
//         'practice': {
//           'benchmarks': [
//             1,
//             2
//           ],
//           'mathpractices': [
//             282,
//             283
//           ]
//         },
//         'nodes': [
//           {
//             'title': 'Measuring and Counting',
//             'shortname': 'Investigation 1',
//             'sequence': 8,
//             'parent': '1|4',
//             'id': '9',
//             'nodes': [
//               {
//                 'title': 'Measuring Our Shoes',
//                 'shortname': 'Session 1.1',
//                 'sequence': 51,
//                 'id': '51',
//                 'parent': '1|4|9',
//                 'path': 'Kindergarten|Unit 4|Investigation 1',
//                 'assessments': [
//                   108
//                 ]
//               },
//               {
//                 'title': 'Measuring Different Shoe Lengths',
//                 'shortname': 'Session 1.2',
//                 'sequence': 52,
//                 'id': '52',
//                 'parent': '1|4|9',
//                 'path': 'Kindergarten|Unit 4|Investigation 1',
//                 'assessments': [
//                   107,
//                   9,
//                   802,
//                   126
//                 ]
//               },
//               {
//                 'title': 'Measuring with Sticks',
//                 'shortname': 'Session 1.3',
//                 'sequence': 53,
//                 'id': '53',
//                 'parent': '1|4|9',
//                 'path': 'Kindergarten|Unit 4|Investigation 1',
//                 'assessments': [
//                   9,
//                   105
//                 ]
//               },
//               {
//                 'title': 'Comparing Lengths of Shoes',
//                 'shortname': 'Session 1.4',
//                 'sequence': 54,
//                 'id': '54',
//                 'parent': '1|4|9',
//                 'path': 'Kindergarten|Unit 4|Investigation 1',
//                 'assessments': [
//                   9
//                 ]
//               },
//               {
//                 'title': 'Measuring with Cubes',
//                 'shortname': 'Session 1.5',
//                 'sequence': 55,
//                 'id': '55',
//                 'parent': '1|4|9',
//                 'path': 'Kindergarten|Unit 4|Investigation 1',
//                 'assessments': [
//                   9,
//                   106
//                 ]
//               },
//               {
//                 'title': 'Counting and Combining',
//                 'shortname': 'Session 1.6',
//                 'sequence': 56,
//                 'id': '56',
//                 'parent': '1|4|9',
//                 'path': 'Kindergarten|Unit 4|Investigation 1',
//                 'assessments': [
//                   9,
//                   55,
//                   815
//                 ]
//               },
//               {
//                 'title': 'Collect 15 Together',
//                 'shortname': 'Session 1.7',
//                 'sequence': 57,
//                 'id': '57',
//                 'parent': '1|4|9',
//                 'path': 'Kindergarten|Unit 4|Investigation 1',
//                 'assessments': [
//                   9,
//                   53
//                 ]
//               },
//               {
//                 'title': 'Build On',
//                 'shortname': 'Session 1.8',
//                 'sequence': 58,
//                 'id': '58',
//                 'parent': '1|4|9',
//                 'path': 'Kindergarten|Unit 4|Investigation 1',
//                 'assessments': [
//                   9,
//                   101
//                 ]
//               },
//               {
//                 'title': 'Roll and Record 2',
//                 'shortname': 'Session 1.9',
//                 'sequence': 59,
//                 'id': '59',
//                 'parent': '1|4|9',
//                 'path': 'Kindergarten|Unit 4|Investigation 1',
//                 'assessments': [
//                   47
//                 ]
//               },
//               {
//                 'title': 'Quick Images: Ten Frames',
//                 'shortname': 'Session 1.10',
//                 'sequence': 60,
//                 'id': '60',
//                 'parent': '1|4|9',
//                 'path': 'Kindergarten|Unit 4|Investigation 1',
//                 'assessments': [
//                   45,
//                   9
//                 ]
//               }
//             ]
//           },
//           {
//             'title': 'Changing Quantities: How Many Now?',
//             'shortname': 'Investigation 2',
//             'sequence': 9,
//             'parent': '1|4',
//             'id': '10',
//             'nodes': [
//               {
//                 'title': 'Racing Bears',
//                 'shortname': 'Session 2.1',
//                 'sequence': 61,
//                 'id': '61',
//                 'parent': '1|4|10',
//                 'path': 'Kindergarten|Unit 4|Investigation 2',
//                 'assessments': [
//                   62
//                 ]
//               },
//               {
//                 'title': 'Introducing Story Problems',
//                 'shortname': 'Session 2.2',
//                 'sequence': 62,
//                 'id': '62',
//                 'parent': '1|4|10',
//                 'path': 'Kindergarten|Unit 4|Investigation 2',
//                 'assessments': [
//                   9
//                 ]
//               },
//               {
//                 'title': 'One More, One Less',
//                 'shortname': 'Session 2.3',
//                 'sequence': 63,
//                 'id': '63',
//                 'parent': '1|4|10',
//                 'path': 'Kindergarten|Unit 4|Investigation 2',
//                 'assessments': [
//                   77,
//                   9,
//                   20
//                 ]
//               },
//               {
//                 'title': 'Double Compare',
//                 'shortname': 'Session 2.4',
//                 'sequence': 64,
//                 'id': '64',
//                 'parent': '1|4|10',
//                 'path': 'Kindergarten|Unit 4|Investigation 2',
//                 'assessments': [
//                   20,
//                   9,
//                   28
//                 ]
//               },
//               {
//                 'title': 'Counting, Combining, and Comparing',
//                 'shortname': 'Session 2.5',
//                 'sequence': 65,
//                 'id': '65',
//                 'parent': '1|4|10',
//                 'path': 'Kindergarten|Unit 4|Investigation 2',
//                 'assessments': [
//                   20
//                 ]
//               },
//               {
//                 'title': 'Build It/Change It',
//                 'shortname': 'Session 2.6',
//                 'sequence': 66,
//                 'id': '66',
//                 'parent': '1|4|10',
//                 'path': 'Kindergarten|Unit 4|Investigation 2',
//                 'assessments': [
//                   20,
//                   116
//                 ]
//               },
//               {
//                 'title': 'Who Has More?: Comparing Totals',
//                 'shortname': 'Session 2.7',
//                 'sequence': 67,
//                 'id': '67',
//                 'parent': '1|4|10',
//                 'path': 'Kindergarten|Unit 4|Investigation 2',
//                 'assessments': [
//                   20
//                 ]
//               }
//             ]
//           },
//           {
//             'title': 'Number of Tiles',
//             'shortname': 'Investigation 3',
//             'sequence': 10,
//             'parent': '1|4',
//             'id': '11',
//             'nodes': [
//               {
//                 'title': 'Ways To Make Six',
//                 'shortname': 'Session 3.1',
//                 'sequence': 68,
//                 'id': '68',
//                 'parent': '1|4|11',
//                 'path': 'Kindergarten|Unit 4|Investigation 3',
//                 'assessments': [
//                   76,
//                   126
//                 ]
//               },
//               {
//                 'title': 'Arrangements of Six: Numbers and Notation',
//                 'shortname': 'Session 3.2',
//                 'sequence': 69,
//                 'id': '69',
//                 'parent': '1|4|11',
//                 'path': 'Kindergarten|Unit 4|Investigation 3',
//                 'assessments': [
//                   799,
//                   126,
//                   787,
//                   20
//                 ]
//               },
//               {
//                 'title': 'Arrangements with 5 to 10 Tiles',
//                 'shortname': 'Session 3.3',
//                 'sequence': 70,
//                 'id': '70',
//                 'parent': '1|4|11',
//                 'path': 'Kindergarten|Unit 4|Investigation 3',
//                 'assessments': [
//                   24,
//                   20,
//                   126
//                 ]
//               },
//               {
//                 'title': 'Toss the Chips',
//                 'shortname': 'Session 3.4',
//                 'sequence': 71,
//                 'id': '71',
//                 'parent': '1|4|11',
//                 'path': 'Kindergarten|Unit 4|Investigation 3',
//                 'assessments': [
//                   126,
//                   20,
//                   126,
//                   68
//                 ]
//               },
//               {
//                 'title': 'Assessment and Arrangements of Numbers',
//                 'shortname': 'Session 3.5',
//                 'sequence': 72,
//                 'id': '72',
//                 'parent': '1|4|11',
//                 'path': 'Kindergarten|Unit 4|Investigation 3',
//                 'assessments': [
//                   20,
//                   9
//                 ]
//               },
//               {
//                 'title': 'Assessment and Tossing 6 Chips',
//                 'shortname': 'Session 3.6',
//                 'sequence': 73,
//                 'id': '73',
//                 'parent': '1|4|11',
//                 'path': 'Kindergarten|Unit 4|Investigation 3',
//                 'assessments': [
//                   20,
//                   9
//                 ]
//               }
//             ]
//           }
//         ]
//       },
//       {
//         'title': 'Build a Block, Build a Wall',
//         'id': '5',
//         'parent': '1',
//         'shortname': 'Unit 5',
//         'sequence': 5,
//         'practice': {
//           'benchmarks': [
//             1,
//             2
//           ],
//           'mathpractices': [
//             282,
//             283
//           ]
//         },
//         'nodes': [
//           {
//             'title': 'Describing, Making, and Combining 3-D Shapes',
//             'shortname': 'Investigation 1',
//             'sequence': 11,
//             'parent': '1|5',
//             'id': '12',
//             'nodes': [
//               {
//                 'title': '3-D Shape Hunt',
//                 'shortname': 'Session 1.1',
//                 'sequence': 74,
//                 'id': '74',
//                 'parent': '1|5|12',
//                 'path': 'Kindergarten|Unit 5|Investigation 1',
//                 'assessments': [
//                   13,
//                   90,
//                   126
//                 ]
//               },
//               {
//                 'title': 'Describing Features of Geoblocks',
//                 'shortname': 'Session 1.2',
//                 'sequence': 75,
//                 'id': '75',
//                 'parent': '1|5|12',
//                 'path': 'Kindergarten|Unit 5|Investigation 1',
//                 'assessments': [
//                   65,
//                   798,
//                   13,
//                   126
//                 ]
//               },
//               {
//                 'title': 'Copying Cubes and Matching Faces',
//                 'shortname': 'Session 1.3',
//                 'sequence': 76,
//                 'id': '76',
//                 'parent': '1|5|12',
//                 'path': 'Kindergarten|Unit 5|Investigation 1',
//                 'assessments': [
//                   13,
//                   34,
//                   25
//                 ]
//               },
//               {
//                 'title': 'Making 3-D Shapes',
//                 'shortname': 'Session 1.4',
//                 'sequence': 77,
//                 'id': '77',
//                 'parent': '1|5|12',
//                 'path': 'Kindergarten|Unit 5|Investigation 1',
//                 'assessments': [
//                   37,
//                   13,
//                   18
//                 ]
//               },
//               {
//                 'title': 'Faces of Geoblocks',
//                 'shortname': 'Session 1.5',
//                 'sequence': 78,
//                 'id': '78',
//                 'parent': '1|5|12',
//                 'path': 'Kindergarten|Unit 5|Investigation 1',
//                 'assessments': [
//                   18,
//                   13,
//                   96
//                 ]
//               },
//               {
//                 'title': 'Build a Block',
//                 'shortname': 'Session 1.6',
//                 'sequence': 79,
//                 'id': '79',
//                 'parent': '1|5|12',
//                 'path': 'Kindergarten|Unit 5|Investigation 1',
//                 'assessments': [
//                   13,
//                   30,
//                   18,
//                   35,
//                   3
//                 ]
//               },
//               {
//                 'title': 'Cubes',
//                 'shortname': 'Session 1.7',
//                 'sequence': 80,
//                 'id': '80',
//                 'parent': '1|5|12',
//                 'path': 'Kindergarten|Unit 5|Investigation 1',
//                 'assessments': [
//                   115,
//                   809,
//                   13,
//                   3
//                 ]
//               },
//               {
//                 'title': 'Comparing Cubes and Prisms',
//                 'shortname': 'Session 1.8',
//                 'sequence': 81,
//                 'id': '81',
//                 'parent': '1|5|12',
//                 'path': 'Kindergarten|Unit 5|Investigation 1',
//                 'assessments': [
//                   13,
//                   126
//                 ]
//               },
//               {
//                 'title': 'Assessment and Comparing 2-D and 3-D Shapes',
//                 'shortname': 'Session 1.9',
//                 'sequence': 82,
//                 'id': '82',
//                 'parent': '1|5|12',
//                 'path': 'Kindergarten|Unit 5|Investigation 1',
//                 'assessments': [
//                   13,
//                   18,
//                   3,
//                   126
//                 ]
//               },
//               {
//                 'title': 'Assessment and the Counting Jar',
//                 'shortname': 'Session 1.10',
//                 'sequence': 83,
//                 'id': '83',
//                 'parent': '1|5|12',
//                 'path': 'Kindergarten|Unit 5|Investigation 1',
//                 'assessments': [
//                   13,
//                   18,
//                   3,
//                   126
//                 ]
//               }
//             ]
//           }
//         ]
//       },
//       {
//         'title': 'How Many Now?',
//         'id': '6',
//         'parent': '1',
//         'shortname': 'Unit 6',
//         'sequence': 6,
//         'practice': {
//           'benchmarks': [
//             1,
//             2
//           ],
//           'mathpractices': [
//             282,
//             283
//           ]
//         },
//         'nodes': [
//           {
//             'title': 'Counting Larger Quantities',
//             'shortname': 'Investigation 1',
//             'sequence': 12,
//             'parent': '1|6',
//             'id': '13',
//             'nodes': [
//               {
//                 'title': 'Counting and Measuring',
//                 'shortname': 'Session 1.1',
//                 'sequence': 84,
//                 'id': '84',
//                 'parent': '1|6|13',
//                 'path': 'Kindergarten|Unit 6|Investigation 1',
//                 'assessments': [
//                   127,
//                   117,
//                   803,
//                   835
//                 ]
//               },
//               {
//                 'title': 'Counting on the Number Line',
//                 'shortname': 'Session 1.2',
//                 'sequence': 85,
//                 'id': '85',
//                 'parent': '1|6|13',
//                 'path': 'Kindergarten|Unit 6|Investigation 1',
//                 'assessments': [
//                   127,
//                   835
//                 ]
//               },
//               {
//                 'title': 'Collect 20 Together',
//                 'shortname': 'Session 1.3',
//                 'sequence': 86,
//                 'id': '86',
//                 'parent': '1|6|13',
//                 'path': 'Kindergarten|Unit 6|Investigation 1',
//                 'assessments': [
//                   835,
//                   52,
//                   127,
//                   10
//                 ]
//               },
//               {
//                 'title': 'Inventory Bags',
//                 'shortname': 'Session 1.4',
//                 'sequence': 87,
//                 'id': '87',
//                 'parent': '1|6|13',
//                 'path': 'Kindergarten|Unit 6|Investigation 1',
//                 'assessments': [
//                   99,
//                   835
//                 ]
//               },
//               {
//                 'title': 'How Did You Count?',
//                 'shortname': 'Session 1.5',
//                 'sequence': 88,
//                 'id': '88',
//                 'parent': '1|6|13',
//                 'path': 'Kindergarten|Unit 6|Investigation 1',
//                 'assessments': [
//                   835,
//                   10
//                 ]
//               },
//               {
//                 'title': 'Representing an Inventory',
//                 'shortname': 'Session 1.6',
//                 'sequence': 89,
//                 'id': '89',
//                 'parent': '1|6|13',
//                 'path': 'Kindergarten|Unit 6|Investigation 1',
//                 'assessments': [
//                   44,
//                   835,
//                   22
//                 ]
//               }
//             ]
//           },
//           {
//             'title': 'How Many in All?',
//             'shortname': 'Investigation 2',
//             'sequence': 13,
//             'parent': '1|6',
//             'id': '14',
//             'nodes': [
//               {
//                 'title': 'Roll and Record 3',
//                 'shortname': 'Session 2.1',
//                 'sequence': 90,
//                 'id': '90',
//                 'parent': '1|6|14',
//                 'path': 'Kindergarten|Unit 6|Investigation 2',
//                 'assessments': [
//                   127,
//                   48,
//                   22
//                 ]
//               },
//               {
//                 'title': 'Double Compare',
//                 'shortname': 'Session 2.2',
//                 'sequence': 91,
//                 'id': '91',
//                 'parent': '1|6|14',
//                 'path': 'Kindergarten|Unit 6|Investigation 2',
//                 'assessments': [
//                   29,
//                   127,
//                   22
//                 ]
//               },
//               {
//                 'title': 'Modeling Story Problems',
//                 'shortname': 'Session 2.3',
//                 'sequence': 92,
//                 'id': '92',
//                 'parent': '1|6|14',
//                 'path': 'Kindergarten|Unit 6|Investigation 2',
//                 'assessments': [
//                   22,
//                   127,
//                   10
//                 ]
//               },
//               {
//                 'title': 'Build and Remove',
//                 'shortname': 'Session 2.4',
//                 'sequence': 93,
//                 'id': '93',
//                 'parent': '1|6|14',
//                 'path': 'Kindergarten|Unit 6|Investigation 2',
//                 'assessments': [
//                   103
//                 ]
//               },
//               {
//                 'title': 'Representing Story Problems with Cubes',
//                 'shortname': 'Session 2.5',
//                 'sequence': 94,
//                 'id': '94',
//                 'parent': '1|6|14',
//                 'path': 'Kindergarten|Unit 6|Investigation 2',
//                 'assessments': [
//                   22,
//                   127,
//                   22
//                 ]
//               },
//               {
//                 'title': 'How Many Blocks?',
//                 'shortname': 'Session 2.6',
//                 'sequence': 95,
//                 'id': '95',
//                 'parent': '1|6|14',
//                 'path': 'Kindergarten|Unit 6|Investigation 2',
//                 'assessments': [
//                   110,
//                   127,
//                   22
//                 ]
//               },
//               {
//                 'title': 'How Do You Show The One That Is Gone?',
//                 'shortname': 'Session 2.7',
//                 'sequence': 96,
//                 'id': '96',
//                 'parent': '1|6|14',
//                 'path': 'Kindergarten|Unit 6|Investigation 2',
//                 'assessments': [
//                   22,
//                   127,
//                   112
//                 ]
//               },
//               {
//                 'title': 'How Many Balls?',
//                 'shortname': 'Session 2.8',
//                 'sequence': 97,
//                 'id': '97',
//                 'parent': '1|6|14',
//                 'path': 'Kindergarten|Unit 6|Investigation 2',
//                 'assessments': [
//                   111,
//                   127,
//                   22
//                 ]
//               }
//             ]
//           },
//           {
//             'title': 'How Many of Each?',
//             'shortname': 'Investigation 3',
//             'sequence': 14,
//             'parent': '1|6',
//             'id': '15',
//             'nodes': [
//               {
//                 'title': 'Five Crayons in All',
//                 'shortname': 'Session 3.1',
//                 'sequence': 98,
//                 'id': '98',
//                 'parent': '1|6|15',
//                 'path': 'Kindergarten|Unit 6|Investigation 3',
//                 'assessments': [
//                   109,
//                   11
//                 ]
//               },
//               {
//                 'title': 'Combinations of Six',
//                 'shortname': 'Session 3.2',
//                 'sequence': 99,
//                 'id': '99',
//                 'parent': '1|6|15',
//                 'path': 'Kindergarten|Unit 6|Investigation 3',
//                 'assessments': [
//                   127,
//                   835,
//                   81,
//                   59,
//                   61,
//                   11
//                 ]
//               },
//               {
//                 'title': 'Total of Six',
//                 'shortname': 'Session 3.3',
//                 'sequence': 100,
//                 'id': '100',
//                 'parent': '1|6|15',
//                 'path': 'Kindergarten|Unit 6|Investigation 3',
//                 'assessments': [
//                   73,
//                   11
//                 ]
//               },
//               {
//                 'title': 'Six Crayons in All',
//                 'shortname': 'Session 3.4',
//                 'sequence': 101,
//                 'id': '101',
//                 'parent': '1|6|15',
//                 'path': 'Kindergarten|Unit 6|Investigation 3',
//                 'assessments': [
//                   11,
//                   835,
//                   10
//                 ]
//               },
//               {
//                 'title': 'Assessment and the Counting Jar',
//                 'shortname': 'Session 3.5',
//                 'sequence': 102,
//                 'id': '102',
//                 'parent': '1|6|15',
//                 'path': 'Kindergarten|Unit 6|Investigation 3',
//                 'assessments': [
//                   835,
//                   127,
//                   22,
//                   11
//                 ]
//               },
//               {
//                 'title': 'Assessment and Combinations of Six',
//                 'shortname': 'Session 3.6',
//                 'sequence': 103,
//                 'id': '103',
//                 'parent': '1|6|15',
//                 'path': 'Kindergarten|Unit 6|Investigation 3',
//                 'assessments': [
//                   835,
//                   127,
//                   22,
//                   11
//                 ]
//               }
//             ]
//           }
//         ]
//       },
//       {
//         'title': 'How Many Noses? How Many Eyes? ',
//         'id': '7',
//         'parent': '1',
//         'shortname': 'Unit 7',
//         'sequence': 7,
//         'practice': {
//           'benchmarks': [
//             1,
//             2
//           ],
//           'mathpractices': [
//             282,
//             283
//           ]
//         },
//         'nodes': [
//           {
//             'title': 'How Are They the Same? How Are They Different?',
//             'shortname': 'Investigation 1',
//             'sequence': 15,
//             'parent': '1|7',
//             'id': '16',
//             'nodes': [
//               {
//                 'title': 'Attribute Block and Button Match-Up',
//                 'shortname': 'Session 1.1',
//                 'sequence': 104,
//                 'id': '104',
//                 'parent': '1|7|16',
//                 'path': 'Kindergarten|Unit 7|Investigation 1',
//                 'assessments': [
//                   10,
//                   86,
//                   85
//                 ]
//               },
//               {
//                 'title': 'Pattern Block Grab',
//                 'shortname': 'Session 1.2',
//                 'sequence': 105,
//                 'id': '105',
//                 'parent': '1|7|16',
//                 'path': 'Kindergarten|Unit 7|Investigation 1',
//                 'assessments': [
//                   23,
//                   113
//                 ]
//               },
//               {
//                 'title': 'Attribute Dominoes',
//                 'id': '106',
//                 'shortname': 'Session 1.3',
//                 'sequence': 106,
//                 'parent': '1|7|16',
//                 'path': 'Kindergarten|Unit 7|Investigation 1',
//                 'assessments': [
//                   97,
//                   23
//                 ]
//               },
//               {
//                 'title': 'Organizing Data: Favorite Lunch Foods',
//                 'id': '107',
//                 'shortname': 'Session 1.4',
//                 'parent': '1|7|16',
//                 'path': 'Kindergarten|Unit 7|Investigation 1',
//                 'sequence': 107
//               }
//             ]
//           },
//           {
//             'title': 'Data Projects',
//             'shortname': 'Investigation 2',
//             'sequence': 16,
//             'parent': '1|7',
//             'id': '17',
//             'nodes': [
//               {
//                 'title': 'Do You Like...? Surveys',
//                 'shortname': 'Session 2.1',
//                 'sequence': 108,
//                 'id': '108',
//                 'parent': '1|7|17',
//                 'path': 'Kindergarten|Unit 7|Investigation 2'
//               },
//               {
//                 'title': 'Collecting Data',
//                 'shortname': 'Session 2.2',
//                 'sequence': 109,
//                 'id': '109',
//                 'parent': '1|7|17',
//                 'path': 'Kindergarten|Unit 7|Investigation 2',
//                 'assessments': [
//                   19,
//                   26,
//                   800,
//                   23,
//                   113
//                 ]
//               },
//               {
//                 'title': 'Sharing Survey Data',
//                 'id': '110',
//                 'shortname': 'Session 2.3',
//                 'sequence': 110,
//                 'parent': '1|7|17',
//                 'path': 'Kindergarten|Unit 7|Investigation 2',
//                 'assessments': [
//                   10,
//                   19,
//                   23
//                 ]
//               }
//             ]
//           },
//           {
//             'title': 'How Many Noses? How Many Eyes?',
//             'shortname': 'Investigation 3',
//             'sequence': 17,
//             'parent': '1|7',
//             'id': '18',
//             'nodes': [
//               {
//                 'title': 'How Many Are We?',
//                 'shortname': 'Session 3.1',
//                 'sequence': 111,
//                 'id': '111',
//                 'parent': '1|7|18',
//                 'path': 'Kindergarten|Unit 7|Investigation 3',
//                 'assessments': [
//                   95
//                 ]
//               },
//               {
//                 'title': 'How Many Noses?',
//                 'shortname': 'Session 3.2',
//                 'sequence': 112,
//                 'id': '112',
//                 'parent': '1|7|18',
//                 'path': 'Kindergarten|Unit 7|Investigation 3'
//               },
//               {
//                 'title': 'How Many Eyes?',
//                 'shortname': 'Session 3.3',
//                 'sequence': 113,
//                 'id': '113',
//                 'parent': '1|7|18',
//                 'path': 'Kindergarten|Unit 7|Investigation 3'
//               },
//               {
//                 'title': 'Counting Chairs',
//                 'shortname': 'Session 3.4',
//                 'sequence': 114,
//                 'id': '114',
//                 'parent': '1|7|18',
//                 'path': 'Kindergarten|Unit 7|Investigation 3',
//                 'assessments': [
//                   10,
//                   125,
//                   38,
//                   41
//                 ]
//               },
//               {
//                 'title': 'Counting Groups of Ones and Twos',
//                 'shortname': 'Session 3.5',
//                 'sequence': 115,
//                 'id': '115',
//                 'parent': '1|7|18',
//                 'path': 'Kindergarten|Unit 7|Investigation 3',
//                 'assessments': [
//                   54,
//                   125
//                 ]
//               },
//               {
//                 'title': 'Enough Chairs for the Class?',
//                 'shortname': 'Session 3.6',
//                 'sequence': 116,
//                 'id': '116',
//                 'parent': '1|7|18',
//                 'path': 'Kindergarten|Unit 7|Investigation 3',
//                 'assessments': [
//                   125
//                 ]
//               },
//               {
//                 'title': 'Counting Fingers',
//                 'shortname': 'Session 3.7',
//                 'sequence': 117,
//                 'id': '117',
//                 'parent': '1|7|18',
//                 'path': 'Kindergarten|Unit 7|Investigation 3',
//                 'assessments': [
//                   10
//                 ]
//               },
//               {
//                 'title': 'Assessment: Solving a Problem Using Attendance Data',
//                 'shortname': 'Session 3.8',
//                 'sequence': 118,
//                 'id': '118',
//                 'parent': '1|7|18',
//                 'path': 'Kindergarten|Unit 7|Investigation 3',
//                 'assessments': [
//                   125,
//                   16
//                 ]
//               }
//             ]
//           }
//         ]
//       },
//       {
//         'title': 'Ten Frames and Teen Numbers',
//         'id': '8',
//         'parent': '1',
//         'shortname': 'Unit 8',
//         'sequence': 8,
//         'practice': {
//           'benchmarks': [
//             1,
//             2
//           ],
//           'mathpractices': [
//             282,
//             283
//           ]
//         },
//         'nodes': [
//           {
//             'title': 'Subtraction and Fluency Within 5',
//             'shortname': 'Investigation 1',
//             'sequence': 18,
//             'parent': '1|8',
//             'id': '19',
//             'nodes': [
//               {
//                 'title': 'Build and Remove',
//                 'shortname': 'Session 1.1',
//                 'sequence': 119,
//                 'id': '119',
//                 'parent': '1|8|19',
//                 'path': 'Kindergarten|Unit 8|Investigation 1',
//                 'assessments': [
//                   123,
//                   102
//                 ]
//               },
//               {
//                 'title': 'Revisiting Subtraction Story Problems',
//                 'shortname': 'Session 1.2',
//                 'sequence': 120,
//                 'id': '120',
//                 'parent': '1|8|19',
//                 'path': 'Kindergarten|Unit 8|Investigation 1',
//                 'assessments': [
//                   10,
//                   123,
//                   818
//                 ]
//               },
//               {
//                 'title': 'Making Up Story Problems',
//                 'shortname': 'Session 1.3',
//                 'sequence': 121,
//                 'id': '121',
//                 'parent': '1|8|19',
//                 'path': 'Kindergarten|Unit 8|Investigation 1',
//                 'assessments': [
//                   10,
//                   123
//                 ]
//               },
//               {
//                 'title': 'Race to the Sun',
//                 'shortname': 'Session 1.4',
//                 'sequence': 122,
//                 'id': '122',
//                 'parent': '1|8|19',
//                 'path': 'Kindergarten|Unit 8|Investigation 1',
//                 'assessments': [
//                   14,
//                   811
//                 ]
//               },
//               {
//                 'title': 'Fill the Treasure Chest',
//                 'shortname': 'Session 1.5',
//                 'sequence': 123,
//                 'id': '123',
//                 'parent': '1|8|19',
//                 'path': 'Kindergarten|Unit 8|Investigation 1',
//                 'assessments': [
//                   10,
//                   14,
//                   89,
//                   88
//                 ]
//               },
//               {
//                 'title': 'Assessment: Fluency within Five',
//                 'shortname': 'Session 1.6',
//                 'sequence': 124,
//                 'id': '124',
//                 'parent': '1|8|19',
//                 'path': 'Kindergarten|Unit 8|Investigation 1',
//                 'assessments': [
//                   10,
//                   14,
//                   87
//                 ]
//               },
//               {
//                 'title': 'Assessment: Fluency within Five (continued)',
//                 'shortname': 'Session 1.7',
//                 'sequence': 125,
//                 'id': '125',
//                 'parent': '1|8|19',
//                 'path': 'Kindergarten|Unit 8|Investigation 1',
//                 'assessments': [
//                   14
//                 ]
//               }
//             ]
//           },
//           {
//             'title': 'Complements of 10 and the Teen Numbers',
//             'shortname': 'Investigation 2',
//             'sequence': 19,
//             'parent': '1|8',
//             'id': '20',
//             'nodes': [
//               {
//                 'title': 'Toss 10 Chips',
//                 'shortname': 'Session 2.1',
//                 'sequence': 126,
//                 'id': '126',
//                 'parent': '1|8|20',
//                 'path': 'Kindergarten|Unit 8|Investigation 2',
//                 'assessments': [
//                   119
//                 ]
//               },
//               {
//                 'title': 'How Many to 10?',
//                 'shortname': 'Session 2.2',
//                 'sequence': 127,
//                 'id': '127',
//                 'parent': '1|8|20',
//                 'path': 'Kindergarten|Unit 8|Investigation 2',
//                 'assessments': [
//                   10,
//                   82,
//                   6,
//                   15
//                 ]
//               },
//               {
//                 'title': 'Counting Larger Quantities',
//                 'shortname': 'Session 2.3',
//                 'sequence': 128,
//                 'id': '128',
//                 'parent': '1|8|20',
//                 'path': 'Kindergarten|Unit 8|Investigation 2',
//                 'assessments': [
//                   10,
//                   56,
//                   6
//                 ]
//               },
//               {
//                 'title': 'Race to the Top: Teen Numbers',
//                 'shortname': 'Session 2.4',
//                 'sequence': 129,
//                 'id': '129',
//                 'parent': '1|8|20',
//                 'path': 'Kindergarten|Unit 8|Investigation 2',
//                 'assessments': [
//                   10,
//                   128,
//                   83,
//                   10,
//                   6
//                 ]
//               },
//               {
//                 'title': 'Build It: Teen Numbers',
//                 'shortname': 'Session 2.5',
//                 'sequence': 130,
//                 'id': '130',
//                 'parent': '1|8|20',
//                 'path': 'Kindergarten|Unit 8|Investigation 2',
//                 'assessments': [
//                   128,
//                   124,
//                   794
//                 ]
//               },
//               {
//                 'title': 'Race to the Top: Ten Frames',
//                 'shortname': 'Session 2.6',
//                 'sequence': 131,
//                 'id': '131',
//                 'parent': '1|8|20',
//                 'path': 'Kindergarten|Unit 8|Investigation 2',
//                 'assessments': [
//                   124,
//                   128,
//                   786,
//                   10
//                 ]
//               },
//               {
//                 'title': 'Quick Images: Teen Numbers',
//                 'shortname': 'Session 2.7',
//                 'sequence': 132,
//                 'id': '132',
//                 'parent': '1|8|20',
//                 'path': 'Kindergarten|Unit 8|Investigation 2',
//                 'assessments': [
//                   42,
//                   128,
//                   124
//                 ]
//               },
//               {
//                 'title': 'Build It, Then Race to the Top',
//                 'shortname': 'Session 2.8',
//                 'sequence': 133,
//                 'id': '133',
//                 'parent': '1|8|20',
//                 'path': 'Kindergarten|Unit 8|Investigation 2',
//                 'assessments': [
//                   10,
//                   128,
//                   124,
//                   33
//                 ]
//               },
//               {
//                 'title': 'Race to the Top: Teen Numbers 2',
//                 'shortname': 'Session 2.9',
//                 'sequence': 134,
//                 'id': '134',
//                 'parent': '1|8|20',
//                 'path': 'Kindergarten|Unit 8|Investigation 2',
//                 'assessments': [
//                   124,
//                   128,
//                   32
//                 ]
//               },
//               {
//                 'title': 'The Teen Numbers',
//                 'shortname': 'Session 2.10',
//                 'sequence': 135,
//                 'id': '135',
//                 'parent': '1|8|20',
//                 'path': 'Kindergarten|Unit 8|Investigation 2',
//                 'assessments': [
//                   10,
//                   128,
//                   124
//                 ]
//               }
//             ]
//           },
//           {
//             'title': 'Measuring and Comparing Weight',
//             'shortname': 'Investigation 3',
//             'sequence': 20,
//             'parent': '1|8',
//             'id': '21',
//             'nodes': [
//               {
//                 'title': 'Weight: Heavier or Lighter?',
//                 'shortname': 'Session 3.1',
//                 'sequence': 136,
//                 'id': '136',
//                 'parent': '1|8|21',
//                 'path': 'Kindergarten|Unit 8|Investigation 3',
//                 'assessments': [
//                   31,
//                   797,
//                   128,
//                   124
//                 ]
//               },
//               {
//                 'title': 'Measuring and Comparing Weights with Cubes',
//                 'shortname': 'Session 3.2',
//                 'sequence': 137,
//                 'id': '137',
//                 'parent': '1|8|21',
//                 'path': 'Kindergarten|Unit 8|Investigation 3',
//                 'assessments': [
//                   122,
//                   128,
//                   124
//                 ]
//               },
//               {
//                 'title': 'Measuring and Comparing Weights with Pennies',
//                 'shortname': 'Session 3.3',
//                 'sequence': 138,
//                 'id': '138',
//                 'parent': '1|8|21',
//                 'path': 'Kindergarten|Unit 8|Investigation 3',
//                 'assessments': [
//                   10,
//                   118,
//                   128,
//                   124
//                 ]
//               },
//               {
//                 'title': 'Assessment, Weighing, and Teen Numbers',
//                 'shortname': 'Session 3.4',
//                 'sequence': 139,
//                 'id': '139',
//                 'parent': '1|8|21',
//                 'path': 'Kindergarten|Unit 8|Investigation 3',
//                 'assessments': [
//                   10,
//                   123,
//                   10,
//                   14,
//                   6,
//                   128,
//                   124
//                 ]
//               },
//               {
//                 'title': 'Assessment (cont.) & Using a Pan Balance to Discuss the Counting Jar',
//                 'shortname': 'Session 3.5',
//                 'sequence': 140,
//                 'id': '140',
//                 'parent': '1|8|21',
//                 'path': 'Kindergarten|Unit 8|Investigation 3',
//                 'assessments': [
//                   123,
//                   10,
//                   14,
//                   6,
//                   128,
//                   124
//                 ]
//               }
//             ]
//           }
//         ]
//       }
//     ],
//     'productId': '1730939'
//   }
// ];

// const navigationDataFilter = [{
//   id: '1',
//   isbn: ['9780328946143', '9780328938490'],
//   nodes: [{
//     id: '1',
//     nodes: [{}],
//     parent: '1',
//     practice: { benchmarks: [1, 2], mathpractices: [282, 283] },
//     sequence: 1,
//     shortname: 'Unit 1',
//     title: 'Counting People, Sorting Buttons'
//   }],
//   productId: '1730939',
//   sequence: 1,
//   shortname: 'Kindergarten',
//   title: 'Kindergarten'
// }];

// const navigationDataAssessment = [{
//   criteria: [{
//     benchmarks: [1],
//     id: 487,
//     mathpractices: [282],
//     sequence: 1,
//     title: '~How do students'
//   }],
//   id: '1',
//   templatekind: '1',
//   title: 'As you observe students recording their work, consider:',
//   type: 'ongoing'
// }];

// const navigationDataAssessmentItem = [{
//   benchmarks: [{
//     description: 'Count and count out a set of up to 10 objects',
//     id: '1',
//     title: 'Benchmark 1'
//   }],
//   mathpractices: [{
//     description: 'Make sense of problems and persevere in solving them',
//     id: '0',
//     title: 'MP1'
//   }]
// }];

// const userData = {
//   cookies: {
//     CASTGC: 'TGT-3104-w4eUxjPFFMGepFOSbmGI1dHmksD7G3HrCUqn4TWZSbaXRmhUvz-b3-rumba-int-01-03',
//     Path: '/',
//     path: '/'
//   },
//   firstName: 'realize1',
//   identityId: 'ffffffff51c87040e4b07dddca2a0511',
//   idpName: 'RUMBA',
//   idpResponse: { data: {} },
//   lastName: 'teacher11',
//   locale: 'en_US',
//   loggedInSince: 1543900272218,
//   modules: [],
//   name: 'realize_teacher',
//   permissions: [{
//     CGProgram: 'Realize',
//     DenyNewSubscription: '0',
//     EndDate: '2021-08-15T23:59:59.000-04:00',
//     GradeLevel: 'N/A',
//     LicensePoolId: '8a97b1a738c9f0d90139316b11f3180e',
//     LicensePoolStatus: 'A',
//     LicensePoolType: 'Student seat based licensing',
//     LicensedOrganizationDisplayName: 'realize_organization1',
//     LicensedOrganizationId: '8a97b1a638c9f02701393168afbf1d20',
//     OrderedISBN: '3332224445556',
//     OrganizationId: '8a97b1a638c9f02701393168afbf1d20',
//     ProductDisplayName: 'Realize Sample Program',
//     ProductId: '336566',
//     ProductLongDescription: 'Realize Sample Program',
//     ProductShortDescription: 'Realize Sample Program',
//     Quantity: '250',
//     StartDate: '2012-08-16T00:00:00.000-04:00',
//     UsedLicenses: '18968'
//   }],
//   refreshToken: null,
//   timeZone: 'America/New_York',
//   title: 'Colonel.',
//   token: 'ST-3340-Fc9OStj1tdpfk9HPSl0S-b3-rumba-int-01-03',
//   userName: 'realize_teacher'
// };

// const productISBN = [{
//   CGProgram: 'Realize',
//   OrderedISBN: '3332224445556',
//   OrganizationId: '8a97b1a638c9f02701393168afbf1d20',
//   ProductDisplayName: 'Realize Sample Program',
//   ProductId: '336566',
//   ProductLongDescription: 'Realize Sample Program',
//   ProductShortDescription: 'Realize Sample Program',
//   StartDate: '2012-08-16T00:00:00.000-04:00',
//   UsedLicenses: '18935'
// }, {
//   CGProgram: 'Realize',
//   DenyNewSubscription: '0',
//   OrganizationId: '8a97b1a638c9f02701393168afbf1d20',
//   ProductDisplayName: 'Realize Testing Sample version 1',
//   ProductId: '339781',
//   ProductLongDescription: 'realize Testing Sample Long Description',
//   ProductShortDescription: 'realize Testing Sample SD',
//   StartDate: '2012-06-12T00:00:00.000-04:00',
//   UsedLicenses: '1562'
// }];

// const nodesMockData = [{
//   assessment: {
//     templatekind: '1',
//     title: 'Students explore connecting cubes and their attributes.',
//     id: '69',
//     type: 'ongoing',
//     criteria: [{
//       benchmarks: [1],
//       id: 265,
//       mathpractices: [282],
//       sequence: 2,
//       title: '~How do students'
//     }]
//   },
//   assessmentItem: {
//     templatekind: '1',
//     title: 'Students explore connecting cubes and their attributes.',
//     id: '69',
//     type: 'ongoing',
//     criteria: [{
//       benchmarks: [1],
//       id: 265,
//       mathpractices: [282],
//       sequence: 2,
//       title: '~How do students'
//     }]
//   },
//   parent: '1|1|2|1',
//   parentid: '1',
//   path: 'Kindergarten > Unit 1 > Investigation 1 > Session 1.1',
//   sequence: 1,
//   shortname: 'Session 1.1',
//   title: 'Students explore connecting cubes and their attributes.',
//   type: 'ongoing'
// }];

// const mediaObject = {
//   assessmentid: '312',
//   assessmentitemdetails: {
//     id: 1110,
//     title: '~Are students able to fill the outlines without sp…n the outlines, no matter how they are arranged?~',
//     sequence: 2,
//     benchmarks: [1],
//     mathpractices: [282]
//   },
//   assessmentitemid: 1110,
//   comment: '',
//   createdat: new Date(),
//   ctype: 'media',
//   deleted: false,
//   isobserved: true,
//   mediaid: '05442041',
//   parent: '3|17|63|610',
//   students: ['ffffffff5bb290def856993930d369a2'],
//   type: 'ongoing',
//   updatedat: new Date()
// };

// const deletedItem = {
//   caption: 'untitled',
//   createdat: new Date(),
//   id: '05442041',
//   mapped: false,
//   mediaDescription: '',
//   mediadocid: 'fTDDaZLxW6hVEeDUM7qO',
//   mediaid: '05442041',
//   mediakind: 'image',
//   // tslint:disable-next-line:max-line-length
//   path: 'https://firebasestorage.googleapis.com/v0/b/realize-870.appspot.com/o/
// uploads%2Fimg1.jpg?alt=media&token=f99cc38f-7707-4c97-88a6-fd9e4d024cd3',
//   product: '1730940',
//   students: ['ffffffff5bd30cc7d407951ac8bce01c', 'ffffffff5bb290def856993930d369a2'],
//   teacherId: 'ffffffff51c87040e4b07dddca2a0511',
//   types: 'media',
//   updatedat: new Date()
// };

// describe('AssessmentService', () => {
//   const formBuilder: FormBuilder = new FormBuilder();
//   let assessmentService: AssessmentService, notesService: NotesService,
//     userService: UserService, modalService: ModalService,
//     indexedDbService: IndexedDbService, headerService: HeaderService,
//     mediaPopUpService: MediaPopupService, telemetryService: TelemetryService,
//     accordionService: AccordionService,
//     globalService: GlobalService;
//   let route: ActivatedRoute;
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [NgbModule.forRoot(),
//       AngularFireModule.initializeApp(environment.firebase), FormsModule
//       ],
//       providers: [
//         { provide: Router, useValue: mockRouter },
//         { provide: ActivatedRoute, useValue: fakeActivatedRoute },
//         CustomErrorHandlerService, AlertService, AssessmentService,
//         FirebaseDbService, AngularFirestore, UserService, HttpHandler,
//         IndexedDbService, NotesService, MediaService, UploadFileService, AngularFireDatabase,
//         AccordionService, ModalService, HeaderService, MediaPopupService, TelemetryService, HttpClientModule, HttpClient
//       ],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA]
//     })
//       .compileComponents();
//   }));

//   beforeEach(() => {
//     userService = TestBed.get(UserService);
//     globalService = TestBed.get(GlobalService);
//     assessmentService = TestBed.get(AssessmentService);
//     indexedDbService = TestBed.get(IndexedDbService);
//     notesService = TestBed.get(NotesService);
//     headerService = TestBed.get(HeaderService);
//     mediaPopUpService = TestBed.get(MediaPopupService);
//     modalService = TestBed.get(ModalService);
//     telemetryService = TestBed.get(TelemetryService);
//     accordionService = TestBed.get(AccordionService);
//     userService.setUser({ identityId: 'ffffffff51c87040e4b07dddca2a0511', permissions: productISBN });
//     assessmentService.setCurrentAssessment({
//       assessment: {
//         id: 123,
//         criteria: [{
//           id: 1110,
//           sequence: 2,
//           title: '~Are students able to'
//         }]
//       },
//       parent: '3|17|63|610',
//       path: 'Grade2>Unit1 >investigation1',
//       type: 'ongoing'

//     });
//   //   globalService._navData.navigation = AssessmentNavigationData.NavigationData;
//   //  globalService._navData.assessment = nodesMockData;
//   //   globalService._navData.assessmentitem = AssessmentNavigationData.AssessmentItem;
//     route = TestBed.get(ActivatedRoute);
//   });
//   it('should get getCurrentAssessment method', () => {
//     assessmentService.getCurrentAssessment();
//     expect(assessmentService.getCurrentAssessment).toBeTruthy();
//   });

//   // it('should set setProductIdByAssessmentParent method', () => {
//   //   assessmentService.setProductIdByAssessmentParent();
//   //   assessmentService._navData.navigation = navigationDataFilter;
//   //   const product = {
//   //     name: '1',
//   //     productID: '1'
//   //   };
//   //   assessmentService.setCurrentAssesmentProduct(product);
//   //   expect(assessmentService.setProductIdByAssessmentParent).toBeTruthy();
//   // });
//   // it('should get getAllAssessmentItem method', () => {
//   //   assessmentService._navData.assessment = navigationDataAssessment;
//   //  // assessmentService.getAllAssessmentItem();
//   // //  expect(assessmentService.getAllAssessmentItem).toBeTruthy();
//   // });

//   // it('should get getAssessmentItemByIds method', () => {
//   //   assessmentService._navData.assessmentitem = AssessmentNavigationData.AssessmentItem;
//   //   assessmentService.getAssessmentItemByIds('mathpractices', [1730939]);
//   //   expect(assessmentService.getAssessmentItemByIds).toBeTruthy();
//   // });

//   // it('should get getAssessmentItemByIds method', () => {
//   //   assessmentService._navData.assessmentitem = AssessmentNavigationData.AssessmentItem;
//   //   assessmentService.getAssessmentItemByIds('benchmarks', [1730939]);
//   //   expect(assessmentService.getAssessmentItemByIds).toBeTruthy();
//   // });
//   // it('should get getAssessmentItem method', () => {
//   //   assessmentService._navData.assessment = navigationDataAssessment;
//   //   assessmentService.getAssessmentItem(312);
//   //   expect(assessmentService.getAssessmentItem).toBeTruthy();
//   // });

//   it('should set setCurrentAssesmentProduct method', () => {
//     const product = {
//       name: '1',
//       productID: '1'
//     };
//     assessmentService.setCurrentAssesmentProduct(product);
//     expect(assessmentService.setCurrentAssesmentProduct).toBeTruthy();
//   });

//   it('should get getCurrentAssesmentProduct method', () => {
//     assessmentService.getCurrentAssesmentProduct();
//     expect(assessmentService.getCurrentAssesmentProduct).toBeTruthy();
//   });
//   // -> Commented because of real db hit //

//   // it('should get setNavigation method', () => {
//   //   const navigationDataType = [{
//   //     navigation: navigationDataFilter
//   // }];
//   //   assessmentService._navData.navigation = navigationDataFilter;
//   //   assessmentService.setNavigation('navigation', navigationDataType);
//   //   expect(assessmentService.setNavigation).toBeTruthy();
//   // });
// });
