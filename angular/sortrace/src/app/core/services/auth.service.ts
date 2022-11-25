import { Injectable } from '@angular/core';
import { CookieService } from '../services/cookie.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  user: any;
  constructor(private cookieService: CookieService) {}

  /**
   * Returns the current user
   */
  public currentUser() {
    if (!this.user) {
      this.user = JSON.parse(
        String(this.cookieService.getCookie('currentUser'))
      );
    }
    return this.user;
  }

  public setUser(newUserData: any) {
    if (!newUserData) {
      this.cookieService.setCookie(
        'currentUser',
        JSON.stringify(newUserData),
        1
      );
    }
  }

  public logout() {
    this.cookieService.deleteCookie('currentUser');
    this.user = null;
  }
}
