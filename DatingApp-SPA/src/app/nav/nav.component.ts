import { AlertifyService } from './../_services/alertify.service';
import { User } from './../_models/user';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/Auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  usermodel: User;
  photoUrl: string;

  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {
    this.usermodel = new User();
  }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe((photoUrl) => {
      this.photoUrl = photoUrl;
    });
  }

  login() {
    this.authService.login(this.usermodel).subscribe(
      next => {
        this.alertify.success('Logged in Successfully');
      },
      error => {
        this.alertify.error('Login Failed');
      },
      () => {
        this.router.navigate(['/members']);
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
    localStorage.removeItem('currentuser');
    this.authService.currentUser = null;
    this.authService.decodedToken = null;
    this.alertify.message('Logged out');
    this.router.navigate(['/home']);
  }
}
