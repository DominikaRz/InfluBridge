import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { ApiServiceService } from '../../services/api-service.service';
interface Campaign {
  id: number;
  title: string;
  rate: number;
  description: string;
  vacancies: number;
  startData: string;
  endData: string;
  categories: string[];
  platformTypes: string[];
  influencerIds: number[];
}

interface Brand{
  id: number;
  mail: string;
  name: string;
  nip: string;
  description: string;
}

@Component({
  selector: 'app-campaign-b',
  templateUrl: './campaign-b.component.html',
  styleUrls: ['./campaign-b.component.css',
  '../../../assets/uikit/css/uikit.css',
  '../../../assets/uikit/css/uikit-rtl.css']
})
export class CampaignBComponent {
  
  image = 'c34a8b8f-6b56-4686-b422-c199081a5b0d.jpg'

  id!: number;
  url!: string;

  isJoined: boolean = false;
  idI = 2;
   
  campaign: Campaign = {} as Campaign;
  brand: Brand = {} as Brand;


  constructor(private apiService: ApiServiceService, private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    
    this.route.params.subscribe(params=>{
      this.id = params['id'];
      this.url = '/api/v1/campaign/view/' + this.id;
    });
    this.http.get<any>(this.url).subscribe(
      (data) => {  
        this.campaign = data.data.campaignView;
        this.brand = data.data.campaignView.brand;

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

  


}

