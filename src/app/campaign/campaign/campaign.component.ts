import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { ImgService } from '../../services/img.service';


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
  image!: string;

  id!: number;
  url!: string;

  isJoined: boolean = false;
  idI = 2;
   
  campaign: Campaign = {} as Campaign;
  brand: Brand = {} as Brand;

  //data: Data[] = brandData;

  currentDate!: string;

  constructor(private apiService: ApiServiceService, private http: HttpClient, private route: ActivatedRoute, private img: ImgService) {}

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

        this.image = this.img.getBrandBackgroundById(this.brand.id);
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

  
   //'c34a8b8f-6b56-4686-b422-c199081a5b0d.jpg'
  

  joinQuit() {
    const joinUrl = `/api/v1/campaign/join/${this.id}?influencerId=${this.idI}`;
    const leaveUrl = `/api/v1/campaign/leave/${this.id}?influencerId=${this.idI}`;

    if (this.isJoined) {
      // Send a PATCH request to the leaveUrl if already joined
      this.http.patch(leaveUrl, {}).subscribe(
        (response) => {
          // Handle successful leave response
          alert('Left campaign successfully');
          this.isJoined = false;
          this.labelButton = 'Join Campaign';
        },
        (error) => {
          // Handle error response
          console.log('Error leaving campaign:', error);
          alert('The error accured. For more information see console');
        }
      );
    } else {
      // Send a PATCH request to the joinUrl if not joined
      this.http.patch(joinUrl, {}).subscribe(
        (response) => {
          // Handle successful join response
          alert('You joined the campaign successfully!');
          this.isJoined = true;
          this.labelButton = 'Quit Campaign';
        },
        (error) => {
          // Handle error response
          console.log('Error joining campaign:', error);
          alert('The error accured. For more information see console');
        }
      );
    }
  }
  


}
