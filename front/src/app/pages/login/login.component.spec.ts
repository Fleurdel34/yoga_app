import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { SessionService } from 'src/app/core/service/session.service';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/core/service/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let sessionService: SessionService;

  const mockLoginRequest = {
    email: 'test@example.com',
    password: 'password123'
  };

  const mockSessionService = {
    logIn: jest.fn(),
  };

  const mockSessionInformation = {
    token: 'mock-token',
    type: 'Bearer',
    id: 1,
    username: 'testuser',
    firstName: 'Test',
    lastName: 'User',
    admin: false
  }; 

  const mockAuthService = {
    login: jest.fn().mockReturnValue(of(mockSessionInformation)),
  };

  const mockRouter = {
    navigate: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: SessionService, useValue: mockSessionService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        LoginComponent]
    })
      .compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    authService = TestBed.inject(AuthService);
    sessionService = TestBed.inject(SessionService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login successfully', () => {
    component.form.setValue({
      email: mockLoginRequest.email,
      password: mockLoginRequest.password
    });
    component.submit();
    expect(mockAuthService.login).toHaveBeenCalledWith(mockLoginRequest);
    expect(mockSessionService.logIn).toHaveBeenCalledWith(mockSessionInformation);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/sessions']);
  });

  it('should register not successfully form invalid', () => {
      component.form.setValue({
        email: '',
        password: '',
      });
      component.submit();
      expect(mockAuthService.login).not.toHaveBeenCalledWith();
    });
  
    it('should register error', () => {
      mockAuthService.login.mockReturnValue(throwError(()=> new Error('failed')));
      component.form.setValue(mockLoginRequest);
      component.submit();
      expect(component.onError).toBeDefined;
    });

});
