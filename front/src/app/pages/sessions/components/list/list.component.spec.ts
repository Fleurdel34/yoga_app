import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { expect } from '@jest/globals';
import { SessionService } from 'src/app/core/service/session.service';
import { ListComponent } from './list.component';
import { of } from 'rxjs';
import { SessionApiService } from 'src/app/core/service/session-api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';


describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let sessionService: SessionService;
  let service: SessionApiService;

  const mockSessionService = {
    sessionInformation: {
      admin: true
    }
  }

  const sessions=[
    {
    id: 1,
    name: 'Test Session',
    description: 'This is a test session',
    date: new Date(),
    teacher_id: 1,
    users: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'Test Session 2',
    description: 'This is a second test session',
    date: new Date(),
    teacher_id: 1,
    users: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }
]

  const mockSessionApiService = {
    all: jest.fn().mockReturnValue(of(sessions)),
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatCardModule, MatIconModule, ListComponent, RouterTestingModule.withRoutes([])],
      providers: [{ provide: SessionService, useValue: mockSessionService },
        {provide: SessionApiService, useValue: mockSessionApiService},
        {provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => null } }, params: of({}) } }
      ]
  })
  .compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(SessionApiService);
    sessionService = TestBed.inject(SessionService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have information all sessions after call backend', (done) => {
    expect(mockSessionApiService.all).toHaveBeenCalled();
    component.sessions$.subscribe(value => {
      expect(value).toEqual(sessions);
      done();
    });
    expect(component.user?.admin === true).toEqual(mockSessionService.sessionInformation?.admin === true);
  });    
});
