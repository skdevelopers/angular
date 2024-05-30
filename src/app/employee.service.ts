// src/app/employee.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { User } from './user';  // Import the User interface

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8000/api/employees';

  constructor(private http: HttpClient, private authService: AuthService) {}

  createEmployee(employee: any): Observable<any> {
    return this.authService.getUser().pipe(
        switchMap((user: User) => {
          employee.created_by = user.id;
          return this.http.post(this.apiUrl, employee);
        })
    );
  }

  // Add other methods as needed
}
