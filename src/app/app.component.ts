import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './services/auth-service/auth.service';
import { Component } from '@angular/core';
import { UserService } from './services/user-service/user.service';

import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chattermost';

  constructor( private userService: UserService, private auth: AuthService, router: Router, private db: AngularFireDatabase ) {

    this.auth.user$.subscribe( user => {
      if ( !user ) { return; }

      this.checkUser( user.uid ).subscribe( userExists => {
        if ( !userExists ) {
          this.userService.save( user );
        }
      });

      const returnUrl = localStorage.getItem( 'returnUrl' );
      if ( returnUrl ) {
        localStorage.removeItem('returnUrl');
        router.navigateByUrl( returnUrl );
      }
    });
  }

  checkUser( uid: string ): Observable<boolean> {
    return this.db.list('users').snapshotChanges().pipe(
      map( users => {
        let exists = false;
        users.forEach( user => {
          if ( user.key === uid ) {
            exists = true;
          }
        });
        return exists;
      })
    );
  }
}
