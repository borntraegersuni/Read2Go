import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { z } from 'zod';

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
  
  // Toast notification properties
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

  // Load existing users from users.json
  loadUsers() {
    this.http.get<{ users: Signup[] }>('./users.json').subscribe((data) => {
      this.users = data.users;
    });
  }

  async onSignUp() {
    // Check if username is set
    if (!this.signupObj.Username || this.signupObj.Username.trim() === '') {
      this.showToast('Please enter a username', 'warning');
      return;
    }

    // Validate username length
    if (this.signupObj.Username.length < 3 || this.signupObj.Username.length > 20) {
      this.showToast('Username must be between 3 and 20 characters', 'warning');
      return;
    }

    // Validate email
    if (!z.string().email().safeParse(this.signupObj.EmailId).success) {
      this.showToast('Please enter a valid email address', 'warning');
      return;
    }

    // Password validation
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
  
  // Handle specific signup errors
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
  
  // Toast notification methods
  showToast(message: string, type: 'success' | 'error' | 'warning' | 'info') {
    // Clear any existing timeout
    if (this.toast.timeout) {
      clearTimeout(this.toast.timeout);
    }
    
    // Set toast properties
    this.toast.show = true;
    this.toast.message = message;
    this.toast.type = type;
    
    // Set timeout to hide toast
    this.toast.timeout = setTimeout(() => {
      this.hideToast();
    }, type === 'error' ? 5000 : 3000); // Show errors longer
  }
  
  hideToast() {
    this.toast.show = false;
  }

  // Simulate saving users (real-world: use backend API)
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
