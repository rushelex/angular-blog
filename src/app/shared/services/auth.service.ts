import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { FbAuthResponse, User } from '../interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {}

  public get token(): string | null {
    const expDate = new Date(localStorage.getItem('fb-token-exp') ?? '');

    if (new Date() > expDate) {
      this.logout();
      return null;
    }

    return localStorage.getItem('fb-token');
  }

  public login(user: User): Observable<any> {
    return this.http
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.API_KEY}`,
        { ...user, returnSecureToken: true },
      )
      .pipe(tap(this.setToken.bind(this)), catchError(this.handleError.bind(this)));
  }

  public logout() {
    this.setToken(null);
    this.http.post('', {});
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  public handleError(error: HttpErrorResponse) {
    const { message } = error.error.error;

    switch (message) {
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Email не найден');
        break;
      case 'INVALID_EMAIL':
        this.error$.next('Неверный email');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Неверный пароль');
        break;
      default:
        this.error$.next('Неизвестная ошибка');
        break;
    }

    return throwError(error);
  }

  public setToken(res: Object | null) {
    const response = res as FbAuthResponse | null;
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }
}
