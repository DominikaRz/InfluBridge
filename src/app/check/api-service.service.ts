import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor(private http: HttpClient) {}

  get(url: string) {
    return this.http.get<any>(url);
  }
  

  getData(url: string) {
    return this.http.get<any>(url).pipe(
      map(response => response.data), // Extract the 'data' property
    );
  }
}
