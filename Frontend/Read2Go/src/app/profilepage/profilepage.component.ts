import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profilepage',
  imports: [FormsModule, CommonModule],
  templateUrl: './profilepage.component.html',
  styleUrl: './profilepage.component.css'
})
export class ProfilePageComponent implements OnInit {
  user: any = {
    username: '',
    email: '',
    password: '',
    currentPassword: '',
    newPassword: '',
    deletePassword: ''
  };
  profileImage = './assets/profilepage.jpg';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Load the currently logged-in user from AuthService
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.user.username = currentUser.username;
      this.user.email = currentUser.email;
    } else {
      this.router.navigate(['/login']); // Redirect to login if no user is found
    }
  }

  async saveChanges() {
    if (!this.user.username || !this.user.email || !this.user.currentPassword) {
      alert('All fields are required.');
      return;
    }
    
    // Update user information (you can also save this to the backend)
    if(await this.authService.updateUser(this.user)) {
      this.router.navigate(['/login']);
    }
  }

  async confirmDelete(form: any) {
    if (!form.valid) {
      return;
    }
    const confirmed = confirm('Are you sure you want to delete your account? This action is irreversible.');
    if (confirmed) {
      // Call deleteUserAccount from AuthService to delete the user
      if(await this.authService.deleteUserAccount(this.user.deletePassword))
        this.router.navigate(['/signup']);
    }
  }
}