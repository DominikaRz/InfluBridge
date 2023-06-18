import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiServiceService } from '../../services/api-service.service';

/*
interface Brands {  
  id: Number;  
  name: String;  
  brand: String;   
}*/

interface Influencer {
  id: number;
  email: string;
  pseudonym: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  description: string;
}

interface Categories{
  id: number;
  name: string;
}

interface Platforms {
  id: number;
  platformName: string;
  username: string;
  views: number;
}

@Component({
  selector: 'app-settings-i',
  templateUrl: './settings-i.component.html',
  styleUrls: ['./settings-i.component.css', '../../../assets/uikit/css/uikit.css', '../../../assets/uikit/css/uikit-rtl.css']
})
export class SettingsIComponent {

  avatar = '4e25ab7c-a222-4db6-8e8d-6b96bcaef5071.jpg';
  
  totalNumber!: number;
  roundedNumber!: string;

  //brands: Brands[] = brandsData; 
  newDesc!: string;



  id = 1;
  url = '/api/v1/influencer/settings/' + this.id;
   
  influencer: Influencer = {} as Influencer;
  categories: Categories[] = []
  platforms: Platforms[] = []

  constructor(private apiService: ApiServiceService, private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>(this.url).subscribe(
      (data) => {
        this.influencer = data.data.influencerSettings;
        this.platforms = data.data.influencerSettings.platforms;
        this.categories = data.data.influencerSettings.categories;
        this.newDesc = this.influencer.description; // Move the assignment here
        this.calculateTotalNumber();
        this.roundNumber();
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


  calculateTotalNumber() {
    this.totalNumber = this.platforms.reduce((sum, platform) => sum + platform.views, 0);
    this.roundNumber(); // Call roundNumber() after updating the totalNumber
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

  SubmitDescripion(){
    console.log(this.influencer.description);
  }
/*
SubmitDescripion() {
  this.apiService.updateInfluencerDescription(this.influencer.id, this.influencer.description).subscribe(
    (response) => {
      console.log('Description updated successfully');
      // Optionally, you can show a success message or perform any other action.
    },
    (error) => {
      console.error('Error updating description:', error);
      // Optionally, you can show an error message or perform any other action.
    }
  );
}
*/
  CancelDescripion(){
    this.influencer.description = this.newDesc;
  }

  
//-------------
indexes: number[] = [];

toggleIndex(index: number): void {
  const selectedIndex = this.indexes.indexOf(index);
  if (selectedIndex > -1) {
    this.indexes.splice(selectedIndex, 1);
  } else {
    this.indexes.push(index);
  }
}

isIndexSelected(index: number): boolean {
  return this.indexes.includes(index);
}

deleteAtIndex(): void {
  this.categories = this.categories.filter((_, index) => !this.indexes.includes(index));
  this.indexes = [];
}

closeModal(): void {
  //this.dialogRef.close();
}

get filteredTags(): any[] {
  return this.categories.filter((_, index) => !this.indexes.includes(index));
}

//----------------

  indexesN: Array<Number> = [];
  AddToIndexesN(index: Number){ this.indexesN.push(index); }
  RemoveIndexN(){ this.indexesN = []; }
  DeleteAtIndexN(){
    for(var i=0; i<this.indexesN.length; i++)
      delete this.categories[this.indexes[i]];
  }
  
}

