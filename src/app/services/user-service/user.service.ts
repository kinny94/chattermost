import { User } from './../../models/user-model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase';
import * as uniquerNames from 'unique-names-generator';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private db: AngularFireDatabase ) { }

  objectReference: AngularFireObject<any>;

  save( user: firebase.User ) {
    this.db.object('/users/' + user.uid ).update({
      email: user.email,
      name: user.displayName,
      username: uniquerNames.generate('-'),
      member_since: Date.now()
    });
  }

  getId( uid ): AngularFireObject<User> {
    return this.db.object('/users/' + uid );
  }
}
