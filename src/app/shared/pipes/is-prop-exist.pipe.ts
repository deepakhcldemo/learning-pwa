import { Pipe, PipeTransform } from '@angular/core';
/**
 * to check whether a property exist and it's value is defined
 */
@Pipe({
    name: 'isPropExist',
    pure: false
})
export class IsPropExistPipe implements PipeTransform {
    transform(items: any, property: string): any {
        if (!items || !property) {
            return items;
        }

        return items.filter(item => item.hasOwnProperty(property) && item[property] !== undefined);
    }
}
