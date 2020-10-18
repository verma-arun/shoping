import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, of, Subject } from 'rxjs';
import 'rxjs/add/operator/map'


import { appConfig } from '../app-config';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    registerNewUser(user: any) {
        return this.http.post<any>(appConfig.apiUrl + 'user', user, {
          observe: 'response',
        });
      }

    login(username: string, password: string) {
        return this.http.post<any>(appConfig.apiUrl + '/authenticate', { username: username, password: password })
            .pipe(map(user => {
                    // login successful if there's a jwt token in the response
                    if (user && user.token) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify(user));
                    }
    
                    return user;
                })
            );
    }

    _login(username: string, password: string) {
            // console.log(result);
          };

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}