import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/auth';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule,FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{
  users: User[] = [];
  usernameToDelete: string = '';
  emailToDelete: string = '';
  roleToDelete: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.users = this.authService.getUsers();
  }

  deleteUser() {
    if (this.authService.deleteUser(this.usernameToDelete, this.emailToDelete, this.roleToDelete)) {
      this.users = this.authService.getUsers();
      this.usernameToDelete = '';
      this.emailToDelete = '';
      this.roleToDelete = '';
    } else {
      alert('User not found or invalid details provided.');
    }
  }
}
