import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  private userEmail: string | null = null;
  private username: string | null = null;

  constructor() {
    // Restore session when service loads
    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      this.isLoggedIn = true;
      this.userEmail = user.EmailId;
      this.username = user.Username;
    }
  }

  login(email: string, username: string) {
    this.isLoggedIn = true;
    this.userEmail = email;
    this.username = username;

    // Save user session in localStorage
    localStorage.setItem('loggedInUser', JSON.stringify({ EmailId: email, Username: username }));
  }

  logout() {
    this.isLoggedIn = false;
    this.userEmail = null;
    this.username = null;

    // Remove session data
    localStorage.removeItem('loggedInUser');
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  getUserEmail(): string | null {
    return this.userEmail;
  }

  getUsername(): string | null {
    return this.username;
  }
}
