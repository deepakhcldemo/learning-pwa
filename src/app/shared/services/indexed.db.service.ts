import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ErrorMessageConstants } from 'src/app/shared/constants/error-message-constants';
import { FileConstants } from 'src/app/shared/constants/file-constants';

@Injectable()
export class IndexedDbService {
    private _indexedDB: any;
    private _dbName: string;
    private _version;
    private _request: any;

    constructor() {
        this._indexedDB = indexedDB;
        this._dbName = FileConstants.constants.appDBName;
        this._version = 1000;
    }
    /**
      * Set Name In IndexedDB When It Exist and Undefined.
      */
    setName(dbName: string): void {
        if (dbName.length > 0 && dbName !== undefined) {
            this._dbName = dbName;
        } else {
        }
    }

    /**
     * Initialize PWA local db
     */
    initDB() {

        this._request = this._indexedDB.open(this._dbName, 1000);
    }

    /**
     * Local Db Schema
     */
    dbSchema() {
        return [
            // { name: 'Token', keyPath: 'userId' },
            { name: 'TeacherClass', keyPath: 'classId' },
            { name: 'Product', keyPath: 'productId' },
            { name: 'Student', keyPath: 'userId' },
            { name: 'Login', keyPath: 'userName' },
            { name: 'Hierarchies', keyPath: 'productProgramId' },
            { name: 'ProductProgram', keyPath: 'productId' },
            { name: 'ProgramAssessmentMapping', keyPath: 'productProgramId' }
        ];
    }
    persistentDBSchema() {
        return [
            { name: 'media', keyPath: 'mediaId' },
            { name: 'Search', keyPath: 'searchString' }
        ];
    }
    assessmentPersistantDBSchema() {
        return [
            { name: 'Assessment', keyPath: 'assessmentPath' }
        ];
    }
    /**
     * To Put In IndexedDB Whenever Required.
     */
    put(source: string, object: any, dbName?: any): Observable<any> {
        const self = this;
        return Observable.create((observer: any) => {
            self.open(dbName).subscribe((db: any) => {

                const tx = db.transaction(source, 'readwrite');
                const store = tx.objectStore(source);
                if (!object.length) {
                    store.put(object);
                } else {
                    object.map((obj) => {
                        store.put(obj);
                    });
                }

                tx.oncomplete = () => {

                    observer.next(object);
                    db.close();
                    observer.complete();
                };
                db.onerror = (e: any) => {
                    db.close();
                    self.handleError(ErrorMessageConstants.errorMessages.indexedDbError + e.target.errorCode);
                };
            });
        });
    }
    /**
     * To Update Timestamp Already Existing Keyword In IndexedDB.
     */
    putUpdate(source: string, time: number, str: string, dbName?: any): Observable<any> {
        const self = this;
        return Observable.create((observer: any) => {
            self.open(dbName).subscribe((db: any) => {
                const tx = db.transaction(source, 'readwrite');
                const store = tx.objectStore(source);
                store.openCursor().onsuccess = (event) => {
                    const cursor = event.target.result;
                    if (cursor) {
                        if (cursor.value.searchString === str) {
                            const updatedData = cursor.value;
                            updatedData.time = time;
                            const request = cursor.update(updatedData);
                            request.onsuccess = (event2) => {
                            };
                        }
                        cursor.continue();
                    }
                };
            });
        });
    }

    /**
     * To Update Whenever Required.
     */
    post(source: string, object: any, dbName?: any): Observable<any> {
        const self = this;

        return Observable.create((observer: any) => {
            self.open(dbName).subscribe((db: any) => {
                const tx = db.transaction(source, 'readwrite');
                const store = tx.objectStore(source);
                const request = store.add(object);

                request.onsuccess = (e: any) => {
                    observer.next(e.target.result);
                    db.close();
                    observer.complete();
                };
                db.onerror = (e: any) => {
                    db.close();
                    self.handleError(ErrorMessageConstants.errorMessages.indexedDbError + e.target.errorCode);
                };
            });
        });
    }
    /**
     * Getting Data.
     */
    get(source: string, id: any, callback: any, dbName?: any) {
        const self = this;
        self.open(dbName).subscribe((db: any) => {
            if (db.objectStoreNames.contains(source)) {
                const tx = db.transaction(source, 'readonly');
                const store = tx.objectStore(source);
                const request = store.get(id);
                request.onsuccess = () => {
                    callback(request.result);
                    db.close();
                };
                db.onerror = (e: any) => {
                    callback(ErrorMessageConstants.errorMessages.indexedDbError + e.target.errorCodee);
                    db.close();
                    self.handleError(ErrorMessageConstants.errorMessages.indexedDbError + e.target.errorCode);
                };
            } else {
                callback(false);
            }
        });
    }
    /**
     * Function Is Used To Get Logged In.
     */
    getLogin(dbName?: any): Observable<any[]> {
        const self = this;
        return Observable.create((observer: any) => {
            self.open(dbName).subscribe((db: any) => {

                if (db.objectStoreNames.contains('Login')) {
                    const tx = db.transaction('Login', 'readonly');
                    const store = tx.objectStore('Login');
                    const request = store.getAll();
                    const results: any[] = [];

                    request.onsuccess = function () {
                        observer.next(request.result);
                        db.close();
                        observer.complete();
                    };
                    db.onerror = (e: any) => {
                        db.close();
                        self.handleError(ErrorMessageConstants.errorMessages.indexedDbError + e.target.errorCode);
                    };
                } else {
                    observer.next(false);
                }
            });
        });
    }
    /**
     * Getting All Data In IndexedDB.
     */
    getAll(source: string, callback: any, dbName?: any) {
        const self = this;
        self.open(dbName).subscribe((db: any) => {
            if (db.objectStoreNames.contains(source)) {
                const tx = db.transaction([source], 'readonly');
                const store = tx.objectStore(source);
                const request = store.getAll();

                request.onsuccess = () => {
                    callback(request.result);
                    db.close();

                };
                db.onerror = (e: any) => {
                    callback(ErrorMessageConstants.errorMessages.indexedDbError + e.target.errorCodee);
                    db.close();
                    self.handleError(ErrorMessageConstants.errorMessages.indexedDbError + e.target.errorCode);
                };
            } else {
                callback([]);
            }
        });
    }
    all(source: string, filter?: any, dbName?: any): Observable<any[]> {
        const self = this;

        return Observable.create((observer: any) => {
            const indexName = FileConstants.constants.ididx;

            self.open(dbName).subscribe((db: any) => {
                const tx = db.transaction(source, 'readonly'), store = tx.objectStore(source), index = store.index(indexName);
                const request = index.openCursor();
                const results: any[] = [];
                request.onsuccess = function () {
                    const cursor = request.result;
                    if (cursor) {
                        results.push(cursor.value);
                        cursor.continue();
                    } else {
                        observer.next(results);
                        db.close();
                        observer.complete();
                    }
                };
                db.onerror = (e: any) => {
                    db.close();
                    self.handleError(ErrorMessageConstants.errorMessages.indexedDbError + e.target.errorCode);
                };
            });
        });
    }
    /**
     * For Removing The Particular Data In IndexedDB.
     */
    remove(source: string, id: string, dbName?: any): Observable<any> {
        const self = this;

        return Observable.create((observer: any) => {
            self.open(dbName).subscribe((db: any) => {
                const tx = db.transaction(source, 'readwrite');
                const store = tx.objectStore(source);

                store.delete(id);

                tx.oncomplete = (e: any) => {
                    observer.next(id);
                    db.close();
                    observer.complete();
                };
                db.onerror = (e: any) => {
                    db.close();
                    self.handleError(ErrorMessageConstants.errorMessages.indexedDbError + e.target.errorCode);
                };
            });
        });
    }
    /**
     * For Removing The Particular Data In IndexedDB.
     */
    removeStore(source: string, dbName?: any): Observable<any> {
        const self = this;
        return Observable.create((observer: any) => {
            self.open(dbName).subscribe((db: any) => {
                const tx = db.transaction(source, 'readwrite');
                if (!tx) {
                    observer.next();
                    db.close();
                    observer.complete();
                }
                const store = tx.objectStore(source);
                store.clear();
                tx.oncomplete = (e: any) => {
                    observer.next();
                    db.close();
                    observer.complete();
                };
                db.onerror = (e: any) => {
                    db.close();
                    self.handleError(ErrorMessageConstants.errorMessages.indexedDbError + e.target.errorCode);
                };
            });
        });
    }
    /**
     * Function To Count Through Indexing.
     */
    count(source: string, dbName?: any): Observable<number> {
        const self = this;

        return Observable.create((observer: any) => {
            self.open(dbName).subscribe((db: any) => {
                const indexName = FileConstants.constants.ididx, tx = db.transaction(source, 'readonly'), store = tx.objectStore(source);
                const index = store.index(indexName);
                const request = index.count();

                request.onsuccess = () => {
                    observer.next(request.result);
                    db.close();
                    observer.complete();
                };
                db.onerror = (e: any) => {
                    db.close();
                    self.handleError(ErrorMessageConstants.errorMessages.indexedDbError + e.target.errorCode);
                };
            });
        });
    }
    /**
     * Create The Particular Data.
     */
    create(schema?: any[], dbName?: any): Observable<any> {
        const self = this;

        return Observable.create((observer: any) => {
            const request = self._indexedDB.open((dbName) ? dbName : self._dbName);
            request.onupgradeneeded = (event) => {
                const db = request.result;
                for (let i = 0; i < schema.length; i++) {
                    if (!db.objectStoreNames.contains(schema[i].name)) {
                        const store = db.createObjectStore(schema[i].name, { keyPath: schema[i].keyPath, autoIncrement: true });
                    }
                }
                observer.next('done');
                observer.complete();
            };

            request.onerror = () => {
                self.handleError(request.error);
                observer.error(request.error);
            };
            request.onsuccess = () => {
                const db = request.result;
                db.close();
            };
        });
    }
    /**
     * To Clear The Particular Data.
     */
    clear(dbName?: any): Observable<any> {
        const self = this;
        return Observable.create((observer: any) => {
            const request = self._indexedDB.deleteDatabase((dbName) ? dbName : self._dbName);
            request.onsuccess = () => {
                observer.next(ErrorMessageConstants.errorMessages.idbClean);
                observer.complete();
            };
            request.onerror = () => {
                observer.next(ErrorMessageConstants.errorMessages.couldNotDeleteDb);
                self.handleError(ErrorMessageConstants.errorMessages.couldNotDeleteDb);
            };
            request.onblocked = () => {
                self.handleError(ErrorMessageConstants.errorMessages.dbDeleteOperationBlock);
            };
        });
    }
    clearStores(): Observable<any> {
        return Observable.create((observer: any) => {
            const stores = [{ name: 'Token', keyPath: 'userId' },
            { name: 'TeacherClass', keyPath: 'classId' },
            // { name: 'User', keyPath: 'identityId' },
            { name: 'Product', keyPath: 'product' },
            { name: 'Student', keyPath: 'userId' },
            { name: 'Login', keyPath: 'userName' },
            { name: 'Hierarchies', keyPath: 'hierarchyId' },
            { name: 'ProductProgram', keyPath: 'productId' },
            { name: 'ProgramAssessmentMapping', keyPath: 'ProgramId' }];
            const length = stores.length;
            stores.forEach(store => {
                this.removeStore(store.name).subscribe();
            });
            observer.next('done');
            observer.complete();
        });

    }
    /**
     * For Handling The Error By Throwing Message.
     */
    private handleError(msg: string) {
        return throwError(msg);
    }

    private open(dbName?: any): Observable<any> {
        const self = this;
        return Observable.create((observer: any) => {
            const request = self._indexedDB.open((dbName) ? dbName : self._dbName);

            request.onsuccess = () => {
                observer.next(request.result);
                observer.complete();
            };
            request.onerror = () => self.handleError(request.error);
        });
    }

    /**
    * For Getting The Mapped Data.
    * @param rosters roster service response data
    */
    getMappedData(rosters, callback) {
        let studentIDsArr = [];
        const products = [];
        environment.productId.map((productId, i) => {
            products[productId] = [];
            rosters.map((product, index) => {
                if (product.productIds.indexOf(productId) >= 0) {
                    products[productId] = products[productId].concat(product.studentIds);
                    studentIDsArr = studentIDsArr.concat(product.studentIds);
                }
                if (index === rosters.length - 1) {
                    products[productId] = products[productId].filter((productValue, index2, ar) => ar.indexOf(productValue) === index2);
                }
            });
            if (i === environment.productId.length - 1) {
                const prodStuArr = [];
                products.map((value, key) => {
                    prodStuArr.push({ product: '' + key, studentList: value });
                });
                // for (let key in pIDArr) {
                //     prodStuArr.push({ product: key, studentList: pIDArr[key] });
                // }
                callback({
                    productStudent: prodStuArr,
                    studentIds: studentIDsArr.filter((studentid, index3, ar) => ar.indexOf(studentid) === index3)
                });
            }

        });
    }
    /**
    * For Mapping The Profile Details.
    * @param profileDetails
    */
    // mapProfiles(profileDetails) {
    //     return profileDetails.map((profile) => {
    //         return {
    //             emailAddress: profile.rumbaUser.emailAddress,
    //             firstName: profile.rumbaUser.firstName,
    //             lastName: profile.rumbaUser.lastName,
    //             userId: profile.rumbaUser.userId,
    //             fullName: profile.rumbaUser.fullName
    //         };
    //     });

    // }
}
