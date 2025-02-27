import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userEmail: string | null = null;
  private username: string | null = null; // ✅ Store Username

  login(email: string, username: string) {  // ✅ Accept Username
    this.userEmail = email;
    this.username = username;
    localStorage.setItem('userEmail', email);
    localStorage.setItem('username', username);  // ✅ Store Username
  }

  logout() {
    this.userEmail = null;
    this.username = null;
    localStorage.removeItem('userEmail');
    localStorage.removeItem('username');
  }

  isAuthenticated(): boolean {
    return this.userEmail !== null;
  }

  getUserEmail(): string | null {
    return this.userEmail;
  }

  getUsername(): string | null {  // ✅ Retrieve stored Username
    return this.username ? this.username : localStorage.getItem('username');
  }
}
