import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientPayload } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private securityUrl = 'http://localhost:3001';
  private clientsUrl = 'http://localhost:3002';

  constructor(private http: HttpClient) {}

  generateToken(): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.securityUrl}/generate-token`, {});
  }

  registerClient(data: ClientPayload): Observable<any> {
    return this.http.post(`${this.clientsUrl}/register-client`, data);
  }
}