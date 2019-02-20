// import { TestBed } from '@angular/core/testing';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { HttpClientModule } from '@angular/common/http';
// import { IndexedDbService } from './indexed.db.service';
// import {FileConstants} from 'src/app/shared/constants/file-constants';

// const roasterData = [{
//     classId: '77DB2F4FC20514ABE0532502140A62E8',
//     className: 'To Import - Updated Title',
//     createdBy: 'ffffffff51c87040e4b07dddca2a0511',
//     createdDate: '2018-10-10T02:44:23.000Z',
//     firstTeacherId: 'ffffffff51c87040e4b07dddca2a0511',
//     lastUpdatedBy: 'ffffffff51c87040e4b07dddca2a0511',
//     lastUpdatedDate: '2018-10-23T23:45:28.000Z',
//     organizationId: '8a97b1a638c9f02701393168afbf1d20',
//     productIds: ['1881814', '1886393'],
//     status: 'INACTIVE',
//     studentIds: ['ffffffff5bb948b6d40795315bd40ca9',
//         'ffffffff5bb6abb7f63bbf06200fd947'],
//     teacherIds: ['ffffffff51c87040e4b07dddca2a0511']
// }];
// describe('IndexedDbService', () => {
//     let indexedDbService: IndexedDbService;
//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [
//                 NgbModule.forRoot(),
//                 HttpClientModule,
//             ],
//             providers: [IndexedDbService
//             ],
//             schemas: [CUSTOM_ELEMENTS_SCHEMA]
//         });
//     });

//     beforeEach(() => {
//         indexedDbService = TestBed.get(IndexedDbService);
//     });

//     it('should have called set db method', () => {
//         const setDbSpy = spyOn(indexedDbService, 'setName').and.returnValue({
//             success: true
//         });

//         indexedDbService.setName('PWA_DB');
//         expect(setDbSpy).toHaveBeenCalled();
//     });

//     it('should have called init db method', () => {
//         const initDbSpy = spyOn(indexedDbService, 'initDB').and.returnValue({
//             success: true
//         });

//         indexedDbService.initDB();
//         expect(initDbSpy).toHaveBeenCalled();
//     });

//     it('should have called initialize db schema method', () => {
//         const dbList = indexedDbService.dbSchema();
//         expect(dbList.length).toEqual(3);
//     });

//     it('should have called initialize persistent db schema method', () => {
//         const persistentDb = indexedDbService.persistentDBSchema();
//         expect(persistentDb.length).toEqual(2);
//     });

//     it('should have called insert values in indexed db method', () => {
//         const putSpy = spyOn(indexedDbService, 'put').and.returnValue({
//             success: true
//         });
//         indexedDbService.put('User', { firstname: 'abc' });
//         expect(putSpy).toHaveBeenCalled();
//     });

//     it('should have called update values in indexed db method', () => {
//         const updateDataSpy = spyOn(indexedDbService, 'putUpdate').and.returnValue({
//             success: true
//         });
//         indexedDbService.putUpdate('search', 1545115956130, 'test');
//         expect(updateDataSpy).toHaveBeenCalled();
//     });

//     it('should have post data in indexed db', () => {
//         const updateIndexedDbSpy = spyOn(indexedDbService, 'post').and.returnValue({
//             success: true
//         });
//         indexedDbService.post('User', { firstname: 'abc' });
//         expect(updateIndexedDbSpy).toHaveBeenCalled();
//     });

//     it('should have get data from indexed db with wrong collection', () => {
//         const getIndexedDataSpy = spyOn(indexedDbService, 'get').and.returnValue({
//             message: 'Collection not found'
//         });
//         indexedDbService.get('Product1', 1730939, (result) => {
//             return result;
//         });
//         expect(getIndexedDataSpy).toHaveBeenCalled();
//     });

//     it('should have get data from indexed db with wrong collection name and value', () => {
//         const getIndexedDataSpy = spyOn(indexedDbService, 'get').and.returnValue({
//             message: 'collection not found'
//         });
//         indexedDbService.get('Product1', 17309390, (result) => {
//             return result;
//         });
//         expect(getIndexedDataSpy).toHaveBeenCalled();
//     });

//     it('should have get data from indexed db with correct collection and wrong value', () => {
//         const getIndexedDataSpy = spyOn(indexedDbService, 'get').and.returnValue({
//             message: 'No result found'
//         });
//         indexedDbService.get('Product', 17309390, (result) => {
//             return result;
//         });
//         expect(getIndexedDataSpy).toHaveBeenCalled();
//     });

//     it('should have get data from indexed db with correct collection name and value', () => {
//         const getIndexedDataSpy = spyOn(indexedDbService, 'get').and.returnValue({
//             success: true
//         });
//         indexedDbService.get('Product', 1730939, (result) => {
//             return result;
//         });
//         expect(getIndexedDataSpy).toHaveBeenCalled();
//     });

//     it('should have get details from Indexed DB', () => {
//         const getDataSpy = spyOn(indexedDbService, 'getAll').and.returnValue({
//             success: true
//         });
//         indexedDbService.getAll('Search', (search) => {
//         });
//         expect(getDataSpy).toHaveBeenCalled();
//     });

//     it('should have get all details from Indexed DB', () => {
//         const searchResult = indexedDbService.all('Search', (product) => {
//         });
//         expect(searchResult).toBeDefined();
//     });

//     it('should have remove item from indexed DB', () => {
//         const removeIndexedDBSpy = spyOn(indexedDbService, 'remove').and.returnValue({
//             success: true,
//             message: 'deleted'
//         });
//         indexedDbService.remove(FileConstants.constants.search, 1);
//         expect(removeIndexedDBSpy).toHaveBeenCalled();
//     });

//     it('should have remove collection from indexed DB', () => {
//         const removeStoreSpy = spyOn(indexedDbService, 'removeStore').and.returnValue({
//             success: true,
//             message: 'collection deleted'
//         });
//         indexedDbService.removeStore(FileConstants.constants.search);
//         expect(removeStoreSpy).toHaveBeenCalled();
//     });

//     it('should have called count method for colelction record', () => {
//         const countSpy = spyOn(indexedDbService, 'count').and.returnValue({
//             success: true,
//             count: 10
//         });
//         const result = indexedDbService.count(FileConstants.constants.search);
//         expect(countSpy).toHaveBeenCalled();
//         expect(result['count']).toEqual(10);
//     });
//     it('should have called create method for colelction record', () => {
//         const createSpy = spyOn(indexedDbService, 'create').and.returnValue({
//             success: true
//         });
//         indexedDbService.create();
//         expect(createSpy).toHaveBeenCalled();
//     });
//     it('should have called create DB method', () => {
//         const clearSpy = spyOn(indexedDbService, 'clear').and.returnValue({
//             success: true
//         });
//         indexedDbService.clear();
//         expect(clearSpy).toHaveBeenCalled();
//     });

//     it('should have called clear store method', () => {
//         const clearStoreSpy = spyOn(indexedDbService, 'clearStores').and.returnValue({
//             success: true
//         });
//         indexedDbService.clearStores();
//         expect(clearStoreSpy).toHaveBeenCalled();
//     });

//     // it('should have called get Roaster data method', () => {
//     //     const getMappedDataSpy = spyOn(indexedDbService, 'getMappedData').and.returnValue({
//     //         success: true
//     //     });
//     //     indexedDbService.getMappedData(roasterData, (data) => { });
//     //     expect(getMappedDataSpy).toHaveBeenCalled();
//     // });

//     // it('should have called map profile method', () => {
//     //     const getMappedDataSpy = spyOn(indexedDbService, 'mapProfiles').and.returnValue({
//     //         success: true
//     //     });
//     //     indexedDbService.mapProfiles(roasterData);
//     //     expect(getMappedDataSpy).toHaveBeenCalled();
//     // });
// });




