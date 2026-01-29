import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SessionService } from 'src/app/core/service/session.service';

import { MeComponent } from './me.component';
import { environment } from 'src/environments/environment';


describe('MeComponent', () => {
  let component: MeComponent;
  let fixture: ComponentFixture<MeComponent>;
  let httpMock: HttpTestingController;

  const mockSessionService = {
    sessionInformation: {
      admin: true,
      id: 1
    }
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports: [
        MatSnackBarModule,
        HttpClientTestingModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MeComponent
      ],
      providers: [{ provide: SessionService, useValue: mockSessionService }],
    }).compileComponents();
    
    fixture = TestBed.createComponent(MeComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


   //testing with mock backend call to get user information
  it('should have information user after call backend', () => {
    fixture.detectChanges();
    const req = httpMock.expectOne(`${environment.baseUrl}/user/1`);
    expect(req.request.method).toBe('GET');
    req.flush({
      id: 1,
      username: 'testuser',
      lastName: 'Test',
      firstName: 'User',
      email: 'testuser@example.com'});
    
    fixture.detectChanges();
    
    const element= fixture.nativeElement;
    const ps = element.querySelectorAll('p');
    expect(ps[0].textContent).toContain('User TEST');
    expect(ps[1].textContent).toContain('testuser@example.com');
    httpMock.verify();
  });

});
