import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AppState } from '../state';
import { authactions } from '../state/actions/auth.actions';
import { errorSelector } from '../state/selectors/auth.selector';
import { AuthService } from '../services/auth.service';
import { Observable, Subscription } from 'rxjs';



@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule, RouterModule, CommonModule]
})
export class LoginComponent implements OnDestroy, OnInit{
 
  LoginForm!:FormGroup
  error!:string
  message!:string


 
  constructor(private authservice:AuthService, private fb: FormBuilder, private router:Router, private store:Store <AppState>) {}
  ngOnDestroy(): void {
    
  }
  ngOnInit(): void {
    this.LoginForm= this.fb.group ({
      username:this.fb.control(null, Validators.required),
      password: this.fb.control(null, Validators.required),
    });
    
  }
  error$=this.store.select(errorSelector)
  onSubmit() {     
  this.store.dispatch(authactions.login({user:this.LoginForm.value}));
  

    this.authservice.loginUsers(this.LoginForm.value).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        this.message = res.message;
        if (res.token) {
          this.router.navigate(['/home']);
        }
      },
      (err: { error: { message: any } }) => {
        console.log(err);
        this.error = err.error.message;
      }
    );



      
      
     
   
}}

