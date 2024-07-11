import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { adduser, loginresponse, loginuser, registerresponse} from '../models/auth';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly BASE_URL = 'http://localhost:4005/auth/';

  constructor(private http: HttpClient) { }

  //logout
  // private isLoggedIn=false;

  loginUsers(user: loginuser): Observable<loginresponse> {
    // return this.http.post<loginresponse>(this.BASE_URL +"login", user)
    // use local storage for now

    return this.http.post<loginresponse>(this.BASE_URL + "login", user).pipe(
      tap(res => {
        if (res.token) {
          localStorage.setItem('token', res.token);
        }
      })
    );

  }

  registerUser(newUser: adduser): Observable<registerresponse> {
    // return this.http.post<registerresponse>(this.BASE_URL +"register", newUser);


    return this.http.post<registerresponse>(this.BASE_URL + "register", newUser).pipe(
      tap(res => {
        if (res.token) {
          localStorage.setItem('token', res.token);
        }
      })
    );
  };
  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

}

