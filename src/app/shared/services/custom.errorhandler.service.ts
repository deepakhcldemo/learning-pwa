import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
// import { Router } from '@angular/router';
import { AlertService } from '../components/alert/alert.service';

@Injectable()
export class CustomErrorHandlerService implements ErrorHandler {

  constructor(private injector: Injector, private alertService: AlertService) {
  }
  handleError(error: any) {
    // const router = this.injector.get(Router);
    if (error instanceof HttpErrorResponse) {
      // Backend returns unsuccessful response codes such as 404, 500 etc.
      console.error('Backend returned status code: ', error.status);
      console.error('Response body:', error.message);
      this.alertService.show({ status: 'error', message: error.message, code: error.status });
    } else {
      // A client-side or network error occurred.
      // console.error('An error occurred:', error.message);
      this.alertService.show({ status: 'error', message: error.message, code: '' });
    }
  }
}
