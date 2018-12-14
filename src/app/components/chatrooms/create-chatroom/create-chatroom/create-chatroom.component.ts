import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {User} from './../../../../models/user-model'
import { UserService } from 'src/app/services/user-service/user.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-create-chatroom',
  templateUrl: './create-chatroom.component.html',
  styleUrls: ['./create-chatroom.component.scss']
})
export class CreateChatroomComponent implements OnInit {

  chatroom_users$: Observable<User[]>
  moderators$: Observable<User[]>
  datasoure$: AngularFireList<User>
  currentUser: User;


  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.authService.getAppUser$().subscribe(user => this.currentUser = user)
    this.datasoure$ = this.userService.getAllUsers();
    this.moderators$.pipe(
      map(users => users.push(this.currentUser))
    )
    this.chatroom_users$.pipe(
      map(users => users.push(this.currentUser))
    )


    this.chatroom_users$.subscribe(console.log);
    // this.chatroom_users$.push(this.currentUser);
    this.datasoure$.valueChanges().subscribe(console.log);
  }

}
