import { User } from './../../models/user-model';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/services/user-service/user.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {

  allUsers$: Observable<User[]>;

  constructor( private userService: UserService ) { }

  ngOnInit() {
    this.allUsers$ = this.userService.getAllUsers().valueChanges();
  }

}
