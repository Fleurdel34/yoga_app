import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { UserService } from './user.service';
import { environment } from 'src/environments/environment.prod';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('UserService', () => {
  let service: UserService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should have to get a user', () => {
      const id = "1";
      const mockUser = {
      id: 1,
      email: "test@example.com",
      lastName: "Test",
      firstName: "User",
      admin: false,
      password: "password123",
      createdAt: new Date(),
      updatedAt: new Date(),
      }
      service.getById(id).subscribe((response) => {
      expect(response).toEqual(mockUser);
  
      const req = http.expectOne(`${environment.baseUrl}/user/${id}`); 
      expect(req.request.method).toEqual('GET'); 
      req.flush(mockUser);
      });
    });

    it('should have to delete a user', () => {
    const mockUser = {
      id: 1,
      email: "test@example.com",
      lastName: "Test",
      firstName: "User",
      admin: false,
      password: "password123",
      createdAt: new Date(),
      updatedAt: new Date(),}
  
      service.delete(mockUser.id.toString()).subscribe((response) => {
        expect(response).toBeTruthy();
      });
      const req = http.expectOne(`${environment.baseUrl}/user/${mockUser.id}`); 
      expect(req.request.method).toEqual('DELETE');
      req.flush({});
    });

});
