// import { TestBed, inject } from '@angular/core/testing';
// import { IndexDBResolverService } from './indexDb.resolver.service';
// import { of } from 'rxjs';
// import { IndexedDbService } from './indexed.db.service';

// describe('IndexDBResolverService', () => {

//     let indexDBService: IndexDBResolverService;
//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [],
//             providers: [IndexDBResolverService,
//                 IndexedDbService]
//         });

//         indexDBService = TestBed.get(IndexDBResolverService);
//     });


//     it('should call resolve method', () => {

//         const loginResponse = {
//             cookies: {},
//             firstName: 'realize1',
//             identityId: 'ffffffff51c87040e4b07dddca2a0511',
//             idpName: 'RUMBA',
//             idpResponse: { data: {} },
//             lastName: 'teacher11',
//             locale: 'en_US',
//             loggedInSince: 1544781002969,
//             loginStatus: true,
//             modules: [],
//             name: 'realize_teacher',
//             password: 'U2FsdGVkX1+RyC3YZKHeAyf/G+QdRCiaZHmDLQB7cYg=',
//             permissions: [],
//             refreshToken: null,
//             timeZone: 'America/New_York',
//             title: 'Colonel.',
//             token: 'ST-89274-uJs9Ct0WQTonWG9JDP2K-b3-rumba-int-01-01',
//             userName: 'realize_teacher'
//         };
//         const obj = { user: '', token: '', login: {} };
//         obj.login = loginResponse;
//         const spy = spyOn(indexDBService, 'resolve').and.returnValue(of(obj)

//         );
//         indexDBService.resolve();
//         expect(spy).toHaveBeenCalled();
//     });

//     it('should call obj login as empty method', () => {

//         const obj = { user: '', token: '', login: {} };
//         obj.login = '';
//         const spyCase = spyOn(indexDBService, 'resolve').and.returnValue(of(obj)

//         );
//         indexDBService.resolve();
//         expect(obj.login).toBe('');
//         expect(spyCase).toHaveBeenCalled();
//     });

// });
