// import { TestBed, inject } from '@angular/core/testing';
// import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { CustomErrorHandlerService } from './custom.errorhandler.service';
// import { AlertService } from '../components/alert/alert.service';
// import { HttpErrorResponse } from '@angular/common/http';

// describe('CustomErrorHandlerService', () => {
//     let service: CustomErrorHandlerService;

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [],
//             providers: [CustomErrorHandlerService,
//                 AlertService

//             ],
//             schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
//         });
//     });
//     beforeEach(() => {
//         service = TestBed.get(CustomErrorHandlerService);
//     });

//     it('should be created', () => {
//         expect(service).toBeTruthy();
//     });
//     it('should have called handleError method created when console error occure', () => {
//         const error = {
//             message: 'error message',
//             status: 400
//         };
//         expect(service).toBeTruthy();
//         service.handleError(error);
//     });
//     it('should have called handleError method when http error occure', () => {
//         const error = new HttpErrorResponse({});
//         service.handleError(error);
//         expect(error instanceof HttpErrorResponse).toBeTruthy();
//     });
// });
