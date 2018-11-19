import { UserService } from './../../services/user-service/user.service';
import { AuthService } from './../../services/auth-service/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user-model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  currentUser: User;
  changedImage: string;
  changedUsername: string;
  showImageErrorMessage = false;
  showUsernameErrorMessage = false;
  showUsernameTakenError = false;

  constructor( private authService: AuthService, private userService: UserService ) { }

  ngOnInit() {
    this.authService.getAppUser$().subscribe( user => {
      this.currentUser = user;
      this.changedImage = user.image;
      this.changedUsername = user.username;
    });
  }

  invalidUsername() {
    if ( this.changedUsername && this.changedUsername.length > 30 ) {
      this.showUsernameErrorMessage = true;
      return true;
    } else {
      this.showUsernameErrorMessage = false;
      return false;
    }
  }

  invalidImageUrl(): boolean {
    if (this.changedImage && (this.changedImage === '' ||  this.changedImage.match(/\.(jpeg|jpg|gif|png)$/) == null)) {
      this.showImageErrorMessage = true;
      return true;
    }
    return false;
  }

  isFormValid() {
    if ( !this.invalidImageUrl() && !this.invalidUsername()) {
      return true;
    }
    return false;
  }

  isUsernameTaken(): Observable<boolean> {
    return this.userService.checkUsernameExists(this.changedUsername).pipe(
      map( result => result )
    );
  }

  savaData( data ) {
    this.authService.getAppUser$().subscribe( user => {
      this.userService.updateData( user.id, data);
    });
  }

  submit() {
    if ( this.changedUsername !== this.currentUser.username ) {
      this.isUsernameTaken().subscribe( usernameExist => {
        if (usernameExist) {
          this.showUsernameTakenError = true;
        } else {
          this.showUsernameTakenError = false;
          const newData = { username: this.changedUsername, image: this.changedImage };
          this.savaData( newData );
          return;
        }
      });
    } else {
      const newData = { username: this.changedUsername, image: this.changedImage };
      this.savaData( newData );
      return;
    }
  }
}
