import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { ApiServiceService } from 'src/app/services/api-service.service';

interface Search {
  id: number;
  brandName: string;
  title: string;
  rate: number;
  vacancies: number;
  startData: string;
  endData: string;
  categories: string[];
  platformTypes: string[];
  influencerIds: number[];
}

interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-search-i',
  templateUrl: './search-i.component.html',
  styleUrls: ['./search-i.component.css',
  '../../../assets/uikit/css/uikit.css',
  '../../../assets/uikit/css/uikit-rtl.css', ],
})
export class SearchIComponent {
  //searched: Search[] = campaignsData;
  //tags: Tag[] = tagsData.tags;
  appliedFilters: string[] = [];
  filteredTags: string[] = [];
  tagFilterInput: string = '';
  searchInput: FormControl = new FormControl();

  id = 5;
  url = '/api/v1/campaign/list';
  urlTags = '/api/v1/category/list';
   
  search: Search[] = [];
  initialSearch: Search[] = [];

  category: Category[] = [];

  ngOnInit() {
    this.http.get<any>(this.url).subscribe(
      (data) => {
        this.search = data.data.campaignsList;
        this.initialSearch = this.search; 
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
        campaign.brandName.toLowerCase().includes(filterValue) ||
        campaign.title.toLowerCase().includes(filterValue) ||
        campaign.endData.toLowerCase().includes(filterValue) ||
        campaign.categories.some((name) => name.toLowerCase().includes(filterValue))
      );
    }
  }

  @ViewChild('customTypeaheadTemplate', { static: true }) customTypeaheadTemplate: ElementRef | undefined;

  constructor(private apiService: ApiServiceService, private http: HttpClient) {

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

