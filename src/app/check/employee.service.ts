import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = '/api/v1/employees'; // Assuming this is the correct API endpoint

  constructor(private http: HttpClient) {}

  getEmployees() {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.data), // Extract the 'data' property
    );
  }
}
