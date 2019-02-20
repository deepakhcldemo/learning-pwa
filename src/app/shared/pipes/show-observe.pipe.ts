import { Pipe, PipeTransform } from '@angular/core';
/**
 * to format any date from given timestamp
 */
@Pipe({
    name: 'showobserve',
    pure: false
})
export class ShowObserve implements PipeTransform {
    transform(items: any, id: number): any {
        if (!items) {
            return items;
        }
        const list = items.filter(itm => {
            return (itm.assessmentitemid === id) && itm.isObserved;
        });
        if (list.length > 0) {
            return list[0];
        }
    }
}
