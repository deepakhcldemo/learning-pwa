import { Pipe, PipeTransform } from '@angular/core';
/**
 * to check whether an array is empty
 */
@Pipe({
    name: 'arrayBlank',
    pure: false
})
export class ArrayBlankPipe implements PipeTransform {
    transform(items: any[], property: string): any {
        if (!items || !property) {
            return items;
        }
        return items.filter(item => item[property].length > 0);
    }
}
