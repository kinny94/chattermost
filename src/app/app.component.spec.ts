import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from './../environments/environment';
import { UserService } from 'src/app/services/user-service/user.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { MaterialModule } from './material.module';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AuthService } from './services/auth-service/auth.service';
import { AuthGuardService } from './services/auth-guard-service/auth-guard.service';
import { AngularFireModule } from 'angularfire2';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModule,
        BrowserAnimationsModule,
        BrowserModule,
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp( environment.firebase ),
        AngularFireAuthModule,
      ],
      declarations: [
        AppComponent,
        SidenavComponent,
        LoginComponent,
        HomeComponent
      ],
      providers: [
        UserService,
        AuthService,
        AuthGuardService
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'chattermost'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('chattermost');
  });
});
