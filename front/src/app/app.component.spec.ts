import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SessionService } from './core/service/session.service';


describe('AppComponent', () => {
let app: AppComponent;  
let service: SessionService;
let fixture: ComponentFixture<AppComponent>;
let router: Router;

const mockSessionService = {
  sessionInformation: {
    admin: true,
    id: 1
  },
  logOut: jest.fn(),
  $isLogged: jest.fn(() => false),
}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        MatToolbarModule,
        AppComponent],
        providers: [{ provide: SessionService, useValue: mockSessionService }
      ],
    }).compileComponents();
    service = TestBed.inject(SessionService);
    fixture = TestBed.createComponent(AppComponent);
    router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate');
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should log or not log at a session', () => {
    app.$isLogged();
    expect(service.$isLogged()).toBe(false);
  });


  it('should log out a session', () => {
    app.logout();
    expect(service.$isLogged()).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });
});
