import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

;

import { ApiServiceService } from 'src/app/services/api-service.service';

interface Social {
  id: number;
  name: string;
  number: number;
}

interface Data {
  id: number;
  pseudonym: string;
  description: string;
  categories: Category[];
  platforms: Platform[];
  campaignsNumber: number;
}

interface Category {
  id: number;
  name: string;
}

interface Platform {
  id: number;
  platformName: string;
  username: string;
  views: number;
}

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css', '../../../assets/uikit/css/uikit.css', '../../../assets/uikit/css/uikit-rtl.css']
})
export class ViewComponent {
  nick = 'Julia Rows';
  avatar = '4e25ab7c-a222-4db6-8e8d-6b96bcaef5071.jpg';
  campaignsNo = 10;

  totalNumber!: number;
  roundedNumber!: string;
  

  //id = 3;
  id!: number;
  url!: string;

  data: Data = {} as Data;
  platforms: Platform[] = [];
  categories: Category[] = [];

  constructor(private apiService: ApiServiceService, private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.id = params['id'];
    });
    
    this.url = '/api/v1/influencer/view/' + this.id;
    this.http.get<any>(this.url).subscribe(
      (response) => {
        const data = response.data.influencerView;
        this.data = {
          id: data.id,
          pseudonym: data.pseudonym,
          description: data.description,
          categories: data.categories.map((category: any) => category.name),
          platforms: data.platform.map((platform: any) => platform.platformName),
          campaignsNumber: data.campaignsNumber
        };
        this.categories = data.categories;
        this.platforms = data.platform;
        this.calculateTotalNumber();
        this.roundNumber();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  calculateTotalNumber() {
    this.totalNumber = 0; // Initialize to 0
    this.totalNumber = this.platforms.reduce((sum, platform) => sum + platform.views, 0);
  }
  
  roundNumber() {
    if (this.totalNumber >= 1000000) {
      this.roundedNumber =
        'over ' +
        (this.totalNumber / 1000000).toLocaleString(undefined, { maximumFractionDigits: 1 }) +
        ' million followers';
    } else if (this.totalNumber >= 1000) {
      this.roundedNumber =
        (this.totalNumber / 1000).toLocaleString(undefined, { maximumFractionDigits: 1 }) + ' thousand followers';
    } else {
      this.roundedNumber = this.totalNumber.toLocaleString();
    }
  }
  
}
