import { Component } from '@angular/core';
import { HeaderTopRightComponent } from '../headertopright/headertopright.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, HeaderTopRightComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(public authService: AuthService) {}  // Inject AuthService
}
