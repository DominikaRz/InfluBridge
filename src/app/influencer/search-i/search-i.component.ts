import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import campaignsData from './search.json';
import tagsData from './tags.json';

interface Search {
  id: number;
  brand: string;
  tags: string[];
  offerName: string;
  endDate: string;
  freePlaces: number;
}

interface Tag {
  id: number;
  tag: string;
}

@Component({
  selector: 'app-search-i',
  templateUrl: './search-i.component.html',
  styleUrls: ['./search-i.component.css',
  '../../../assets/uikit/css/uikit.css',
  '../../../assets/uikit/css/uikit-rtl.css', ],
})
export class SearchIComponent {
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
      campaign.brand.toLowerCase().includes(filterValue) ||
      campaign.offerName.toLowerCase().includes(filterValue) ||
      campaign.endDate.toLowerCase().includes(filterValue) ||
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

