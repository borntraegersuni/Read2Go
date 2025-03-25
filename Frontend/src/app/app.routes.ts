import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';  

/**
 * Configuration of application routes.
 **/

export const routes: Routes = [
  {
    path: '', // Default route
    pathMatch: 'full',
    loadComponent: () => {
      return import('./home/home.component').then((m) => m.HomeComponent);
    },
  },
  {
    path: 'bookclub', // Book Club route
    loadComponent: () => {
      return import('./book-club/book-club.component').then((m) => m.BookClubComponent);
    },
  },
  {
    path: 'login', // Login route
    loadComponent: () => {
      return import('./loginpage/loginpage.component').then((m) => m.LoginpageComponent);
    },
  },
  {
    path: 'bookshelf', // Bookshelf route (Protected route)
    loadComponent: () => {
      return import('./bookshelf/bookshelf.component').then((m) => m.BookshelfComponent);
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'signup', // Signup route
    loadComponent: () => {
      return import('./signuppage/signuppage.component').then((m) => m.SignUpPageComponent);
    },
  },
  {
    path: 'profile', // Profile route (Protected route)
    loadComponent: () => {
      return import('./profilepage/profilepage.component').then((m) => m.ProfilePageComponent);
    },
    canActivate: [AuthGuard], 
  },
  {
  path: 'booklist', // Booklist route (Protected route)
    loadComponent: () => {
      return import('./booklist/booklist.component').then((m) => m.BooklistComponent);
    },
    canActivate: [AuthGuard], 
  },
  {
    path: 'search', // Search route (Protected route)
      loadComponent: () => {
        return import('./search/search.component').then((m) => m.SearchComponent);
      },
      canActivate: [AuthGuard], 
    },
];
