
import { Component, OnInit } from '@angular/core';
import { HeaderTopRightComponent } from '../headertopright/headertopright.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';

/**
 * Header component that handles navigation highlighting
 * 
 * This component is responsible for displaying the application header and tracking
 * the current route to highlight active navigation items. It integrates with the
 * authentication service to potentially show different header content based on auth state.
 */

@Component({
  selector: 'app-header',
  imports: [CommonModule, HeaderTopRightComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentRoute: string = '';

  constructor(public authService: AuthService, private router: Router) {}  

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }

  isActive(route: string): boolean {
    return this.currentRoute === route;
  }
}
