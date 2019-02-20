import { Pipe, PipeTransform } from '@angular/core';
/**
 * to format any date from given timestamp
 */
@Pipe({
    name: 'dateFormat',
    pure: false
})
export class DateFormatPipe implements PipeTransform {
    transform(items: any, format: string): any {
        if (!items) {
            return items;
        }
        const timestamp: any = items;
        const myDate: any = new Date(timestamp * 1000);
        let formatedTime = ('0' + (myDate.getMonth() + 1)).slice(-2) + '/'
            + ('0' + myDate.getDate()).slice(-2);
        if (format === 'DD/MM/YYYY') {
            formatedTime = ('0' + myDate.getDate()).slice(-2) + '/'
                + ('0' + (myDate.getMonth() + 1)).slice(-2) + '/'
                + myDate.getFullYear();
        }

        if (format === 'MM/DD/YYYY') {
            formatedTime =
                ('0' + (myDate.getMonth() + 1)).slice(-2) + '/' +
                ('0' + myDate.getDate()).slice(-2) + '/' +
                + myDate.getFullYear();
        }
        return formatedTime;
    }
}
