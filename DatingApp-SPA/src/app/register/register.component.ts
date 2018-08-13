import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/Auth.service';
import { User } from './../_models/user';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userModel: User = new User();
  @Output() cancelRegister = new EventEmitter();

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.userModel).subscribe(
      () => {this.alertify.success('registration successeded'); },
      error => {this.alertify.error(error); });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
