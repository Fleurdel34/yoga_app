import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule, } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { DetailComponent } from './detail.component';
import { SessionService } from 'src/app/core/service/session.service';
import { SessionApiService } from 'src/app/core/service/session-api.service';
import { of } from 'rxjs';
import { TeacherService } from 'src/app/core/service/teacher.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';



describe('DetailComponent', () => {

  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let sessionService: SessionService;
  let service: SessionApiService;
  let teacherService: TeacherService;


  const session={
    id: 1,
    name: 'Test Session',
    description: 'This is a test session',
    date: new Date(),
    teacher_id: 1,
    users: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const teacher={
    id:1,
    lastName:'Dion',
    firstName:'Celine',
    createdAt: new Date(),
    updatedAt: new Date()
  }

  const mockSessionService = {
    sessionInformation: {
      id: 1,
      admin: true,
    }
  };

  const mockSessionApiService = {
    detail: jest.fn().mockReturnValue(of(session)),
    delete: jest.fn().mockReturnValue(of(null)),
  }

  const mockTeacherService = {
    detail: jest.fn().mockReturnValue(of(teacher)),
  };

  const mockSnackBar = {
    open: jest.fn(),
  };

  const mockRouter = {  
    navigate: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        DetailComponent
      ],
      providers: [{ provide: SessionService, useValue: mockSessionService }, 
        { provide: SessionApiService, useValue: mockSessionApiService },
        { provide: TeacherService, useValue: mockTeacherService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } }],
    })
      .overrideProvider(MatSnackBar, { useValue: mockSnackBar })
      .compileComponents();

      sessionService= TestBed.inject(SessionService);
      fixture = TestBed.createComponent(DetailComponent);
      component = fixture.componentInstance;
      service = TestBed.inject(SessionApiService);
      teacherService = TestBed.inject(TeacherService);
      fixture.detectChanges();
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('should have information session', () => {
    expect(mockSessionApiService.detail).toHaveBeenCalledWith("1");
    expect(component.session).toEqual(session);
    expect(mockTeacherService.detail).toHaveBeenCalledWith(session.teacher_id.toString());
    expect(component.teacher).toEqual(teacher);
  });


  it('should have delete session', () => { 
    component.delete(); 
    expect(mockSessionApiService.delete).toHaveBeenCalledWith(session.id.toString());
    expect(mockSnackBar.open).toHaveBeenCalledWith('Session deleted !', 'Close', { duration: 3000 })
    expect(mockRouter.navigate).toHaveBeenCalledWith(['sessions']);
  });

});




