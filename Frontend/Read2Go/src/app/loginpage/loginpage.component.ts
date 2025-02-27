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

  onLogin() {
    const userFound = this.users.find(user => 
      user.EmailId === this.loginObj.EmailId && user.Password === this.loginObj.Password
    );
  
    if (userFound) {
      this.authService.login(userFound.EmailId, userFound.Username);  // ✅ Store Email & Username
      this.router.navigate(['/bookshelf']);
    } else {
      alert("Invalid email or password.");
    }
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
