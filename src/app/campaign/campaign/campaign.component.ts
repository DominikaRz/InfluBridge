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
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css',
  '../../../assets/uikit/css/uikit.css',
  '../../../assets/uikit/css/uikit-rtl.css']
})
export class CampaignComponent {
  /*name!: string;
  dueDate!: string;
  prize!: string;
  shortDescription!: string;
  description!: string;
  image!: string;
  tags!: [];
  labelButton!: string;*/
  
  labelButton = 'Join Campaign'
  image = 'c34a8b8f-6b56-4686-b422-c199081a5b0d.jpg'

  id!: number;
  url!: string;

  isJoined: boolean = false;
  idI = 2;
   
  campaign: Campaign = {} as Campaign;
  brand: Brand = {} as Brand;

  currentDate!: string;

  constructor(private apiService: ApiServiceService, private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    this.currentDate = formattedDate;
    
    this.route.params.subscribe(params=>{
      this.id = params['id'];
      this.url = '/api/v1/campaign/view/' + this.id;
    });
    this.http.get<any>(this.url).subscribe(
      (data) => {  
        this.campaign = data.data.campaignView;
        this.brand = data.data.campaignView.brand;

        // Check if idI is in influencerIds array
        this.isJoined = this.campaign.influencerIds.includes(this.idI);

        if (this.isJoined) {
          // Execute your logic if idI is present in influencerIds
          this.labelButton = 'Quit Campaign'
        }
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
