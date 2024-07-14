import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
// import { AppState } from '../state';
// import { authactions } from '../state/actions/auth.actions';
import { errorSelector } from '../state/selectors/auth.selector';
import { AuthService } from '../services/auth.service';
import { Observable, Subscription } from 'rxjs';
// import { AuthenticationService } from '../services/authentication.service';
import { tap } from 'rxjs/operators';
import { User } from '../models/auth';
// import {lo}




@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule, RouterModule, CommonModule]
})
export class LoginComponent implements  OnInit {
  LoginForm!: FormGroup;
  error!: string;
  message: string = ''; // Initialize message here

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.LoginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  onSubmit() {
    if (this.LoginForm.valid) {
      this.authService.loginUsers(this.LoginForm.value).subscribe(
        res => {
          this.message = res.message || ''; // Ensure message is always set, even if undefined
          if (res.token) {
            // Navigate based on user role
            if (this.authService.isAdmin()) {
              this.router.navigate(['/admin-dashboard']);
            } else if (this.authService.isGovernment()) {
              this.router.navigate(['/government-dashboard']);
            } else {
              this.router.navigate(['/home']);
            }
          } else {
            this.error = 'Login failed. Invalid username or password.';
          }
        },
        err => {
          this.error = err?.error?.message || 'Login failed';
        }
      );
    }
  }
  // LoginForm!: FormGroup;
  // error!: string;
  // message: string='';

  // constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  // ngOnInit(): void {
  //   this.LoginForm = this.fb.group({
  //     username: [null, Validators.required],
  //     password: [null, Validators.required]
  //   });
  // }

  // onSubmit() {
  //   if (this.LoginForm.valid) {
  //     this.authService.loginUsers(this.LoginForm.value).subscribe(
  //       res => {
  //         this.message = res.message;
  //         if (res.token) {
  //           // Navigate based on user role
  //           if (this.authService.isAdmin()) {
  //             this.router.navigate(['/admin-dashboard']);
  //           } else if (this.authService.isGovernment()) {
  //             this.router.navigate(['/government-dashboard']);
  //           } else {
  //             this.router.navigate(['/home']);
  //           }
  //         } else {
  //           this.error = 'Login failed. Invalid username or password.';
  //         }
  //       },
  //       err => {
  //         this.error = err?.error?.message || 'Login failed';
  //       }
  //     );
  //   }
  // }
}
// export class LoginComponent implements OnInit{
//   LoginForm!: FormGroup;
//   error: string | null = null;
//   message!: string;

//   constructor(
//     private fb: FormBuilder,
//     private router: Router,
//     private authService:AuthService
//   ) {}

//   ngOnInit(): void {
//     this.LoginForm = this.fb.group({
//       username: ['', Validators.required],
//       password: ['', Validators.required],
//     });
//   }

//   onSubmit(): void {
//     const { username, password } = this.LoginForm.value;

//     this.authService.login(username, password).subscribe(
//       (user: User | null) => {
//         if (user) {
//           switch (user.role) {
//             case 'citizen':
//               this.router.navigate(['/home']);
//               break;
//             case 'government':
//               this.router.navigate(['/government-dashboard']);
//               break;
//             case 'admin':
//               this.router.navigate(['/admin-dashboard']);
//               break;
//             default:
//               this.router.navigate(['/home']);
//               break;
//           }
//         } else {
//           this.error = 'Invalid credentials. Please try again.';
//         }
//       },
//       (error) => {
//         this.error = 'An error occurred while logging in. Please try again later.';
//       }
//     );
//   }
 
//   }

