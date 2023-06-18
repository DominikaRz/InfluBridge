import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiServiceService } from '../../services/api-service.service';

interface Brand{
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-settings-b',
  templateUrl: './settings-b.component.html',
  styleUrls: ['./settings-b.component.css', 
  '../../../assets/uikit/css/uikit.css', 
  '../../../assets/uikit/css/uikit-rtl.css']
})
export class SettingsBComponent {
  nick = 'Beauty by Grace';
  avatar = 'c34a8b8f-6b56-4686-b422-c199081a5b0d1.jpg';

  totalNumber!: number;
  roundedNumber!: string;
  description = "'Beauty by Grace' is a renowned brand dedicated to enhancing your natural beauty and providing top-quality beauty products. Our mission is to empower individuals to embrace their unique features and radiate confidence. With a wide range of skincare, makeup, and beauty essentials, we strive to offer innovative solutions that cater to various skin types and preferences. From luxurious serums to vibrant eyeshadow palettes, our products are carefully curated to bring out your inner glow. Experience the transformative power of 'Beauty by Grace' and unlock your true beauty potential.";


  id = 1;
  url = '/api/v1/brand/settings/' + this.id;

  constructor(private apiService: ApiServiceService, private http: HttpClient) {}

  brand: Brand = {} as Brand;

  ngOnInit() {
    this.http.get<any>(this.url).subscribe(
      (data) => {
        this.brand = data.data.brandSettings;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }



  prevPass!: string;
  newPass!: string;
  onSubmit() {  
    console.log(this.prevPass);
    console.log(this.newPass);
  }


  image!: BinaryData;
  SubmitImage(){
    console.log(this.image);
  }

  newDesc= this.description;
  SubmitDescripion(){
    this.description = this.newDesc;
  }

  
}
