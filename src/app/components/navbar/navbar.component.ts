import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css',
  '../../../assets/uikit/css/uikit.css',
  '../../../assets/uikit/css/uikit-rtl.css',]
})
export class NavbarComponent {
  public href: string = "";

  constructor(private router: Router) {}

  ngOnInit() {
      this.href = this.router.url;
      console.log(this.router.url);
  }
}
