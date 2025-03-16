import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { z } from 'zod';

@Component({
  selector: 'app-signuppage',
  imports: [FormsModule, RouterModule, HttpClientModule],
  templateUrl: './signuppage.component.html',
  styleUrl: './signuppage.component.css',
})
export class SignUpPageComponent {
  signupObj: Signup;
  users: Signup[] = [];

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
    if (!z.string().email().safeParse(this.signupObj.EmailId).success) {
      //alert('Submit a real email.');
      return;
    }

    // Password
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
      //alert(passwordCheck.error.errors.map((e) => e.message).join('\n'));
      return;
    }
    // Check if the email is already taken

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
      this.router.navigate(['/bookshelf']).then(() => {
        window.location.reload();
      });
    } else {
      const data = await request.json();
      //alert(data.message);
    }

    // const emailExists = this.users.some(
    //   (user) => user.EmailId === this.signupObj.EmailId
    // );

    // if (emailExists) {
    //   alert('This email is already registered. Try logging in.');
    //   return;
    // }

    // // Add the new user
    // this.users.push(this.signupObj);

    // // Save users back to JSON (simulation, real-world needs a backend)
    // this.saveUsers();

    // // Auto-login the user after signup
    // this.authService.login(
    //   this.signupObj.EmailId,
    //   this.signupObj.Username,
    //   'TODOTOKEN'
    // );
    // //alert("Sign Up Successful!");
    // this.router.navigate(['/bookshelf']).then(() => {
    //   window.location.reload();
    // });
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
