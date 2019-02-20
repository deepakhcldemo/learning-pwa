// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { NgbdAlertSelfclosingComponent } from './alert.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { AlertService } from './alert.service';


// describe('NgbdAlertSelfclosingComponent', () => {
//     let component: NgbdAlertSelfclosingComponent;
//     let fixture: ComponentFixture<NgbdAlertSelfclosingComponent>;
//     let alertService: AlertService;
//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             declarations: [NgbdAlertSelfclosingComponent],
//             providers: [AlertService],
//             imports: [NgbModule]
//         })
//             .compileComponents();
//     }));

//     beforeEach(() => {
//         fixture = TestBed.createComponent(NgbdAlertSelfclosingComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//     });

//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });
//     it('should have called CloseAlert method', () => {
//         alertService = TestBed.get(AlertService);
//         component.CloseAlert();
//         fixture.detectChanges();
//         expect(alertService.alertOptions.message).toBe(null);
//     });
// });
