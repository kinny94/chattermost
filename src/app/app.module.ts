import { UserService } from './services/user-service/user.service';
import { AuthService } from './services/auth-service/auth.service';
import { AuthGuardService } from './services/auth-guard-service/auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { environment } from './../environments/environment';
import { RouterModule } from '@angular/router';

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

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    LoginComponent,
    HomeComponent,
    LogoutComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    RouterModule,
    AngularFireModule.initializeApp( environment.firebase ),
    RouterModule.forRoot([
      {
        path: '', component: AppComponent
      }
    ])
  ],
  providers: [
    AuthGuardService,
    AuthService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
