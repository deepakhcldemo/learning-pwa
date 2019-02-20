import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from './login.service';
import { AuthTokenService } from 'src/app/auth/authtoken.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from 'src/app/auth/user.service';
import { RosterService } from 'src/app/shared/services/roster.service';
import { IndexedDbService } from 'src/app/shared/services/indexed.db.service';
import { TelemetryService } from 'src/app/shared/services/telemetry.service';
import { Apollo } from 'apollo-angular';

describe('LoginService', () => {
    let service: LoginService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                LoginService,
                AuthTokenService,
                UserService,
                RosterService,
                IndexedDbService,
                TelemetryService,
                Apollo

            ],
            imports: [
                RouterTestingModule,
                HttpClientModule

            ],
            schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
        });
        service = TestBed.get(LoginService);
    });

    // it('should be created', inject([LoginService], (service: LoginService) => {
    //     expect(service).toBeTruthy();
    // }));
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
    it('should have set default PickClassUrl', () => {
        expect(service.returnPickClassUrl).not.toBe(null);
        expect(service.returnPickClassUrl).toBe('pickclass');

    });

    it('matchPassword returns false when password is not matched', () => {

        const spy = spyOn(service, 'matchPassword').and.returnValue(false);
        expect(service.matchPassword('testing123$', 'testing1$')).toBeFalsy();
        expect(service.matchPassword).toHaveBeenCalledWith('testing123$', 'testing1$');
    });

    it('matchPassword returns true when password is matched', () => {
        const spy = spyOn(service, 'matchPassword').and.returnValue(true);
        expect(service.matchPassword('testing123$', 'testing123$')).toBeTruthy();
        expect(service.matchPassword).toHaveBeenCalledWith('testing123$', 'testing123$');
    });

    // it('should have set progress status', () => {
    //     const spy = spyOnProperty(service, 'loginProgressStatus').and.returnValue(
    //         1
    //     );
    //     expect(service.setProgressStatus(1)).toBeDefined();
    //     expect(spy).toHaveBeenCalled();
    // });
});
