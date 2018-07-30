import { User } from './../_models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  usermodel: User;

  constructor() {
    this.usermodel = new User();
   }

  ngOnInit() {
  }

  login() {
    console.log(this.usermodel.Username + this.usermodel.Password);
  }
}
