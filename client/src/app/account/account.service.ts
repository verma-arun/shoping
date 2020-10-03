import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AccountService {
  constructor(private http: HttpClient) {}

  register(registerAccount: any) {
    return this.http.post<any>('api/register', registerAccount, {
      observe: 'response',
    });
  }

  login(username: string, password: string, rememberMe: boolean) {
    const data = { username, password, rememberMe };
  }
}
