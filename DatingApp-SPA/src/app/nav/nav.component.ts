import { AlertifyService } from './../_services/alertify.service';
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

  constructor(
    public authService: AuthService,
    private alertify: AlertifyService
  ) {
    this.usermodel = new User();
  }

  ngOnInit() {}

  login() {
    this.authService.login(this.usermodel).subscribe(
      next => {
        this.alertify.success('Logged in Successfully');
      },
      error => {
        this.alertify.error('Login Failed');
      }
    );
  }

  loggedIn() {
    // const token = localStorage.getItem('token');
    // return !!token;
    return this.authService.isUserLoggedIn();
  }

  logOut() {
    localStorage.removeItem('token');
    this.alertify.message('Logged out');
  }
}
