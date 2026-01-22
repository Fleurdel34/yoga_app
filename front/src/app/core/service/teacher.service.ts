import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from '../models/teacher.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private pathService = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  public all(): Observable<Teacher[]> {
    return this.httpClient.get<Teacher[]>(`${this.pathService}/teacher`);
  }

  public detail(id: string): Observable<Teacher> {
    return this.httpClient.get<Teacher>(`${this.pathService}/teacher/${id}`);
  }
}
