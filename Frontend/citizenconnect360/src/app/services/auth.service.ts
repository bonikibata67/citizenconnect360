import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { adduser, loginresponse, loginuser, registerresponse} from '../models/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly BASE_URL = 'http://localhost:4005/auth/';

  constructor(private http: HttpClient) { }

  loginUsers(user: loginuser): Observable<loginresponse> {
    return this.http.post<loginresponse>(`${this.BASE_URL}login`, user);
  }

  registerUser(newUser: adduser): Observable<registerresponse> {
    return this.http.post<registerresponse>(`${this.BASE_URL}register`, newUser);
  }
}

