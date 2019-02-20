import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { IndexedDbService } from './indexed.db.service';

@Injectable()
export class IndexDBResolverService implements Resolve<any> {

  constructor(
    private IDBService: IndexedDbService) { }

  resolve(): Observable<any> {
    const self = this;
    const obj = { user: '', token: '', login: '' };
    return Observable.create((observer: any) => {
      self.IDBService.getAll('User', (res) => {
        if (res) { res = res[0]; }
        obj.user = res;
        self.IDBService.getAll('Token', (tokenRes) => {
          if (tokenRes) { tokenRes = tokenRes[0]; }
          obj.token = tokenRes;
          self.IDBService.getAll('Login', (loginRes) => {
            if (loginRes) { loginRes = loginRes[0]; }
            obj.login = loginRes;
            observer.next(obj);
            observer.complete(obj);
          });
        });
      });
    });
  }
}
