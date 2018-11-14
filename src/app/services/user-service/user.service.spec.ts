import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { TestBed, fakeAsync, tick, inject } from '@angular/core/testing';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';

describe('UserService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp( environment.firebase ),
        AngularFireAuthModule
      ],
      providers: [
        UserService,
      ],
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

});
