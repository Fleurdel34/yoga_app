import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';


import { SessionService } from './session.service';

describe('SessionService', () => {
  let service: SessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionService]
    });
    service = TestBed.inject(SessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //testing logIn method connecting to a mock session isLogged at true
  it('should log in a session', () => {
    const mockSessionInfo = { token: 'abcd1234', id: 1, type: 'admin', username: 'testUser', firstName: 'Test', lastName: 'User', admin: true };
    service.logIn(mockSessionInfo);
    expect(service.isLogged).toBe(true);
    expect(service.sessionInformation).toEqual(mockSessionInfo);
  });

 //testing logOut method setting session isLogged at false
  it('should log out a session', () => {
    service.logOut();
    expect(service.isLogged).toBe(false);
    expect(service.sessionInformation).toBeUndefined();
  });
});
