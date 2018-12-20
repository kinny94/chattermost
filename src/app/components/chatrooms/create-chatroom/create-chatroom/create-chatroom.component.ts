import { User } from 'src/app/models/user-model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {User} from './../../../../models/user-model';
import { UserService } from 'src/app/services/user-service/user.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { AngularFireList } from 'angularfire2/database';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-create-chatroom',
  templateUrl: './create-chatroom.component.html',
  styleUrls: ['./create-chatroom.component.scss']
})
export class CreateChatroomComponent implements OnInit {


  constructor(private userService: UserService, private authService: AuthService) { }


  chatroom_users: User[] = [];
  moderators: User[] = [];
  allUsers$: Observable<User[]>;
  currentUser: User;
  moderatorError = false;
  userError = false;

  ngOnInit() {

    // Getting current user and adding default user
    this.authService.getAppUser$().subscribe(user => {
      this.currentUser = user;
      this.chatroom_users.push(user);
      this.moderators.push(this.currentUser);
    });

    // Getting all users
    this.allUsers$ = this.userService.getAllUsers().valueChanges();

    // Removing default user from all users
    this.allUsers$ = this.allUsers$.pipe(
      map(users => users.filter(filteredUsers => filteredUsers.username !== this.currentUser.username)
    ));

  }

  onUserAdded(user) {
    this.allUsers$.pipe(
      map(users => {
        return users.filter((filteredUser) => filteredUser.username === user.username)[0];
      })
    ).subscribe((currentUser) => this.chatroom_users.push(currentUser));

    this.allUsers$ = this.allUsers$.pipe(
      map(users => {
        return users.filter((filterdUser) => filterdUser.username !== user.username);
      })
    );
  }

  onModeratorAdded(user) {
    if (!this.moderators.includes(user)) {
      this.moderators.push(user);
    }
  }

  removeModerator(user) {
    if (user === this.currentUser) {
      this.moderatorError = true;
    } else {
      this.moderatorError = false;
    }
  }

  removeUser(user) {
    if (user === this.currentUser) {
      this.userError = true;
    } else {
      this.userError = false;
    }
  }

  createChatroom() {

  }
}
