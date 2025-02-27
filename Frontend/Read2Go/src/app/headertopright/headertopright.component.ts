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
  constructor(public authService: AuthService, private router: Router) {}

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
