import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiServiceService } from '../../services/api-service.service';
interface Campaign {
  id: number;
  brandName: string;
  title: string;
  startDate: string;
  endDate: string;
}

@Component({
  selector: 'app-history-i',
  templateUrl: './history-i.component.html',
  styleUrls: ['./history-i.component.css',
  '../../../assets/uikit/css/uikit.css',
  '../../../assets/uikit/css/uikit-rtl.css', ]
})
export class HistoryIComponent {

  id = 5;
  url = '/api/v1/campaign/influencer/' + this.id;
   
  campaigns: Campaign[] = [];

  constructor(private apiService: ApiServiceService, private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>(this.url).subscribe(
      (data) => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
  
        this.campaigns = data.data.influencerCampaignsList.filter((campaign: Campaign) => campaign.endDate < formattedDate);
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
