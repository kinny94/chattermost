import { HomeComponent } from './home.component';
import { AppModule } from './../../app.module';
import { APP_BASE_HREF } from '@angular/common';
import { AuthService } from './../../services/auth-service/auth.service';
import { async, TestBed } from '@angular/core/testing';


describe('SidenavComponent', () => {

  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => ({ matches: true }))
    });
  });

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
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
