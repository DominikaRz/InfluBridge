import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import campaignsData from '../main-i/campaigns.json'; 
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
  selector: 'app-history-i',
  templateUrl: './history-i.component.html',
  styleUrls: ['./history-i.component.css',
  '../../../assets/uikit/css/uikit.css',
  '../../../assets/uikit/css/uikit-rtl.css', ]
})
export class HistoryIComponent {

  constructor(private httpClient: HttpClient) { }
   public getEmployees(){
      return this.httpClient.get('http://dummy.restapiexample.com/api/v1/employees');
    }

    camapigns: Campaign[] = campaignsData; 

    

}
