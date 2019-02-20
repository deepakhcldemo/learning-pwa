import { Component, OnInit } from '@angular/core';
import { AlertService } from './alert.service';


@Component({
    selector: 'app-ngbd-alert-selfclosing',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class NgbdAlertSelfclosingComponent implements OnInit {

    public constructor(public alertService: AlertService) {

    }



    ngOnInit(): void {

    }
    CloseAlert() {
        this.alertService.hide();
    }

}
