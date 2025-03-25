import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { z } from 'zod';

/**
 * SignUpPageComponent handles user registration functionality for the application.
 * It manages the signup form validation using Zod schema validation, communicates with 
 * the backend server to create new user accounts, handles various error scenarios,
 * and provides user feedback through toast notifications. Upon successful signup,
 * the user is automatically logged in and redirected to the bookshelf page.
 */
@Component({
  selector: 'app-signuppage',
  standalone: true,
  imports: [FormsModule, RouterModule, HttpClientModule, CommonModule],
  templateUrl: './signuppage.component.html',
  styleUrl: './signuppage.component.css',
})
export class SignUpPageComponent {
  signupObj: Signup;
  users: Signup[] = [];
  
  toast = {
    show: false,
    message: '',
    type: 'error' as 'success' | 'error' | 'info' | 'warning',
    timeout: null as any
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    this.signupObj = new Signup();
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<{ users: Signup[] }>('./users.json').subscribe((data) => {
      this.users = data.users;
    });
  }

  async onSignUp() {
    if (!this.signupObj.Username || this.signupObj.Username.trim() === '') {
      this.showToast('Please enter a username', 'warning');
      return;
    }

    if (this.signupObj.Username.length < 3 || this.signupObj.Username.length > 20) {
      this.showToast('Username must be between 3 and 20 characters', 'warning');
      return;
    }

    if (!z.string().email().safeParse(this.signupObj.EmailId).success) {
      this.showToast('Please enter a valid email address', 'warning');
      return;
    }

    const passwordCheck = z
      .string()
      .min(3, 'Password needs to be at least 3 characters long.')
      // .regex(/[A-Z]/, 'Password needs to have at least one uppercase letter.')
      // .regex(
      //   /[a-z]/,
      //   'Password needs to have at least one lowercase letter.'
      // )
      // .regex(/\d/, 'Password needs at least one lowercase letter.')
      // .regex(
      //   /[@$!%*?&]/,
      //   'Password needs to have at least one special character (@$!%*?&)'
      // )
      .safeParse(this.signupObj.Password);
      
    if (!passwordCheck.success) {
      this.showToast(
        passwordCheck.error.errors.map((e) => e.message).join('. '), 
        'warning'
      );
      return;
    }
    
    try {
      const request = await fetch('http://localhost:3000/auth/signup', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          username: this.signupObj.Username,
          email: this.signupObj.EmailId,
          password: this.signupObj.Password,
        }),
      });

      if(request.ok) {
        const data = await request.json();
        this.authService.login(data.user.email, data.user.username, data.token);
        
        this.showToast('Account created successfully!', 'success');
        setTimeout(() => {
          this.router.navigate(['/bookshelf']).then(() => {
            window.location.reload();
          });
        }, 1000);
      } else {
        const data = await request.json();
        this.handleSignupError(data, request.status);
      }
    } catch (error) {
      console.error('Signup error:', error);
      this.showToast('Connection error. Please try again later.', 'error');
    }
  }
  
  handleSignupError(data: any, statusCode: number) {
    const message = data.message || 'An error occurred during signup';
    
    if (message.includes('email') && message.includes('exist')) {
      this.showToast('This email address is already registered', 'error');
    }
    else if (message.includes('username') && message.includes('exist')) {
      this.showToast('This username is already taken', 'error');
    }
    else if (statusCode === 400) {
      this.showToast('Please check your information and try again', 'error');
    }
    else {
      this.showToast(message, 'error');
    }
  }
  
  showToast(message: string, type: 'success' | 'error' | 'warning' | 'info') {
    if (this.toast.timeout) {
      clearTimeout(this.toast.timeout);
    }
    
    this.toast.show = true;
    this.toast.message = message;
    this.toast.type = type;
    
    this.toast.timeout = setTimeout(() => {
      this.hideToast();
    }, type === 'error' ? 5000 : 3000);
  }
  
  hideToast() {
    this.toast.show = false;
  }

  saveUsers() {
    console.log('Users saved:', JSON.stringify({ users: this.users }, null, 2));
  }
}

export class Signup {
  Username: string;
  EmailId: string;
  Password: string;

  constructor() {
    this.Username = '';
    this.EmailId = '';
    this.Password = '';
  }
}
