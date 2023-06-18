import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { ApiServiceService } from '../../services/api-service.service';
import { PostService } from 'src/app/services/post.service';

import tagsData from './tags.json';
interface Tag {
  id: number;
  tag: string;
}

interface Category{
  id: number;
  name: string;
}
interface Platforms{
  id: number;
  name: string;
  linkPattern: string;
}


@Component({
  selector: 'app-register-influ',
  templateUrl: './register-influ.component.html',
  styleUrls: ['./register-influ.component.css',
  '../../../assets/uikit/css/uikit.css',
  '../../../assets/uikit/css/uikit-rtl.css',]
})
export class RegisterInfluComponent {
  title = 'Register as Influencer';
  //step 1
  usernameLabel = 'Email';
  passwordLabel = 'Password';
  username!: string;
  password!: string; 


  //step 2
  nameLabel = 'Name';
  surnameLabel = 'Surname';
  phoneLabel = 'Phone number';
  pseudonymLabel = 'Pseudonym';
  pseudonym!: string;
  name!: string;
  surname!: string;
  phone!: string;
  //step 3
  descriptionLabel = 'Describe yourself';
  avatarLabel = 'Avatar';
  description!: string;
  avatar!: string;
  //step 4

  tags: Tag[] = tagsData.tags;
  appliedFilters: number[] = [];
  filteredTags: Category[] = [];
  tagFilterInput: FormControl;

  
  urlTags = '/api/v1/category/list';
  urlPlatf = '/api/v1/category/list';
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
      username: ['abc', Validators.required],
      password: ['12#Edrswak', [Validators.required, Validators.minLength(8)]],

      name: ['Gabrielle', Validators.required],
      surname: ['Finch', Validators.required],
      pseudonym: ['bagy123', Validators.required],
      phone: ['234356354', [Validators.required, Validators.pattern('^[\s+]?[0-9\s]+$')]],

      description: ['I am an...'],
      avatar: ['123'],

      tagFilterInput: [''],
    });
    //for filtering tags using search input
    this.filterTags();
    this.tagFilterInput.valueChanges.subscribe(() => {
      this.filterTags();
    });
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
  
  
  
//------------FORMS------------
  form!: FormGroup;
  constructor(private formBuilder: FormBuilder, private apiService: ApiServiceService, private http: HttpClient, private postService: PostService) {
    this.tagFilterInput = this.formBuilder.control('');
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value;
    const requirements: string[] = [];

    if (!value) { return null; }

    if (!/[0-9]/.test(value)) {  requirements.push('one number'); }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) { requirements.push('one special character'); }

    if (!/[A-Z]/.test(value)) { requirements.push('one uppercase letter'); }

    if (requirements.length === 0) { return null; } 
    else { return { passwordRequirements: requirements }; }
  }

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
  const data = {
    email: this.username,
    password: this.password,
    pseudonym: this.pseudonym,
    phoneNumber: this.phone,
    firstName: this.name,
    lastName: this.surname,
    description: this.description,
    platforms: this.activeOptions.map(platformId => ({
      platformTypeId: Number(platformId),
      username: this.username
    })),
    categoriesIds: this.appliedFilters
  };

  const url = '/api/v1/influencer/register'; // Replace with your API endpoint

  /*
  this.postService.sendData(data, url)
    .subscribe(
      response => {
        console.log('Data sent successfully:', response);
        // Handle successful response here
      },
      error => {
        console.error('Error sending data:', error);
        // Handle error response here
      }
    );
    */
   console.log(data);
}

//for visibility of password field
  togglePasswordVisibility() {
    const passwordInput = document.querySelector('#password') as HTMLInputElement;
    const icon = document.querySelector('#show');

    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;

    const ico = icon!.getAttribute('uk-icon') === 'eye-slash' ? 'eye' : 'eye-slash';
    icon!.setAttribute('uk-icon', ico);
  }
}
