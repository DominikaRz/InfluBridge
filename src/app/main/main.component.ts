import { Component } from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css',
              '../../assets/uikit/css/uikit.css',
              '../../assets/uikit/css/uikit-rtl.css', ]
})
export class MainComponent {
  emailLabel = 'Your email';
  subEmailLabel = '(Who should we send the reply to?)';
  titleLabel = 'Title';
  subTitleLabel = '(What it is about?)';
  contentLabel = 'Content';
  subContentLabel = '(Your message content)';
  email!: string;
  title!: string;
  content!: boolean;

  onSubmit() {
    console.log('Eamil: ' + this.email);
    console.log('Title: ' + this.title);
    console.log('Content: ' + this.content);
  }

  //responsive
  /*
  public innerWidth: any;
  ngOnInit() {
      this.innerWidth = window.innerWidth;
      if (innerWidth > 960) {
        $('.hidden-small').removeClass('uk-hidden');
      }
      else if (innerWidth < 801) {
        $('.hidden-small').addClass('uk-hidden');
      }
  }*/

  
}
