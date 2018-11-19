import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user-model';
import { AuthService } from './../auth-service/auth.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
import * as uniquerNames from 'unique-names-generator';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private db: AngularFireDatabase  ) { }

  objectReference: AngularFireObject<any>;

  save( user: firebase.User ) {
    this.db.object('/users/' + user.uid ).update({
      id: user.uid,
      email: user.email,
      name: user.displayName,
      username: uniquerNames.generate('-'),
      member_since: Date.now(),
      image: user.photoURL
    });
  }

  getId( uid ): AngularFireObject<User> {
    return this.db.object('/users/' + uid );
  }

  getAllUsers(): AngularFireList<User> {
    return this.db.list('/users');
  }

  updateData  (uid: string, data: {}) {
    this.db.object('/users/' + uid ).update( data );
  }

  checkUsernameExists( username ) {
    return this.db.list('/users').valueChanges().pipe(
      map(
        snapshots => {
          let exists = false;
          for ( const user of snapshots ) {
            if ( user['username'] === username ) {
              exists = true;
              break;
            }
          }
          return exists;
        }
      )
    );
  }
}
