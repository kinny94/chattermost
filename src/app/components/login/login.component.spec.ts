import { HomeComponent } from './../home/home.component';
import { MaterialModule } from './../../material.module';
import { AppComponent } from './../../app.component';
import { RouterModule } from '@angular/router';
import { AuthService } from './../../services/auth-service/auth.service';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AngularFireModule } from 'angularfire2';
import { SidenavComponent } from 'src/app/navigation/sidenav/sidenav.component';
import { APP_BASE_HREF } from '@angular/common';

describe('LoginComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent, AppComponent, SidenavComponent, HomeComponent ],
      imports: [
        AngularFireDatabaseModule,
        MaterialModule,
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
      ]
    })
    .compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
