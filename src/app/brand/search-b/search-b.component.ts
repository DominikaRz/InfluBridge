
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { ApiServiceService } from 'src/app/services/api-service.service';
import { ImgService } from 'src/app/services/img.service';

interface Search {
  id: number;
  pseudonym: string;
  categories: string[];
  campaignsNumber: number;
  totalViews: number;
  avatar: string;
}

interface Category {
  id: number;
  name: string;
}


@Component({
  selector: 'app-search-b',
  templateUrl: './search-b.component.html',
  styleUrls: ['./search-b.component.css',
    '../../../assets/uikit/css/uikit.css',
    '../../../assets/uikit/css/uikit-rtl.css'],
})
export class SearchBComponent {
  appliedFilters: string[] = [];
  filteredTags: string[] = [];
  tagFilterInput: string = '';
  searchInput: FormControl = new FormControl();


  
  url = '/api/v1/influencer/list';
  urlTags = '/api/v1/category/list';
   
  search: Search[] = [];
  initialSearch: Search[] = [];

  category: Category[] = [];

  ngOnInit() {
    this.http.get<any>(this.url).subscribe(
      (data) => {
        this.search = data.data.influencersList;
        this.initialSearch = this.search; 
        this.img.assignAvatars(this.search);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
    this.http.get<any>(this.urlTags).subscribe(
      (data) => {
        this.category = data.data.categoriesList;
        this.filteredTags = this.category.map((cat) => cat.name);
        this.allTags = this.category.map((cat) => cat.name);
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

  toggleTagFilter(name: string): void {
    if (this.isTagFilterApplied(name)) {
      this.removeTagFilter(name);
    } else {
      this.applyTagFilter(name);
    }
  }

  applyTagFilter(name: string): void {
    this.appliedFilters.push(name);
  }

  removeTagFilter(name: string): void {
    const index = this.appliedFilters.indexOf(name);
    if (index > -1) {
      this.appliedFilters.splice(index, 1);
    }
  }

  isTagFilterApplied(name: string): boolean {
    return this.appliedFilters.includes(name);
  }

  filterCampaigns(): Search[] {
    if (this.appliedFilters.length === 0) {
      return this.search;
    }
    return this.search.filter((campaign) =>
      campaign.categories.some((name) => this.appliedFilters.includes(name))
    );
  }

  allTags: string[] = [];

  filterTags(input: string): void {
    const filterValue = input.toLowerCase();
    if (filterValue === '') {
      this.filteredTags = this.allTags.slice();
    } else {
      this.filteredTags = this.allTags.filter(name => name.toLowerCase().includes(filterValue));
    }
  }

  searchCampaigns(query: string): void {
    const filterValue = query.toLowerCase();
    if (filterValue === '') {
      this.search = this.appliedFilters.length === 0 ? this.initialSearch : this.filterCampaigns();
    } else {
      this.search = this.initialSearch.filter((campaign) =>
        campaign.pseudonym.toLowerCase().includes(filterValue) ||
        campaign.categories.some((name) => name.toLowerCase().includes(filterValue))
      );
    }
  }

  @ViewChild('customTypeaheadTemplate', { static: true }) customTypeaheadTemplate: ElementRef | undefined;

  constructor(private apiService: ApiServiceService, private http: HttpClient, private img: ImgService) {

    this.searchInput.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((query: string) => {
        this.searchCampaigns(query);
      });
  }
}


/*
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import campaignsData from './search.json';
import tagsData from './tags.json';

interface Search {
  id: number;
  name: string;
  tags: string[];
  joinedCampaigns: number;
  followers: string;
  avatar: string;
}

interface Tag {
  id: number;
  tag: string;
}

@Component({
  selector: 'app-search-b',
  templateUrl: './search-b.component.html',
  styleUrls: ['./search-b.component.css',
    '../../../assets/uikit/css/uikit.css',
    '../../../assets/uikit/css/uikit-rtl.css'],
})
export class SearchBComponent {
  searched: Search[] = campaignsData;
  tags: Tag[] = tagsData.tags;
  appliedFilters: string[] = [];
  filteredTags: string[] = [];
  tagFilterInput: string = '';
  searchInput: FormControl = new FormControl();

  toggleTagFilter(tag: string): void {
    if (this.isTagFilterApplied(tag)) {
      this.removeTagFilter(tag);
    } else {
      this.applyTagFilter(tag);
    }
  }

  applyTagFilter(tag: string): void {
    this.appliedFilters.push(tag);
  }

  removeTagFilter(tag: string): void {
    const index = this.appliedFilters.indexOf(tag);
    if (index > -1) {
      this.appliedFilters.splice(index, 1);
    }
  }

  isTagFilterApplied(tag: string): boolean {
    return this.appliedFilters.includes(tag);
  }

  filterCampaigns(): Search[] {
    if (this.appliedFilters.length === 0) {
      return this.searched;
    }
    return this.searched.filter((campaign) =>
      campaign.tags.some((tag) => this.appliedFilters.includes(tag))
    );
  }

  allTags: string[] = [];

  

  filterTags(input: string): void {
    const filterValue = input.toLowerCase();
    this.filteredTags = this.allTags.filter(tag => tag.toLowerCase().includes(filterValue));
  }

  searchCampaigns(query: string): void {
    const filterValue = query.toLowerCase();
    this.searched = campaignsData.filter((campaign) =>
      campaign.name.toLowerCase().includes(filterValue) ||
      campaign.followers.toLowerCase().includes(filterValue) ||
      campaign.tags.some((tag) => tag.toLowerCase().includes(filterValue))
    );
  }
  
  @ViewChild('customTypeaheadTemplate', { static: true }) customTypeaheadTemplate: ElementRef | undefined;

  constructor() {
    this.filteredTags = this.tags.map(tag => tag.tag);
    this.allTags = this.tags.map(tag => tag.tag);

    this.searchInput.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((query: string) => {
        this.searchCampaigns(query);
      });
  }
}
*/