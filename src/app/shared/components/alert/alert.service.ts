import { Injectable, HostListener } from '@angular/core';
import { errorConfig } from './alert.config';
@Injectable()
export class AlertService {
    public alertOptions: any;
    constructor() {
        this.alertOptions = { status: 'success', message: null, code: '' };
    }
    setConfig() {
        return this.alertOptions;
    }
    show(obj) {
        if (obj.code && obj.code !== '') {
            if (errorConfig[obj.code] === undefined) {
                obj.message = 'Error found!';
            } else {
                obj.message = obj.code + ' : ' + errorConfig[obj.code];
            }
        } else if (!obj.message && obj.message === '') {
            obj.message = 'Error found!';
        }
        this.alertOptions = obj;
    }
    hide() {
        this.alertOptions.message = null;
    }
}
