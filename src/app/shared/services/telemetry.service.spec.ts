// import { TestBed } from '@angular/core/testing';
// import { HttpClientModule, HttpClient } from '@angular/common/http';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { TelemetryService } from './telemetry.service';
// import { AngularFirestore } from 'angularfire2/firestore';
// import { environment } from 'src/environments/environment';
// import { AngularFireModule } from 'angularfire2';
// import { IndexedDbService } from './indexed.db.service';
// import { UserService } from 'src/app/auth/user.service';

// const activityData = {
//     verb: {
//         id: '123',
//     },
//     object: {
//         extensions: 'abc',
//         definition: {
//             name: 'test'
//         },
//     }
// };
// describe('TelemetryService', () => {
//     let telemtryService: TelemetryService;
//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [
//                 NgbModule.forRoot(),
//                 AngularFireModule.initializeApp(environment.firebase),
//                 HttpClientModule
//             ],
//             providers: [
//                 HttpClient,
//                 TelemetryService,
//                 UserService,
//                 AngularFirestore,
//                 IndexedDbService
//             ],
//             schemas: [CUSTOM_ELEMENTS_SCHEMA]
//         });
//         telemtryService = TestBed.get(TelemetryService);
//     });


//     it('should be telemetry service instance', () => {
//         expect(telemtryService).toBeTruthy();
//     });

//     it('should have called init telemetry Service', () => {
//         telemtryService.initializeTelemetryService();
//         expect(telemtryService.telemetry).toBeDefined();
//     });

//     it('should have called send telemetry event', () => {
//         const eventDataSpy = spyOn(telemtryService, 'sendTelemetryEvent').and.returnValue({ success: true });
//         telemtryService.sendTelemetryEvent(activityData);
//         expect(eventDataSpy).toHaveBeenCalled();
//     });

//     // it('should have get telemetry event', () => {
//     //     const baseTelemetryEventSpy = spyOn(telemtryService, 'getBaseTelemetryEvent').and.returnValue({
//     //         context: {
//     //             platform: FileConstants.constants.applicationPlatform
//     //         }
//     //     });
//     //     const baseTelemetryObj = telemtryService.getBaseTelemetryEvent();
//     //     expect(baseTelemetryObj['context'].platform).toEqual(FileConstants.constants.applicationPlatform);
//     //     expect(baseTelemetryEventSpy).toHaveBeenCalled();
//     // });

//     it('should have call send exception event fucntion', () => {
//         const exceptionSpy = spyOn(telemtryService, 'sendTelemetryExceptionEvent').and.returnValue({
//             message: 'exception send'
//         });
//         telemtryService.sendTelemetryExceptionEvent('Http Error', 'resource not reachable');
//         expect(exceptionSpy).toHaveBeenCalled();
//     });
// });
