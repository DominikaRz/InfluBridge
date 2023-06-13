import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import campaignsData from './campaigns.json';

interface Campaign {  
  id: Number;  
  brand: String;  
  offerName: String;  
  endDate: String;  
} 

interface Brands {  
  id: Number;  
  name: String;  
  brand: String;   
}

@Component({
  selector: 'app-main-i',
  templateUrl: './main-i.component.html',
  styleUrls: ['./main-i.component.css',
  '../../../assets/uikit/css/uikit.css',
  '../../../assets/uikit/css/uikit-rtl.css', ]
})
export class MainIComponent {

  constructor(private httpClient: HttpClient) { }
   public getEmployees(){
      return this.httpClient.get('http://dummy.restapiexample.com/api/v1/employees');
    }

    camapigns: Campaign[] = campaignsData; 

    

}
