import { UserService } from './services/user-service/user.service';
import { AuthService } from './services/auth-service/auth.service';
import { AuthGuardService } from './services/auth-guard-service/auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { environment } from './../environments/environment';
import { RouterModule } from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';

import {AppComponent} from './app.component';
import {MaterialModule} from './material.module';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { LoginComponent } from './components/login/login.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { HomeComponent } from './components/home/home.component';
import { LogoutComponent } from './components/logout/logout.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './components/chat/chat/chat.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FlexLayoutModule,
    FormsModule,
    AngularFireModule.initializeApp( environment.firebase ),
    RouterModule.forRoot([
      { path: 'edit-profile', component:  EditProfileComponent, canActivate: [ AuthGuardService ]},
      { path: 'all-users', component: AllUsersComponent },
      { path: '', component: HomeComponent }
    ])
  ],
  declarations: [
    AppComponent,
    SidenavComponent,
    LoginComponent,
    HomeComponent,
    LogoutComponent,
    LandingPageComponent,
    AllUsersComponent,
    EditProfileComponent,
    ChatComponent
  ],
  providers: [
    AuthGuardService,
    AuthService,
    UserService
  ],
  bootstrap : [AppComponent]
})
export class AppModule { }
