import { AppModule } from './../../app.module';
import { TestBed, fakeAsync, inject } from '@angular/core/testing';
import { AuthGuardService } from './auth-guard.service';
import { APP_BASE_HREF } from '@angular/common';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
    ],
    imports: [
      AppModule
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
