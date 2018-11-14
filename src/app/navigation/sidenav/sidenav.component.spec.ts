import { APP_BASE_HREF } from '@angular/common';
import { AuthService } from './../../services/auth-service/auth.service';
import { AppComponent } from './../../app.component';
import { RouterModule } from '@angular/router';
import { environment } from './../../../environments/environment';
import { HomeComponent } from './../../components/home/home.component';
import { LoginComponent } from './../../components/login/login.component';
import { MaterialModule } from './../../material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SidenavComponent } from './sidenav.component';
import { MatIconModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

describe('SidenavComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MaterialModule,
        BrowserAnimationsModule,
        BrowserModule,
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp( environment.firebase ),
        AngularFireAuthModule,
        RouterModule.forRoot([
          {
            path: '', component: AppComponent
          }
        ])
      ],
      providers: [
        AuthService,
        { provide: APP_BASE_HREF, useValue : '/' }
      ],
      declarations: [
        SidenavComponent, LoginComponent, HomeComponent, AppComponent ],
    })
    .compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(SidenavComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
