import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signuppage',
  imports: [ FormsModule, RouterModule, HttpClientModule],
  templateUrl: './signuppage.component.html',
  styleUrl: './signuppage.component.css'
})
export class SignUpPageComponent {
  signupObj: Signup;
  users: Signup[] = [];

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {
    this.signupObj = new Signup();
    this.loadUsers();
  }

  // Load existing users from users.json
  loadUsers() {
    this.http.get<{ users: Signup[] }>('./users.json').subscribe((data) => {
      this.users = data.users;
    });
  }

  onSignUp() {
    // Check if the email is already taken
    const emailExists = this.users.some(user => user.EmailId === this.signupObj.EmailId);

    if (emailExists) {
      alert("This email is already registered. Try logging in.");
      return;
    }

    // Add the new user
    this.users.push(this.signupObj);

    // Save users back to JSON (simulation, real-world needs a backend)
    this.saveUsers();

    // Auto-login the user after signup
    this.authService.login(this.signupObj.EmailId, this.signupObj.Username);
    //alert("Sign Up Successful!");
    this.router.navigate(['/bookshelf']).then(() => {
      window.location.reload();
    });
    
  }

  // Simulate saving users (real-world: use backend API)
  saveUsers() {
    console.log("Users saved:", JSON.stringify({ users: this.users }, null, 2));
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
