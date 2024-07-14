import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  adduser,
  loginresponse,
  // loginuser,
  registerresponse,
  User,
} from '../models/auth';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users: User[] = [
    
        { id:1, username: 'citizen1', email: 'citizen@gmail.com', role: 'citizen', password: 'citizen123' },
        { id:2, username: 'government1', email: 'official@gmail.com',role: 'government', password: 'government123' },
        { id:3, username: 'admin1', email: 'admin@gmail.com', role: 'admin', password: 'admin123' },
        { id:4, username: 'Qwerty', email: 'Qwerty@gmail.com', role: 'citizen', password: 'Qwerty123' },
      
  ];
  private loggedInUser: User | null = null;

  constructor() { }

  loginUsers(user: { username: string, password: string }): Observable<loginresponse> {
    const foundUser = this.users.find(u => u.username === user.username && u.password === user.password);
    if (foundUser) {
      this.loggedInUser = foundUser;
      const token = btoa(JSON.stringify({ username: foundUser.username, role: foundUser.role }));
      localStorage.setItem('token', token);
      return of({ token, user: foundUser, message: 'Login successful' });
    } else {
      return of({ token: '', user: null, message: 'Invalid username or password' });
    }
  }

  registerUser(newUser: adduser): Observable<registerresponse> {
    const user: User = { ...newUser, id: this.users.length + 1 };
    this.users.push(user);
    const token = btoa(JSON.stringify({ username: user.username, role: user.role }));
    localStorage.setItem('token', token);
    return of({ token, user, message: 'Registration successful' });
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedInUser = null;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = JSON.parse(atob(token));
      return decodedToken.role;
    }
    return null;
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }

  isGovernment(): boolean {
    return this.getUserRole() === 'government';
  }

  isCitizen(): boolean {
    return this.getUserRole() === 'citizen';
  }

  getUsers(): User[] {
    return this.users;
  }

  deleteUser(username: string, email: string, role: string): boolean {
    const index = this.users.findIndex(user => user.username === username && user.email === email && user.role === role);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }
  }
  // private users: User[] = [
  //   { username: 'citizen1', role: 'citizen', password: 'citizen123' },
  //   { username: 'government1', role: 'government', password: 'government123' },
  //   { username: 'admin1', role: 'admin', password: 'admin123' },
  // ];

  // constructor() {}

  // loginUsers(user: { username: string, password: string }): Observable<{ token: string, user: User, message: string } | null> {
  //   const foundUser = this.users.find(u => u.username === user.username && u.password === user.password);
  //   if (foundUser) {
  //     return of({ token: 'dummy-token', user: foundUser, message: 'Login successful' });
  //   } else {
  //     return of(null);
  //   }
  // }

  // registerUser(newUser: User): Observable<{ token: string, user: User, message: string }> {
  //   this.users.push(newUser);
  //   return of({ token: 'dummy-token', user: newUser, message: 'Registration successful' });
  // }

  // isAdmin(): boolean {
  //   const user = this.getCurrentUser();
  //   return user !== null && user.role === 'admin';
  // }

  // isGovernment(): boolean {
  //   const user = this.getCurrentUser();
  //   return user !== null && user.role === 'government';
  // }

  // isCitizen(): boolean {
  //   const user = this.getCurrentUser();
  //   return user !== null && user.role === 'citizen';
  // }

  // private getCurrentUser(): User | null {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     return null;
  //   }

  //   // Simulating fetching the current user based on the token
  //   // In a real scenario, you would decode the token or make a request to get the user details
  //   return this.users.find(user => user.token === token) || null;
  // }

  // logout() {
  //   localStorage.removeItem('token');
  // }

  // isLoggedIn(): boolean {
  //   return !!localStorage.getItem('token');
  // }

  // getToken(): string | null {
  //   return localStorage.getItem('token');
  // }


// export class AuthService {

//   private readonly BASE_URL = 'http://localhost:4005/auth/';

//   constructor(private http: HttpClient) { }

//   //logout
//   // private isLoggedIn=false;

//   loginUsers(user: loginuser): Observable<loginresponse> {
//     // return this.http.post<loginresponse>(this.BASE_URL +"login", user)
//     // use local storage for now

//     return this.http.post<loginresponse>(this.BASE_URL + "login", user).pipe(
//       tap(res => {
//         if (res.token) {
//           localStorage.setItem('token', res.token);
//         }
//       })
//     );

//   }

//   registerUser(newUser: adduser): Observable<registerresponse> {
//     // return this.http.post<registerresponse>(this.BASE_URL +"register", newUser);

//     return this.http.post<registerresponse>(this.BASE_URL + "register", newUser).pipe(
//       tap(res => {
//         if (res.token) {
//           localStorage.setItem('token', res.token);
//         }
//       })
//     );
//   };
//   logout() {
//     localStorage.removeItem('token');
//   }

//   isLoggedIn(): boolean {
//     return !!localStorage.getItem('token');
//   }

//   getToken(): string | null {
//     return localStorage.getItem('token');
//   }

// }
