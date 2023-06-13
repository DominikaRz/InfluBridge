import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import campaignsData from '../main-b/campaigns.json';  

interface Campaigns {  
  id: Number;    
  offerName: String;  
  endDate: String;  
  palces: Number;  
  filled: Number;    
} 

@Component({
  selector: 'app-main-b',
  templateUrl: './main-b.component.html',
  styleUrls: ['./main-b.component.css',
  '../../../assets/uikit/css/uikit.css',
  '../../../assets/uikit/css/uikit-rtl.css', ]
})
export class MainBComponent {

  
  campaigns: Campaigns[] = campaignsData;  
  
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
  categories! : [];
  people! : Number;
  date! : String;
  shotrDesc! : String;
  description! : String;

  onSubmit() {
    
  }


  

  
    

}
