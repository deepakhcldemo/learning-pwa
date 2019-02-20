// import { TestBed, inject } from '@angular/core/testing';
// import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { HttpErrorResponse } from '@angular/common/http';
// import { AlertService } from './alert.service';
// import { errorConfig } from './alert.config';

// describe('AlertService', () => {
//     let service: AlertService;

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [],
//             providers: [AlertService,
//             ],
//             schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
//         });
//     });
//     beforeEach(() => {
//         service = TestBed.get(AlertService);
//     });

//     it('should be created', () => {
//         expect(service).toBeTruthy();
//     });
//     it('should have set alertOption', () => {
//         service.alertOptions = { status: 'success', message: null, code: '' };
//     });
//     it('should have called setConfig method', () => {
//         service.alertOptions = { status: 'success', message: null, code: '' };
//         service.setConfig();
//     });
//     it('should have called show method with empty obj', () => {
//         const obj = {code: 400};
//         service.show(obj);
//         expect(service.alertOptions).not.toBe(null);
//     });
//     it('should have called show method with status code 501', () => {
//         const obj = { code: 501 };
//         service.show(obj);
//         expect(service.alertOptions).not.toBe(null);
//     });
//     it('should have called show method with status code 400', () => {
//         const obj = { code: 400 };
//         service.show(obj);
//         expect(service.alertOptions).not.toBe(null);
//     });
//     it('should have called show method with message', () => {
//         const obj = { message: '' };
//         service.show(obj);
//         expect(service.alertOptions).not.toBe(null);
//     });


//     it('should have called hide method', () => {
//         service.alertOptions = { status: 'success', message: null, code: '' };
//         service.hide();
//         expect(service.alertOptions.message).toBe(null);
//     });
// });
