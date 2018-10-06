import { User } from './../_models/user';
import { PaginatedResult } from './../_models/PaginatedResult';
import { Paginationinfo } from './../_models/PaginationInfo';
import { Router, ActivatedRoute } from '@angular/router';
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
  pagination: Paginationinfo;
  currentUser: IUser = JSON.parse(localStorage.getItem('currentUser'));
  userFilterParams: any = {};
  gendersList = [{value: 'male' , display: 'Males'}, {value: 'female' , display: 'Females'}];

  constructor(
    private userService: UserService,
    private alertifyService: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(usersData => {
      this.users = usersData['users'].result;
      this.pagination = usersData['users'].paginationInfo;
    });

    this.userFilterParams.gender = this.currentUser.gender === 'male' ? 'female' : 'male' ;
    this.userFilterParams.minAge = 18;
    this.userFilterParams.maxAge = 99;
    this.userFilterParams.orderBy = 'lastActive';
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userFilterParams)
    .subscribe((result: PaginatedResult<IUser[]>) => {
      this.users = result.result;
      this.pagination = result.paginationInfo;
    }, error => {
      this.alertifyService.error(error);
    });
  }

  resetFilters() {
    this.userFilterParams.gender = this.currentUser.gender === 'male' ? 'female' : 'male' ;
    this.userFilterParams.minAge = 18;
    this.userFilterParams.maxAge = 99;
    this.userFilterParams.orderBy = 'lastActive';
    this.getUsers();
  }
}
