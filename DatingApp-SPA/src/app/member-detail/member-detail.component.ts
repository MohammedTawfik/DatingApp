import { AlertifyService } from './../_services/alertify.service';
import { UserService } from './../_services/User.service';
import { IUser } from './../_models/IUser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: IUser;
  constructor(
    private userService: UserService,
    private alertifyService: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(userData => {
      this.user = userData['user'];
    });
  }

  // loadUser() {
  //   this.userService.getUser(+this.route.snapshot.params['id']).subscribe(
  //     (user: IUser) => {
  //       this.user = user;
  //     },
  //     error => {
  //       this.alertifyService.error(error);
  //     }
  //   );
  // }
}
