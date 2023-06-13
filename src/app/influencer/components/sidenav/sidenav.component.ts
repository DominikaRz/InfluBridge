import { Component } from '@angular/core';
import brandsData from './brands.json'; 

interface Brands {  
  id: Number;  
  name: String;  
  brand: String;   
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css',
  '../../../../assets/uikit/css/uikit.css',
  '../../../../assets/uikit/css/uikit-rtl.css']
})
export class SidenavComponent {
  brands: Brands[] = brandsData; 
}
