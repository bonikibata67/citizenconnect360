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

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  SignUpForm!: FormGroup;
  error!: string;
  message!: string;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.SignUpForm = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)]],
      role: ['citizen', Validators.required]
    });
  }

  onSubmit() {
    if (this.SignUpForm.valid) {
      this.authService.registerUser(this.SignUpForm.value).subscribe(
        res => {
          if (res.token) {
            if (this.authService.isAdmin()) {
              this.router.navigate(['/admin-dashboard']);
            } else if (this.authService.isGovernment()) {
              this.router.navigate(['/government-dashboard']);
            } else {
              this.router.navigate(['/home']);
            }
          }
        },
        err => {
          this.error = err?.error?.message || 'Registration failed';
        }
      );
    }
  }
}
// export class SignupComponent implements OnInit{
//   SignUpForm!: FormGroup;
//   error!: string;
//   message!: string;

//   constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

//   ngOnInit(): void {
//     this.SignUpForm = this.fb.group({
//       username: [null, [Validators.required, Validators.minLength(3)]],
//       email: [null, [Validators.required, Validators.email]],
//       password: [null, [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)]],
//       role: ['citizen', Validators.required]
//     });
//   }

//   onSubmit() {
//     if (this.SignUpForm.valid) {
//       this.authService.registerUser(this.SignUpForm.value).subscribe(
//         res => {
//           if (res.token) {
//             // Navigate based on user role
//             if (this.authService.isAdmin()) {
//               this.router.navigate(['/admin-dashboard']);
//             } else if (this.authService.isGovernment()) {
//               this.router.navigate(['/government-dashboard']);
//             } else {
//               this.router.navigate(['/home']);
//             }
//           }
//         },
//         err => {
//           this.error = err?.error?.message || 'Registration failed';
//         }
//       );
//     }
//   }
 
  
  
// };


