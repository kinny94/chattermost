import { UserService } from './../../services/user-service/user.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from './../../services/auth-service/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user-model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  currentUser$: Observable<User>;
  changedImage = '';
  changedUsername = '';
  showErrorMessage = false;

  constructor( private authService: AuthService, private userService: UserService ) { }

  ngOnInit() {
    this.currentUser$ = this.authService.getAppUser$().pipe(
      map( user => user )
    );
  }

  checkImageUrl( url: string ) {
    if ( this.changedImage !== '' ) {
      return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    }
    return false;
  }

  saveData( imageUrl ) {
    if ( this.checkImageUrl( imageUrl ) || this.changedUsername !== '' ) {
      this.showErrorMessage = false;
      this.authService.getAppUser$().subscribe( user => {
        const newData = { username: this.changedUsername, image: this.changedImage };
        this.userService.updateData( user.id, newData);
      });
    } else {
      this.showErrorMessage = true;
    }
  }
}
