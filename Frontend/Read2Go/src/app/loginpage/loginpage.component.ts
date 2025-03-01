import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-loginpage',
  imports: [FormsModule, HttpClientModule, RouterModule],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.css'
})
export class LoginpageComponent {

  loginObj: Login;
  users: Login[] = [];

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
      this.router.navigate(['/bookshelf']).then(() => {
        window.location.reload();
      });
    } else {
      alert("Invalid email or password.");
    }

    // if (userFound) {
    //   this.authService.login(userFound.EmailId, userFound.Username);
    //   this.router.navigate(['/bookshelf']).then(() => {
    //     window.location.reload();
    //   });
    // } else {
    //   alert("Invalid email or password.");
    // }
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
