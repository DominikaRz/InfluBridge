import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginResponse {
  timestamp: string;
  status: number;
  message: string;
  data: {
    influencerPseudonym?: string;
    influencerId?: number;
    brandId?: number;
    brandName?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {}

  sendData(data: any, url: string): Observable<any>  {
    return this.http.post(url, data);
  }

  pachData(data: any, url: string) {
    return this.http.patch(url, data);
  }

  private baseUrl = 'http://localhost:8080/api/v1';

  login(username: string, password: string): Observable<LoginResponse> {
    const influencerLoginUrl = `${this.baseUrl}/influencer/login`;
    const brandLoginUrl = `${this.baseUrl}/brand/login`;
    
    const influencerBody = { pseudonym: username, password };
    const brandBody = { name: username, password };
    
    return new Observable<LoginResponse>((observer) => {
      this.http.post<LoginResponse>(influencerLoginUrl, influencerBody).subscribe(
        (response) => {
          observer.next(response);
          observer.complete();
        },
        () => {
          this.http.post<LoginResponse>(brandLoginUrl, brandBody).subscribe(
            (response) => {
              observer.next(response);
              observer.complete();
            },
            (error) => {
              observer.error(error);
            }
          );
        }
      );
    });
  }
}
