import { Pipe, PipeTransform } from '@angular/core';
/**
 * truncate pipe trancate the string based on the given lilit value
 * also shows the elipsise or any text provided with text
 * if provide the completeWords as true then string will not trancate
 */
@Pipe({
    name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
    transform(value: string, limit = 25, completeWords = false, ellipsis = '...') {
        if (!value || value === '' ) {
            return value;
        }
        if (completeWords) {
            limit = value.substr(0, 13).lastIndexOf(' ');
        }
        if (value.length > limit) {
            return `${value.substr(0, limit)}${ellipsis}`;
        } else {
            return value;
        }
    }
}
