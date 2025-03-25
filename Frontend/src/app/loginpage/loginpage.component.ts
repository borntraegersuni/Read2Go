import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-loginpage',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterModule, CommonModule],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.css'
})
export class LoginpageComponent {

  loginObj: Login;
  users: Login[] = [];
  
  // Toast notification properties
  toast = {
    show: false,
    message: '',
    type: 'error' as 'success' | 'error' | 'info' | 'warning',
    timeout: null as any
  };

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {
    this.loginObj = new Login();
    this.loadUsers();
  }

  // Load users from the local JSON file
  loadUsers() {
    this.http.get<Login[]>('./users.json').subscribe((data: any) => {
      this.users = data.users;
    });
  }

  async onLogin() {
    try {
      const result = await fetch('http://localhost:3000/auth/login', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          email: this.loginObj.EmailId,
          password: this.loginObj.Password
        })
      });

      if(result.ok) {
        const data = await result.json();
        this.authService.login(data.user.email, data.user.username, data.token);
        this.showToast('Login successful!', 'success');
        
        // Short delay to show the success message before navigating
        setTimeout(() => {
          this.router.navigate(['/bookshelf']).then(() => {
            window.location.reload();
          });
        }, 1000);
      } else {
        const errorData = await result.json().catch(() => null);
        const errorMessage = errorData?.message || "Invalid email or password.";
        
        this.showToast(errorMessage, 'error');
      }
    } catch (error) {
      console.error('Login error:', error);
      this.showToast('Connection error. Please try again later.', 'error');
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
}

export class Login {
  EmailId: string;
  Password: string;
  Username: string;
  constructor() {
    this.EmailId = '';
    this.Password = '';
    this.Username = '';
  }
}
