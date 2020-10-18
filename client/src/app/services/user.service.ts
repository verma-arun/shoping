import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { appConfig } from '../app-config';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    createUser(user: any) {
        return this.http.post<any>(appConfig.apiUrl + 'user', user, {
          observe: 'response',
        });
      }
}