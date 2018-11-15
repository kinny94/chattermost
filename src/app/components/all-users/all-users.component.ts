import { AuthService } from './../../services/auth-service/auth.service';
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
  filterUsers$: Observable<User[]>;
  user$: Observable<firebase.User>;
  searchText = '';

  constructor( private userService: UserService, private authService: AuthService ) { }

  ngOnInit() {
      this.user$ = this.authService.user$;
      this.allUsers$ = this.userService.getAllUsers().valueChanges().pipe(
    );
  }

  filterUser() {
    this.allUsers$ = this.allUsers$.pipe(
      map( users => users.filter( user => user.username.includes( this.searchText)))
    );
  }
}
