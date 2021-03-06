import { AuthService } from './../../services/auth-service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor( private auth: AuthService ) {}

  login() {
    this.auth.login();
  }

  ngOnInit() {}

}
