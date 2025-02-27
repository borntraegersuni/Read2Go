import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => {
            return import('./home/home.component').then((m) => m.HomeComponent)
        },
    },
    {
        path: 'bookclub',
        loadComponent: () => {
            return import('./book-club/book-club.component').then((m) => m.BookClubComponent)
        },
    },
    {
        path: 'login',
        loadComponent: () => {
            return import('./loginpage/loginpage.component').then((m) => m.LoginpageComponent)
        },
    },
    {
        path: 'bookshelf',
        loadComponent: () => {
            return import('./bookshelf/bookshelf.component').then((m) => m.BookshelfComponent)
        },
    },
    {
        path: 'signup',
        loadComponent: () => {
            return import('./signuppage/signuppage.component').then((m) => m.SignUpPageComponent)
        },
    },
];
