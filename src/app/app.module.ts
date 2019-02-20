import { FileConstants } from 'src/app/shared/constants/file-constants';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './/app-routing.module';
import { TimingInterceptor } from './shared/timing.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';

import { TelemetryService } from './shared/services/telemetry.service';
import { LoginComponent } from './pages/login/login.component';
import { PagesModule } from './pages/pages.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthTokenService } from '../app/auth/authtoken.service';
import { RosterService } from './shared/services/roster.service';
import { IndexedDbService } from './shared/services/indexed.db.service';
import { FirebaseDbService } from './shared/services/firebase.db.service';
import { CustomErrorHandlerService } from './shared/services/custom.errorhandler.service';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { AccordionService } from './shared/services/accordion.service';

import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbdAlertSelfclosingComponent } from './shared/components/alert/alert.component';
import { AlertService } from './shared/components/alert/alert.service';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from './shared/components/global-modal/modal.service';
import { UploadFileService } from './shared/services/upload-file.service';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ObservationDalService } from './shared/services/realtime-datalayer/observation-dal.service';
import { MainPageFocusStatusService } from './shared/mainpage-focus-status.service';

// Apollo GraphQl Modules & Component
import { GraphQLModule } from './graphql/graphql.module';

import { AuthenticationService } from './auth/authentication.service';
import { UserService } from './auth/user.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CommentDalService } from './shared/services/realtime-datalayer/comment-dal.service';
import { ObservationService } from './shared/services/observation.service';
import { SelectClassComponent } from './pages/select-class/select-class.component';
import { SelectClassModule } from './pages/select-class/select-class.module';
import { fakeBackendProvider } from './helper/fake.backend';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NgbdAlertSelfclosingComponent
  ],
  imports: [
    PerfectScrollbarModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    PagesModule,
    SelectClassModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    NgbAlertModule,
    NgCircleProgressModule.forRoot({
      radius: 60,
      outerStrokeWidth: 8,
      innerStrokeWidth: 4,
      outerStrokeColor: FileConstants.constants.progressCircleStyle,
      innerStrokeColor: '#C7E596',
      animationDuration: 300
    }),
    GraphQLModule
  ],
  providers: [IndexedDbService, AuthTokenService, UserService, DeviceDetectorService, ObservationService,
    FirebaseDbService, AuthenticationService, RosterService, CustomErrorHandlerService,
    AlertService, ObservationDalService, CommentDalService, MainPageFocusStatusService,
    { provide: HTTP_INTERCEPTORS, useClass: TimingInterceptor, multi: true },
    TelemetryService, HttpClient, AccordionService, ModalService, UploadFileService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
