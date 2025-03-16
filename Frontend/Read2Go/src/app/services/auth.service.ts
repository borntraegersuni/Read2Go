import { Injectable } from '@angular/core';
import { retry } from 'rxjs';

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

  async getBooks(filter: 'wishlist' | 'reading' | 'finished' | '') {
    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      this.isLoggedIn = true;
      this.userEmail = user.EmailId;
      this.username = user.Username;
      this.token = user.Token;
    }
    const request = await fetch('http://localhost:3000/user/books', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.token || '',
      },
    });
    if (!request.ok) {
      return [];
    }
    const books = (await request.json()).books as {
      title: string;
      description: string;
      image: string;
      author: string;
      rating: number;
      genre: string;
      id: number;
      bookid: number;
      published: number;
      state: 'wishlist' | 'reading' | 'finished';
    }[];
    console.log('books', books.length);
    return filter != "" ? books.filter((b) => b.state === filter) : books;
  }

  async getAllBooks() {
    const request = await fetch('http://localhost:3000/user/allBooks', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!request.ok) {
      return [];
    }
    const data = await request.json();
    return data.books as {
      id: number;
      createdAt: string;
      updatedAt: string;
      title: string;
      author: string;
      description: string | null;
      publishedYear: number;
      genre: string;
      isbn: string;
      rating: number;
      image: string;
    }[];
  }

  // Update user profile information (called when the user changes profile details)
  async updateUser(updatedUser: {
    username: string;
    email: string;
    currentPassword: string;
    newPassword: string;
  }) {
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
      });
      if (request.ok) {
        this.logout();
        //alert('Profile updated successfully!');
        return true;
      } else {
        //alert((await request.json()).message);
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
        //alert((await response.json()).message);
        return false;
      }
    }
    return false;
  }

  async sendBookStatus(bookId: number, status: number) {
    if (this.isLoggedIn) {
      const savedUser = localStorage.getItem('loggedInUser');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        this.isLoggedIn = true;
        this.userEmail = user.EmailId;
        this.username = user.Username;
        this.token = user.Token;
      }
      const response = await fetch('http://localhost:3000/user/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.token || '',
        },
        body: JSON.stringify({ bookId, status }),
      });
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  async sendBookReview(bookId: number, rating: number, review: string) {
    if (this.isLoggedIn) {
      const savedUser = localStorage.getItem('loggedInUser');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        this.isLoggedIn = true;
        this.userEmail = user.EmailId;
        this.username = user.Username;
        this.token = user.Token;
      }
      const response = await fetch('http://localhost:3000/user/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.token || '',
        },
        body: JSON.stringify({ bookId, review, rating }),
      });
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  async getReviewForBookByUserBookId(userBookId: number) {
    if (this.isLoggedIn) {
      const savedUser = localStorage.getItem('loggedInUser');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        this.isLoggedIn = true;
        this.userEmail = user.EmailId;
        this.username = user.Username;
        this.token = user.Token;
      }
      const response = await fetch(
        `http://localhost:3000/user/review?bookId=${userBookId}`,
        {
          headers: {
            Authorization: this.token || '',
          },
        }
      );
      if (response.ok) {
        return (await response.json()).review;
      }
    }
    return null;
  }

  async sendReview(bookId: number, rating: number) {
    if (this.isLoggedIn) {
      const savedUser = localStorage.getItem('loggedInUser');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        this.isLoggedIn = true;
        this.userEmail = user.EmailId;
        this.username = user.Username;
        this.token = user.Token;
      }
      console.log(
        `http://localhost:3000/user/rating?book=${bookId}&rating=${rating}`
      );
      const response = await fetch(
        `http://localhost:3000/user/rating?book=${bookId}&rating=${rating}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.token || '',
          },
        }
      );
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }
}
