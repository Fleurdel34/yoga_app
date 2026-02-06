import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SessionApiService } from './session-api.service';
import { environment } from 'src/environments/environment';

describe('SessionsService', () => {
  let service: SessionApiService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SessionApiService]
    });
    http = TestBed.inject(HttpTestingController);
    service = TestBed.inject(SessionApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have to create a session', () => {
    const mockSession = {
    id: 1,
    name: 'Test Session',
    description: 'This is a test session',
    date: new Date(),
    teacher_id: 1,
    users: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    }
    service.create(mockSession).subscribe((response) => {
      expect(response).toEqual(mockSession);
      const req = http.expectOne(`${environment.baseUrl}/session`); 
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(mockSession);
      req.flush(mockSession);
    });
  });

  it('should have to update a session', () => {
    const mockSessionUpdate = {
    id: 1,
    name: 'Test Session Updated',
    description: 'This is an updated test session',
    date: new Date(),
    teacher_id: 1,
    users: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    }
    service.update(mockSessionUpdate.id.toString(), mockSessionUpdate).subscribe((response) => {
      expect(response).toEqual(mockSessionUpdate);
      const req = http.expectOne(`${environment.baseUrl}/session/${mockSessionUpdate.id}`); 
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(mockSessionUpdate);
      req.flush(mockSessionUpdate);  
    });
  });

  it('should have to delete a session', () => {
    const mockSession = {
    id: 1,
    name: 'Test Session',
    description: 'This is a test session',
    date: new Date(),
    teacher_id: 1,
    users: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    }
    service.delete(mockSession.id.toString()).subscribe((response) => {
      expect(response).toBeTruthy();
      const req = http.expectOne(`${environment.baseUrl}/session/${mockSession.id}`); 
      expect(req.request.method).toEqual('DELETE');
      req.flush({});
    });
  });

  it('should have to get a detail of a session', () => {
    const id = "1";
    const mockSession = {
    id: 1,
    name: 'Test Session',
    description: 'This is a test session',
    date: new Date(),
    teacher_id: 1,
    users: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    }
    service.detail(id).subscribe((response) => {
      expect(response).toEqual(mockSession);
      const req = http.expectOne(`${environment.baseUrl}/session/${id}`); 
      expect(req.request.method).toEqual('GET'); 
      req.flush(mockSession);
    });
  });

    it('should have to get all sessions', () => {
    const mockSession$ = [{
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
    }];

    service.all().subscribe((response) => {
      expect(response).toEqual(mockSession$);
      const req = http.expectOne(`${environment.baseUrl}/session`); 
      expect(req.request.method).toEqual('GET'); 
      req.flush(mockSession$);
    });
  });

  it('should have to participate a session', () => {
    const mockSession = {
    id: 1,
    name: 'Test Session',
    description: 'This is a test session',
    date: new Date(),
    teacher_id: 1,
    users: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    }

    const userId = "1"
    service.participate(mockSession.id.toString(),userId).subscribe((response) => {
      expect(response).toBeTruthy();
      const req = http.expectOne(`${environment.baseUrl}/session/${mockSession.id}participate/${userId}`); 
      expect(req.request.method).toEqual('POST');
      req.flush({});
    });
  });
})
