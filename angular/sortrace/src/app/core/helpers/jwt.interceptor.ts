import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      request.url.search('login') === -1 &&
      request.url.search('register') === -1 &&
      // request.url.search('feedback') === -1 &&
      request.url.search('reset-password') === -1 &&
      request.url.search('reservation-form') === -1 &&
      request.url.search('feedback/create') === -1 &&
      request.url.search('room/get-all-by-date') === -1
    ) {
      // add authorization header with jwt token if available
      const currentUser = this.authenticationService.currentUser();
      if (currentUser && currentUser.token) {
        request = request.clone({
          setHeaders: {
            Authorization: currentUser.token,
          },
        });
      }
    }
    return next.handle(request);
  }
}
