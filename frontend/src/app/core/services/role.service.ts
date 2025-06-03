import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Role {
  _id: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = `${environment.apiUrl}/roles`;

  constructor(private http: HttpClient) {}

  getAllRoles(): Observable<{ success: boolean; data: Role[] }> {
    return this.http.get<{ success: boolean; data: Role[] }>(this.apiUrl);
  }

  createRole(role: { role: string }): Observable<{ success: boolean; data: Role }> {
    return this.http.post<{ success: boolean; data: Role }>(this.apiUrl, role);
  }

  updateRole(id: string, role: { role: string }): Observable<{ success: boolean; data: Role }> {
    return this.http.put<{ success: boolean; data: Role }>(`${this.apiUrl}/${id}`, role);
  }

  deleteRole(id: string): Observable<{ success: boolean; data: Role }> {
    return this.http.delete<{ success: boolean; data: Role }>(`${this.apiUrl}/${id}`);
  }
} 