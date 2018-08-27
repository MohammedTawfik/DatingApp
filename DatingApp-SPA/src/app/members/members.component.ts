import { AlertifyService } from './../_services/alertify.service';
import { UserService } from './../_services/User.service';
import { Component, OnInit } from '@angular/core';
import { IUser } from '../_models/IUser';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  users: IUser[];

  constructor(private userService: UserService, private alertifyService: AlertifyService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe((users: IUser[]) => {
      this.users = users;
    }, error => {
      this.alertifyService.error(error);
    });
  }
}
