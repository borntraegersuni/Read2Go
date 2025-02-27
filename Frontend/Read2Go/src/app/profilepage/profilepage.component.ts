import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profilepage',
  imports: [FormsModule],
  templateUrl: './profilepage.component.html',
  styleUrl: './profilepage.component.css'
})
export class ProfilePageComponent implements OnInit {
  user: any = {
    username: '',
    email: '',
    password: '',
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

  saveChanges() {
    if (!this.user.username || !this.user.email || !this.user.password) {
      alert('All fields are required.');
      return;
    }

    // Update user information (you can also save this to the backend)
    this.authService.updateUser(this.user);
    console.log('Profile updated:', this.user);
    alert('Profile updated successfully!');
  }

  confirmDelete() {
    const confirmed = confirm('Are you sure you want to delete your account? This action is irreversible.');
    if (confirmed) {
      // Call deleteUserAccount from AuthService to delete the user
      this.authService.deleteUserAccount();
      alert('Your account has been deleted.');
      this.router.navigate(['/signup']); // Redirect to signup or login page
    }
  }
}