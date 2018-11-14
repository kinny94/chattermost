import { User } from './../../models/user-model';
import { UserService } from './../user-service/user.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor( private userService: UserService, private afAuth: AngularFireAuth, private route: ActivatedRoute  ) {
    this.user$ = afAuth.authState;
  }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get( 'returnUrl' ) || '/';
    localStorage.setItem( 'returnUrl', returnUrl );
    this.afAuth.auth.signInWithRedirect( new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    console.log('signing out!');
    this.afAuth.auth.signOut();
  }

  getAppUser$(): Observable<User> {
    return this.user$.pipe(
      switchMap( user => {
        if ( user ) {
          return this.userService.getId( user.uid ).valueChanges();
        }
        return null;
      })
    );
  }
}
