import { AuthService } from './../_services/Auth.service';
import { Component, OnInit } from '@angular/core';
import { IUser } from '../_models/IUser';
import { Paginationinfo } from '../_models/PaginationInfo';
import { UserService } from '../_services/User.service';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { PaginatedResult } from '../_models/PaginatedResult';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  users: IUser[];
  pagination: Paginationinfo;
  currentUser: IUser = JSON.parse(localStorage.getItem('currentUser'));
  likerParam = 'liker';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertifyService: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(usersData => {
      this.users = usersData['friends'].result;
      this.pagination = usersData['friends'].paginationInfo;
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.likerParam)
    .subscribe((result: PaginatedResult<IUser[]>) => {
      this.users = result.result;
      this.pagination = result.paginationInfo;
    }, error => {
      this.alertifyService.error(error);
    });
  }

}
