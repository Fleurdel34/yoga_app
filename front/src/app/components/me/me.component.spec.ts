import { HttpClientTestingModule} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SessionService } from 'src/app/core/service/session.service';
import { Router } from '@angular/router';
import { MeComponent } from './me.component';
import { UserService } from 'src/app/core/service/user.service';
import { of } from 'rxjs';


describe('MeComponent', () => {
  let component: MeComponent;
  let fixture: ComponentFixture<MeComponent>;
  let userService:UserService

  const mockSessionService = {
    sessionInformation: {
      admin: true,
      id: 1
    },
    logOut: jest.fn(),
  }

  const mockUserService = {
    delete: jest.fn().mockReturnValue(of(null)),
    getById : jest.fn().mockReturnValue(of(mockSessionService.sessionInformation.id.toString())),
  }

  const mockSnackBar = {
    open: jest.fn(),
  };

  const mockRouter = {  
    navigate: jest.fn(),
  };


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
      providers: [{ provide: SessionService, useValue: mockSessionService },
      { provide: UserService, useValue: mockUserService },
      { provide: MatSnackBarModule, useValue: mockSnackBar },
      { provide: Router, useValue: mockRouter }
      ],
    })
    .overrideProvider(MatSnackBar, { useValue: mockSnackBar })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have information user after call backend', () => {
    const userId = mockSessionService.sessionInformation.id.toString();
    expect(mockUserService.getById).toHaveBeenCalledWith(userId);
    expect(component.user).toEqual(userId);
  });

  it('should have delete user', () => { 
    const userId = mockSessionService.sessionInformation.id;
    component.delete(); 
    expect(mockUserService.delete).toHaveBeenCalledWith(userId.toString());
    expect(mockSnackBar.open).toHaveBeenCalledWith("Your account has been deleted !", 'Close', { duration: 3000 })
    expect(mockSessionService.logOut).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

});
