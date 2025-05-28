import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  
  registerService(userData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/register`, userData);
  }

  loginService(credentials: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/login`, credentials);
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/user/${userId}`);
  }
}
