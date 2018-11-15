import { UserService } from './../../services/user-service/user.service';
import { AuthService } from './../../services/auth-service/auth.service';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { Component, OnDestroy, ChangeDetectorRef, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { User } from 'src/app/models/user-model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnDestroy, OnInit {

  user$: Observable<firebase.User>;
  allUsers$: Observable<User[]>;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.user$ = this.authService.user$;
    this.allUsers$ = this.userService.getAllUsers().valueChanges();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
