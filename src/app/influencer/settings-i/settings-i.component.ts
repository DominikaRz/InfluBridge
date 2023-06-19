import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImgService } from 'src/app/services/img.service';

import { ApiServiceService } from '../../services/api-service.service';
import { PostService } from 'src/app/services/post.service';
import { FormControl, FormGroup } from '@angular/forms';

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

interface Category{
  id: number;
  name: string;
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

  
  appliedFilters: number[] = [];
  filteredTags: Category[] = [];

  id = 1;
  url = '/api/v1/influencer/settings/' + this.id;
  urlTags = '/api/v1/category/list';
   
  influencer: Influencer = {} as Influencer;
  categories: Categories[] = []
  platforms: Platforms[] = []
  category: Category[] = [];

  tagFilterInput: FormControl = new FormControl();

  form!: FormGroup;

  constructor(private apiService: ApiServiceService, private http: HttpClient, private postService: PostService, private img: ImgService) {}

  ngOnInit() {
    this.http.get<any>(this.urlTags).subscribe(
    (data) => {
      this.category = data.data.categoriesList;
      this.filteredTags = this.category;
    },
    (error) => {
      console.error('Error:', error);
    }
  );
    this.http.get<any>(this.url).subscribe(
      (data) => {
        this.influencer = data.data.influencerSettings;
        this.platforms = data.data.influencerSettings.platforms;
        this.categories = data.data.influencerSettings.categories;
        this.appliedFilters = this.categories.map(category => category.id);
        this.newDesc = this.influencer.description; // Move the assignment here
        this.calculateTotalNumber();
        this.roundNumber();
        this.avatar = this.img.getInfluAvatarByPseudonym(this.influencer.pseudonym);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
    this.tagFilterInput = this.form.get('tagFilterInput') as FormControl; // Initialize tagFilterInput control
  
    // for filtering tags using search input
    this.filterTags();
    this.tagFilterInput.valueChanges.subscribe(() => {
      this.filterTags();
    });
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
  
  urlU = `http://localhost:8080/api/v1/influencer/update/` + this.id;
  username!: string;
  pass5!: string;
  pass6!: string;
  pass7!: string;
  password!: string;
  submitPlatform(id: number){
    if(id==2) this.password = this.pass5;
    if(id==3) this.password = this.pass6;
    if(id==1) this.password = this.pass7;

    const platform = {
      platformTypeId: id,
      username: this.username
    };
    const data= {
      password: this.password,
      newPassword: null,
      newDescription: null,
      categoriesId: [],
      platforms: [platform],
    }
    console.log(data);
/**/
    this.postService.pachData(data, this.urlU).subscribe(
      (response) => {
        // Handle successful leave response
        console.log('Platform add successfully');
        alert('Platform add successfully');
      },
      (error) => {
        // Handle error response
        console.error('Error:', error);
      }
    );
    
  }




  prevPass!: string;
  newPass!: string;
  changePass() {  
    console.log(this.prevPass);
    console.log(this.newPass);

    const data= {
      password: this.prevPass,
      newPassword: this.newPass,
      newDescription: null,
      categoriesId: [],
      platforms: []
    }
    console.log(data);

    this.postService.pachData(data, this.urlU).subscribe(
      (response) => {
        // Handle successful leave response
        console.log('Password changed successfully');
      },
      (error) => {
        // Handle error response
        console.error('Error:', error);
      }
    );
    
  }


  image!: BinaryData;
  SubmitImage(){
    console.log(this.image);
  }

  //pass3!: string;
  pass3 = 'MrBeast123';
  SubmitDescripion(){
    const data= {
      password: this.pass3,
      newPassword: null,
      newDescription: this.influencer.description,
      categoriesId: [],
      platforms: []
    }
    console.log(data);

    this.postService.pachData(data, this.urlU).subscribe(
      (response) => {
        // Handle successful leave response
        console.log('Description changed successfully');
      },
      (error) => {
        // Handle error response
        console.error('Error:', error);
      }
    );
    /*
    {
    "password": "MrBeast123",
    "newPassword": "123MrBeasr",
    "newDescription": "Hello!",
    "categoriesId": [1, 3, 5],
    "platforms": [
        {
            "platformTypeId": 1,
            "username": "MrBeastGaming"
        }
    ]
}*/
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

pass4 = 'MrBeast123';
//pass4!: string;

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

toggleTagFilter(tagId: number): void {
  if (this.isTagFilterApplied(tagId)) {
    this.removeTagFilter(tagId);
  } else {
    this.applyTagFilter(tagId);
  }
}

applyTagFilter(tagId: number): void {
  this.appliedFilters.push(tagId);
}

removeTagFilter(tagId: number): void {
  const index = this.appliedFilters.indexOf(tagId);
  if (index > -1) {
    this.appliedFilters.splice(index, 1);
  }
}

isTagFilterApplied(tagId: number): boolean {
  return this.appliedFilters.includes(tagId);
}

getTagNameById(tagId: number): string {
  const tag = this.category.find(t => t.id === tagId);
  return tag ? tag.name : '';
}

filterTags(): void {
  const searchText = this.tagFilterInput.value.toLowerCase().trim();
  if (searchText.length === 0) {
    this.filteredTags = this.category;
  } else {
    this.filteredTags = this.category.filter(tag => {
      const tagText = this.getTagNameById(tag.id).toLowerCase();
      return tagText.includes(searchText);
    });
  }
}



closeModal(){
    const data= {
      password: this.pass3,
      newPassword: null,
      newDescription: null,
      categoriesId: this.appliedFilters,
      platforms: []
    }
    console.log(data);
/**/
    this.postService.pachData(data, this.urlU).subscribe(
      (response) => {
        // Handle successful leave response
        console.log('Tags changed successfully');
      },
      (error) => {
        // Handle error response
        console.error('Error:', error);
      }
    );
}

get filteredTag(): any[] {
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

