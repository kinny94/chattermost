import { LoginComponent } from './login.component';
import { AppModule } from './../../app.module';
import { APP_BASE_HREF } from '@angular/common';
import { AuthService } from './../../services/auth-service/auth.service';
import { async, TestBed } from '@angular/core/testing';


describe('SidenavComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      providers: [
        AuthService,
        { provide: APP_BASE_HREF, useValue : '/' }
      ],
    })
    .compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
