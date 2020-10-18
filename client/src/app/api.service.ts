import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './models/user';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  apiUrl = 'http://localhost:4000/';
  constructor(private http: HttpClient) {}

  registerNewUser(user: any) {
    return this.http.post<any>(this.apiUrl + 'user', user, {
      observe: 'response',
    });
  }

  login(username: string, password: string) {
    var data = {
      email: username,
      password: password,
    };
    
    return this.http.post<any>(`authenticate`, JSON.stringify(data)).pipe(
      map((user) => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      })
    );
  }
}
