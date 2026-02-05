import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { expect } from '@jest/globals';
import { Router } from '@angular/router';
import { RegisterComponent } from './register.component';
import { AuthService } from 'src/app/core/service/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from 'src/app/shared/material.module';
import { of, throwError } from 'rxjs';


describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;

  const mockAuthService = {
    register:jest.fn().mockReturnValue(of({})),
  }

  const mockRouter = {  
    navigate: jest.fn(),
  };

  const mockRegisterRequest={
    email: 'test@test.com',
    firstName: 'Jane',
    lastName: 'Doe',
    password: 'test1234!'
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,  
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MaterialModule,
        RegisterComponent
      ],
      providers: [{ provide: AuthService, useValue: mockAuthService },
      { provide: Router, useValue: mockRouter }
      ],
      
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    authService = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register successfully', () => {
    component.form.setValue({
      email: mockRegisterRequest.email,
      firstName: mockRegisterRequest.firstName,
      lastName: mockRegisterRequest.lastName,
      password: mockRegisterRequest.password,
    });
    component.submit();
    expect(mockAuthService.register).toHaveBeenCalledWith(mockRegisterRequest);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });


  it('should register not successfully form invalid', () => {
    component.form.setValue({
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    });
    component.submit();
    expect(mockAuthService.register).not.toHaveBeenCalledWith();
  });

  it('should register error', () => {
    mockAuthService.register.mockReturnValue(throwError(()=> new Error('failed')));
    component.form.setValue(mockRegisterRequest);
    component.submit();
    expect(component.onError).toBeDefined;
  });
});
