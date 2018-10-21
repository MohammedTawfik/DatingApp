import { AlertifyService } from './../_services/alertify.service';
import { UserService } from './../_services/User.service';
import { AuthService } from './../_services/Auth.service';
import { IUser } from './../_models/IUser';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() user: IUser;
  constructor(private authService: AuthService, private userService: UserService, private alertify: AlertifyService) {}

  ngOnInit() {}

  sendLike(recipintId: number) {
    this.userService.sendLike(this.authService.decodedToken.nameid, recipintId).subscribe(
      data => {
        this.alertify.success('you have liked: ' + this.user.knownAs);
      },
      error => {
        this.alertify.error(error);
      }
    );
  }
}
