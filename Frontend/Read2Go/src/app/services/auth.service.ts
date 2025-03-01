import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;
  private userEmail: string | null = null;
  private username: string | null = null;
  private token: string | null = null;
  constructor() {
    // Restore session when the service loads
    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      this.isLoggedIn = true;
      this.userEmail = user.EmailId;
      this.username = user.Username;
      this.token = user.token;
    }
  }

  // Log in the user and save session data to localStorage
  login(email: string, username: string, token: string) {
    this.isLoggedIn = true;
    this.userEmail = email;
    this.username = username;
    this.token = token;
    console.log('login Token: ', token);
    // Save user session in localStorage
    localStorage.setItem(
      'loggedInUser',
      JSON.stringify({ EmailId: email, Username: username, Token: token })
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
  getCurrentUser(): {
    username: string | null;
    email: string | null;
    token: string | null;
  } | null {
    if (this.isLoggedIn) {
      return {
        username: this.username,
        email: this.userEmail,
        token: this.token,
      };
    }
    return null; // Return null if no user is logged in
  }

  // Update user profile information (called when the user changes profile details)
  async updateUser(updatedUser: { username: string; email: string, currentPassword: string, newPassword: string }) {
    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      this.isLoggedIn = true;
      this.userEmail = user.EmailId;
      this.username = user.Username;
      this.token = user.Token;
    }
    if (this.isLoggedIn) {
      const request = await fetch('http://localhost:3000/auth/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.token || '',
        },
        body: JSON.stringify({
          username: updatedUser.username,
          email: updatedUser.email,
          oldpassword: updatedUser.currentPassword,
          newpassword: updatedUser.newPassword,
        }),
      })
      if(request.ok) {
        this.logout();
        alert("Profile updated successfully!");
        return true;
      } else {
        alert((await request.json()).message);
        return false;
      }
    }
    return false;
  }

  // Delete the user's account
  async deleteUserAccount(password: string): Promise<boolean> {
    if (this.isLoggedIn) {
      const savedUser = localStorage.getItem('loggedInUser');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        this.isLoggedIn = true;
        this.userEmail = user.EmailId;
        this.username = user.Username;
        this.token = user.Token;
      }

      const response = await fetch('http://localhost:3000/auth/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.token || '',
        },
        body: JSON.stringify({ password }),
      });
      if (response.ok) {
        this.logout();
        return true;
      } else {
        alert((await response.json()).message);
        return false;
      }
    }
    return false;
  }
}
