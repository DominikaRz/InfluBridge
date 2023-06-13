import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import tagsData from './tags.json';
interface Tag {
  id: number;
  tag: string;
}



@Component({
  selector: 'app-navbar-brand',
  templateUrl: './navbar-brand.component.html',
  styleUrls: ['./navbar-brand.component.css',
  '../../../../assets/uikit/css/uikit.css',
  '../../../../assets/uikit/css/uikit-rtl.css',]
})
export class NavbarBrandComponent {

  
  title = 'Register as Influencer';
  //step 1
  nameLabel = 'Name of marketing campaign';
  imageLabel = 'Image of marketing campaign';
  categoriesLabel = 'Categories';
  peopleLabel = 'Participants limit';
  dateLabel = 'Due date';
  shortDescLabel = 'Short description';
  descriptionLabel = 'All informations about campaign';
  name! : String;
  image! : String;
  people! : Number;
  date! : String;
  shotrDesc! : String;
  description! : String;
  //tagFilterInput!: FormControl;
  
  
  tags: Tag[] = tagsData.tags;
  appliedFilters: number[] = [];
  filteredTags: Tag[] = [];

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
    const tag = this.tags.find(t => t.id === tagId);
    return tag ? tag.tag : '';
  }

 

  form!: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  onSubmit() {  }

  tagFilterInput: FormControl = new FormControl();

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      image: [''],
      date: ['', Validators.required],
      tagFilterInput: [''],
      categories: [''],
      people: [''],
      shortDesc: [''],
      description: [''],
      // Define other form controls and their validators
    });
  
    this.tagFilterInput = this.form.get('tagFilterInput') as FormControl; // Initialize tagFilterInput control
  
    // for filtering tags using search input
    this.filterTags();
    this.tagFilterInput.valueChanges.subscribe(() => {
      this.filterTags();
    });
  }
  
  filterTags(): void {
    const searchText = this.tagFilterInput.value?.toLowerCase().trim();
    if (searchText?.length === 0) {
      this.filteredTags = this.tags;
    } else {
      this.filteredTags = this.tags.filter((tag) => {
        const tagText = this.getTagNameById(tag.id).toLowerCase();
        return tagText.includes(searchText);
      });
    }
  }
  


} 

 



  


  

  
    
