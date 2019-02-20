import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uniqueArray'
})
export class UniqueArrayPipe implements PipeTransform {

  transform(value: any, keyName: string): any {

    const result = value.filter(function (a) {
      const key = a[keyName];
      if (!this[key]) {
        this[key] = true;
        return true;
      }
    }, Object.create(null));
    return result;
  }

}
