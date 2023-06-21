import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ImgService } from 'src/app/services/img.service';
import { HttpClient } from '@angular/common/http';

import { ApiServiceService } from '../../../services/api-service.service';
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
  selector: 'app-navbar-brand',
  templateUrl: './navbar-brand.component.html',
  styleUrls: ['./navbar-brand.component.css',
  '../../../../assets/uikit/css/uikit.css',
  '../../../../assets/uikit/css/uikit-rtl.css',]
})
export class NavbarBrandComponent {

  id!: number;
  type: string | null = null;
  username: string | null = null;
  imag!: string;

  title = 'Register as Influencer';
  //step 1
  nameLabel = 'Name of marketing campaign';
  rateLabel = 'Price rate for campaign';
  categoriesLabel = 'Categories';
  peopleLabel = 'Participants limit';
  dateLabel = 'Due date';
  descriptionLabel = 'All informations about campaign';/*
  name! : String;
  image! : String;
  people! : Number;
  date! : String;
  description! : String;
  rate! : number;*/
  name = 'Example title of campaign';
  people = 23;
  date = '23-08-2023';
  description = "This campaign is great. Join us!"
  rate = 12000;
  bg!: string;
  //tagFilterInput!: FormControl;
  
  
  appliedFilters: number[] = [];
  filteredTags: Category[] = [];

  
  urlTags = '/api/v1/category/list';
  urlPlatf = '/api/v1/platform-type/list';
  category: Category[] = [];
  platforms: Platforms[] = [];


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
    this.http.get<any>(this.urlPlatf).subscribe(
      (data) => {
        this.platforms = data.data.platformTypesList;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      tagFilterInput: [''],
      categories: [''],
      people: [''],
      description: [''],
      rate: [''],
      // Define other form controls and their validators
    });
  
    this.tagFilterInput = this.form.get('tagFilterInput') as FormControl; // Initialize tagFilterInput control
  
    // for filtering tags using search input
    this.filterTags();
    this.tagFilterInput.valueChanges.subscribe(() => {
      this.filterTags();
    });
    this.id = Number(this.getCookie('id'));
    this.type = this.getCookie('type');
    this.username = this.getCookie('name');
    this.imag = this.img.getBrandAvatarById(this.id);
    this.bg = this.img.getBrandBackgroundById(this.id);
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

 tagFilterInput: FormControl = new FormControl();

  form!: FormGroup;
  constructor(private formBuilder: FormBuilder, private apiService: ApiServiceService, private http: HttpClient, private postService: PostService, private img: ImgService) {}

  activeOptions: number[] = [];

  toggleOption(event: MouseEvent) {
    const option = event.target as HTMLOptionElement;
    const platformId = Number(option.value);
  
    if (this.isOptionActive(platformId)) {
      this.activeOptions = this.activeOptions.filter((activeOption) => activeOption !== platformId);
    } else {
      this.activeOptions.push(platformId);
    }
  }
  isOptionActive(optionValue: number): boolean {
    return this.activeOptions.includes(optionValue);
  }

  onSubmit() {  
    console.log(this.date)
    const data = {
      brandId: this.id,
      title: this.name,
      rate: this.rate,
      description: this.description,
      vacancies: this.people,
      endDate: this.date,
      categoriesIds: this.appliedFilters,
      platformTypesIds: this.activeOptions,
    };

    const url = 'http://localhost:8080/api/v1/campaign/create';
  
    this.postService.sendData(data, url).subscribe(
        (response) => {
          console.log('Data sent successfully:', response);
          alert('Data sent successfully:');
          // Handle successful response here
        },
        (error) => {
          console.error('Error sending data:', error);
          // Handle error response here
        }
      );
    console.log(data);
  }

  /**
    "brandId": 1,
    "title": "New Campaign",
    "rate": 23000,
    "description": "Earn money with us!!!",
    "vacancies": 10,
    "endDate": "2007-12-03T10:15:30",
    "categoriesIds": [1, 2, 3],
    "platformTypesIds": [1, 2] */

} 

 



  


  

  
    
