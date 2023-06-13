import { Component } from '@angular/core'; 

declare var name: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', /*
              '../assets/uikit/css/uikit.css',
              '../assets/uikit/css/uikit-rtl.css', */]
})
export class AppComponent {
  title = 'InfluBridge'; 
}
