import { AppModule } from './../../app.module';
import { APP_BASE_HREF } from '@angular/common';
import { AuthService } from './../../services/auth-service/auth.service';
import { async, TestBed } from '@angular/core/testing';
import { EditProfileComponent } from './edit-profile.component';


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
    const fixture = TestBed.createComponent(EditProfileComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
