import { Component, OnInit } from '@angular/core';
import { HeaderTopRightComponent } from '../headertopright/headertopright.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, HeaderTopRightComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentRoute: string = '';

  constructor(public authService: AuthService, private router: Router) {}  // Inject AuthService and Router

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
