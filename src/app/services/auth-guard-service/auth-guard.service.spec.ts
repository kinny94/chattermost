import { MaterialModule } from './../../material.module';
import { HomeComponent } from './../../components/home/home.component';
import { SidenavComponent } from './../../navigation/sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { environment } from './../../../environments/environment';
import { TestBed, fakeAsync, inject } from '@angular/core/testing';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthGuardService } from './auth-guard.service';
import { AppComponent } from 'src/app/app.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { APP_BASE_HREF } from '@angular/common';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
      AppComponent,
      SidenavComponent,
      HomeComponent,
      LoginComponent
    ],
    imports: [
      MaterialModule,
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
      AuthGuardService,
      { provide: APP_BASE_HREF, useValue : '/' }
    ]
  }));

  it('should be created', inject([AuthGuardService], (service: AuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
