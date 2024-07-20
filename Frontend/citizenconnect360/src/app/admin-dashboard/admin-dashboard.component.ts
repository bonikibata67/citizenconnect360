import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/auth';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'] // Corrected from styleUrl to styleUrls
})
export class AdminDashboardComponent implements OnInit {
  users: User[] = [];
  usernameToDelete: string = '';
  emailToDelete: string = '';
  roleToDelete: string = '';
  error: string = '';
  message: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.authService.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      (err) => {
        this.error = 'Failed to fetch users';
      }
    );
  }

  deleteUser() {
    this.authService.deleteUser(this.usernameToDelete, this.emailToDelete, this.roleToDelete).subscribe(
      (response) => {
        if (response.success) {
          this.fetchUsers();
          this.usernameToDelete = '';
          this.emailToDelete = '';
          this.roleToDelete = '';
          this.message = 'User deleted successfully';
        } else {
          this.error = 'User not found or invalid details provided.';
        }
      },
      (err) => {
        this.error = 'Failed to delete user';
      }
    );
  }
}


// import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../services/auth.service';
// import { User } from '../models/auth';
// import { RouterModule } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-admin-dashboard',
//   standalone: true,
//   imports: [RouterModule, CommonModule,FormsModule],
//   templateUrl: './admin-dashboard.component.html',
//   styleUrl: './admin-dashboard.component.css'
// })
// export class AdminDashboardComponent implements OnInit{
//   users: User[] = [];
//   usernameToDelete: string = '';
//   emailToDelete: string = '';
//   roleToDelete: string = '';

//   constructor(private authService: AuthService) {}

//   ngOnInit(): void {
//     this.users = this.authService.getUsers();
//   }

//   deleteUser() {
//     if (this.authService.deleteUser(this.usernameToDelete, this.emailToDelete, this.roleToDelete)) {
//       this.users = this.authService.getUsers();
//       this.usernameToDelete = '';
//       this.emailToDelete = '';
//       this.roleToDelete = '';
//     } else {
//       alert('User not found or invalid details provided.');
//     }
//   }

// }
