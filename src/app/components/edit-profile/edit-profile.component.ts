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

  /*
    check if the user name is valid
  */
  invalidUsername() {
    if ( this.changedUsername && this.changedUsername.length > 30 ) {
      this.showUsernameErrorMessage = true;
      return true;
    } else {
      this.showUsernameErrorMessage = false;
      return false;
    }
  }

  /*
    check if the image url is valid or not
  */
  invalidImageUrl(): boolean {
    if (this.changedImage && (this.changedImage === '' ||  this.changedImage.match(/\.(jpeg|jpg|gif|png)$/) == null)) {
      this.showImageErrorMessage = true;
      return true;
    }
    return false;
  }

  isFormValid() {
    if (!this.invalidImageUrl() && !this.invalidUsername()) {
      return true;
    }
    return false;
  }

  /*
    check if username is already taken
  */
  isUsernameTaken(): Observable<boolean> {
    if (this.changedUsername !== this.currentUser.username) {
      return this.userService.checkUsernameExists(this.changedUsername).pipe(
        map( result => result )
      );
    } else {
      this.showUsernameTakenError = false;
    }
  }

  submit() {
    this.isUsernameTaken().subscribe((userNameExists) => {
      if (userNameExists) {
        this.showUsernameTakenError = true;
        return;
      } else {
        this.showUsernameTakenError = false;
        const newData = { username: this.changedUsername, image: this.changedImage };
        this.userService.updateData(this.currentUser.id, newData);
        return;
      }
    });
  }
}
