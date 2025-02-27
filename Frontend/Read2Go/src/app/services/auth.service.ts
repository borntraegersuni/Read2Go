import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;
  private userEmail: string | null = null;
  private username: string | null = null;

  constructor() {
    // Restore session when the service loads
    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      this.isLoggedIn = true;
      this.userEmail = user.EmailId;
      this.username = user.Username;
    }
  }

  // Log in the user and save session data to localStorage
  login(email: string, username: string) {
    this.isLoggedIn = true;
    this.userEmail = email;
    this.username = username;

    // Save user session in localStorage
    localStorage.setItem(
      'loggedInUser',
      JSON.stringify({ EmailId: email, Username: username })
    );
  }

  // Log out the user and remove session data
  logout() {
    this.isLoggedIn = false;
    this.userEmail = null;
    this.username = null;

    // Remove session data
    localStorage.removeItem('loggedInUser');
  }

  // Check if the user is authenticated (logged in)
  isAuthenticated(): boolean {
    return this.isLoggedIn; // or check localStorage if needed
  }
  

  // Get the logged-in user's email
  getUserEmail(): string | null {
    return this.userEmail;
  }

  // Get the logged-in user's username
  getUsername(): string | null {
    return this.username;
  }

  // Method to retrieve the current logged-in user
  getCurrentUser(): { username: string | null; email: string | null } | null {
    if (this.isLoggedIn) {
      return {
        username: this.username,
        email: this.userEmail,
      };
    }
    return null; // Return null if no user is logged in
  }

  // Update user profile information (called when the user changes profile details)
  updateUser(updatedUser: { username: string; email: string }) {
    if (this.isLoggedIn) {
      this.username = updatedUser.username;
      this.userEmail = updatedUser.email;

      // Update session in localStorage
      localStorage.setItem(
        'loggedInUser',
        JSON.stringify({ EmailId: updatedUser.email, Username: updatedUser.username })
      );
    }
  }

  // Delete the user's account
  deleteUserAccount() {
    if (this.isLoggedIn) {
      // Remove session data from localStorage
      localStorage.removeItem('loggedInUser');
      this.isLoggedIn = false;
      this.userEmail = null;
      this.username = null;
    }
  }
  
}
