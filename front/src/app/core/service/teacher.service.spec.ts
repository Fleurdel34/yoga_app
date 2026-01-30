import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { TeacherService } from './teacher.service';
import { environment } from 'src/environments/environment.prod';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('TeacherService', () => {
  let service: TeacherService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      providers: [TeacherService]
    });
    service = TestBed.inject(TeacherService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have to get a teacher', () => {
    const id = "1";
    const mockTeacher = {
      id: 1,
      lastName: "Doe",
      firstName: "John",
      createdAt: new Date(),
      updatedAt: new Date()
    }
    service.detail(id).subscribe((response) => {
    expect(response).toEqual(mockTeacher);
    
    const req = http.expectOne(`${environment.baseUrl}/teacher/${id}`); 
    expect(req.request.method).toEqual('GET'); 
    req.flush(mockTeacher);
    });
  });

  it('should have to get all teachers', () => {
      const mockTeachers$ = [{
      id: 1,
      lastName: "Doe",
      firstName: "John",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      lastName: "Smith",
      firstName: "Jane",
      createdAt: new Date(),
      updatedAt: new Date()
    }];
  
    service.all().subscribe((response) => {
      expect(response).toEqual(mockTeachers$);
    });
    const req = http.expectOne(`${environment.baseUrl}/teacher`); 
    expect(req.request.method).toEqual('GET'); 
    req.flush(mockTeachers$);
  });
  

});
