import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token: any = localStorage.getItem('token');

    // Check if token is not null or undefined before adding it to headers
    if (token !== null && token !== undefined) {
      let modifiedReq = request.clone({
        headers: request.headers.set("token", token)
      });

      return next.handle(modifiedReq);
    } else {
      //console.error('Token is null or undefined.');
      return next.handle(request);
    }
  }
}
