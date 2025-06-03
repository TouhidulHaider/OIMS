import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  router = inject(Router);
  
  registerService(userData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/register`, userData);
  }

  loginService(credentials: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/login`, credentials).pipe(
      tap((response: any) => {
        if (response.success) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
      })
    );
  }

  logout(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.post(`${environment.apiUrl}/auth/logout`, {}, { headers }).pipe(
      tap(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      })
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getUserById(userId: string): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${environment.apiUrl}/user/${userId}`, { headers });
  }

  updateProfile(userId: string, userData: FormData): Observable<any> {
    const token = this.getToken();
    // Don't set Content-Type header when sending FormData
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${environment.apiUrl}/user/${userId}`, userData, { headers }).pipe(
      tap((response: any) => {
        if (response.success) {
          // Update local storage with new user data
          const currentUser = this.getUser();
          if (currentUser && currentUser._id === userId) {
            localStorage.setItem('user', JSON.stringify(response.data));
          }
        }
      })
    );
  }

  getAllUsers(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${environment.apiUrl}/user/all`, { headers });
  }

  sendEmail(emailData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/send-email`, emailData);
  }

  resetPassword(token: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/reset-password/${token}`, { password });
  }
}
