import { User } from './../_models/user';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/Auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  usermodel: User;

  constructor(private authService: AuthService) {
    this.usermodel = new User();
   }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.usermodel).subscribe(
      next => {
        console.log('Login Seccessed');
      }, error => {
        console.log('login failed');
      });
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logOut() {
    localStorage.removeItem('token');
  }

}
