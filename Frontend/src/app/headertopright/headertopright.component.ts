import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

/**
 * Component for the top-right section of the header in the application.
 * 
 * This component handles:
 * - Displaying the current user's username when logged in
 * - Providing logout functionality
 * - Updating user information based on authentication status
 */

@Component({
  selector: 'app-headertopright',
  imports: [CommonModule],
  templateUrl: './headertopright.component.html',
  styleUrls: ['./headertopright.component.css']
})

export class HeaderTopRightComponent {
  userEmail: string | null = null;
  username: string | null = null;

  constructor(public authService: AuthService, private router: Router) {
    this.updateUserInfo();
  }

  updateUserInfo() {
    if (this.authService.isAuthenticated()) {
      this.userEmail = this.authService.getUserEmail();
      this.username = this.authService.getUsername();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}