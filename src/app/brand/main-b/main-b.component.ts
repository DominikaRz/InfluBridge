import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import {Router} from "@angular/router";

import { ApiServiceService } from '../../services/api-service.service';
interface Campaign {
  id: number;
  title: string;
  vacancies: number;
  occupied: number;
  startDate: string;
  endDate: string;
}

import { PostService } from 'src/app/services/post.service';
interface Category{
  id: number;
  name: string;
}
interface Platforms{
  id: number;
  name: string;
}

@Component({
  selector: 'app-main-b',
  templateUrl: './main-b.component.html',
  styleUrls: ['./main-b.component.css',
  '../../../assets/uikit/css/uikit.css',
  '../../../assets/uikit/css/uikit-rtl.css', ]
})
export class MainBComponent { 
  
  id!: number;
  //id = 1;
   
  campaigns: Campaign[] = [];

  constructor(private apiService: ApiServiceService, private http: HttpClient) {}

  ngOnInit() {
    this.id = Number(this.getCookie('id'));
    let url = '/api/v1/campaign/brand/' + this.id;
    this.http.get<any>(url).subscribe(
      (data) => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
  
        this.campaigns = data.data.brandCampaignsList.filter((campaign: Campaign) => campaign.endDate >= formattedDate);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }  
  splitStringAtT(input: string): string {
    const index = input.indexOf('T');
    if (index !== -1) {
      return input.substring(0, index);
    }
    return input;  
  }
  getCookie(name: string): string | null {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split('=');
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  }
  

  //----------------------------------------
  
    

}
