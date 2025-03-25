import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';  // Ensure the correct path to AuthGuard

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./home/home.component').then((m) => m.HomeComponent);
    },
  },
  {
    path: 'bookclub',
    loadComponent: () => {
      return import('./book-club/book-club.component').then((m) => m.BookClubComponent);
    },
  },
  {
    path: 'login',
    loadComponent: () => {
      return import('./loginpage/loginpage.component').then((m) => m.LoginpageComponent);
    },
  },
  {
    path: 'bookshelf',
    loadComponent: () => {
      return import('./bookshelf/bookshelf.component').then((m) => m.BookshelfComponent);
    },
    canActivate: [AuthGuard], // Protect this route with the AuthGuard
  },
  {
    path: 'signup',
    loadComponent: () => {
      return import('./signuppage/signuppage.component').then((m) => m.SignUpPageComponent);
    },
  },
  {
    path: 'profile',
    loadComponent: () => {
      return import('./profilepage/profilepage.component').then((m) => m.ProfilePageComponent);
    },
    canActivate: [AuthGuard], // Protect this route with the AuthGuard
  },
  {
  path: 'booklist',
    loadComponent: () => {
      return import('./booklist/booklist.component').then((m) => m.BooklistComponent);
    },
    canActivate: [AuthGuard], // Protect this route with the AuthGuard
  },
  {
    path: 'search',
      loadComponent: () => {
        return import('./search/search.component').then((m) => m.SearchComponent);
      },
      canActivate: [AuthGuard], // Protect this route with the AuthGuard
    },
];
