import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-headertopright',
  imports: [CommonModule],
  templateUrl: './headertopright.component.html',
  styleUrls: ['./headertopright.component.css']
})
export class HeaderTopRightComponent {
  userEmail: string | null = null;
  username: string | null = null;

  // 🔹 Make authService PUBLIC so it can be used in the template
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