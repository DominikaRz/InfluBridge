import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import brandData from './brand.json';
import influData from './influ.json';

interface Brand {
  id: number;
  name: string;
  avatar: string;
  background: string;
}

interface Influ {
  id: number;
  pseudonym: string;
  avatar: string;
  background: string;
}

interface Avatar {
  id: number;
  avatar: string;
}

export interface Search {
  id: number;
  pseudonym: string;
  categories: string[];
  campaignsNumber: number;
  totalViews: number;
  avatar: string;
}

@Injectable({
  providedIn: 'root'
})
export class ImgService {
  brand: Brand[] = (brandData as any).brands;
  influ: Influ[] = (influData as any).influencers;

  constructor(private http: HttpClient) {}

  getBrandBackgroundById(id: number): string {
    const brand = this.brand.find((item) => item.id === id);
    return brand ? brand.background : '';
  }

  getBrandAvatarById(id: number): string {
    const brand = this.brand.find((item) => item.id === id);
    return brand ? brand.avatar : '';
  }

  getInfluAvatarById(id: number): string {
    const influ = this.influ.find((item) => item.id === id);
    return influ ? influ.avatar : '';
  }


  assignAvatars(search: Search[]): void {
    search.forEach((result) => {
      const influ = this.influ.find((a) => a.id === result.id);
      result.avatar = influ ? influ.avatar : ''; // Assign the avatar or empty string if not found
    });
  }

  getInfluAvatarByPseudonym(pseudonym: string): string {
    const influ = this.influ.find((item) => item.pseudonym === pseudonym);
    return influ ? influ.avatar : '';
  }
  

  
}
