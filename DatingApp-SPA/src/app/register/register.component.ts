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

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.userModel).subscribe(
      () => {console.log('registration successeded'); },
      error => {console.log(error); });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
