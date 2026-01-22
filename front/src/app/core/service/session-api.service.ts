import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Session } from '../models/session.interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SessionApiService {

  private pathService = environment.baseUrl;

  constructor(private httpClient: HttpClient) {
  }

  public all(): Observable<Session[]> {
    return this.httpClient.get<Session[]>(`${this.pathService}/session`);
  }

  public detail(id: string): Observable<Session> {
    return this.httpClient.get<Session>(`${this.pathService}/session/${id}`);
  }

  public delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.pathService}/session/${id}`);
  }

  public create(session: Session): Observable<Session> {
    return this.httpClient.post<Session>(`${this.pathService}/session`, session);
  }

  public update(id: string, session: Session): Observable<Session> {
    return this.httpClient.put<Session>(`${this.pathService}/session/${id}`, session);
  }

  public participate(id: string, userId: string): Observable<void> {
    return this.httpClient.post<void>(`${this.pathService}/session/${id}/participate/${userId}`, null);
  }

  public unParticipate(id: string, userId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.pathService}/session/${id}/participate/${userId}`);
  }

}
