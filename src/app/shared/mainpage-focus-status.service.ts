import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MainPageFocusStatusService {
    _setMainPageFocus = new BehaviorSubject<boolean>(false);
    constructor() {
    }

    /**
     * This function is used to set the accessibility aria hidden flag.
     * should be subject and emit changes whenever it get change.
     *
     * @param value value should be emitted based on either it is false or true.
     */
    setMainPageFocusStatus(value) {
        this._setMainPageFocus.next(value);
    }

    /**
     * This function is used to check accessibility aria hidden recieve value.
     */
    getMainPageFocusStatus() {
        return this._setMainPageFocus;
    }
}
