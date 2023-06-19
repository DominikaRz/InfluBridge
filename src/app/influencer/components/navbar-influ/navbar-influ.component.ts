import { Component } from '@angular/core';
import { ImgService } from 'src/app/services/img.service';

@Component({
  selector: 'app-navbar-influ',
  templateUrl: './navbar-influ.component.html',
  styleUrls: ['./navbar-influ.component.css',
  '../../../../assets/uikit/css/uikit.css',
  '../../../../assets/uikit/css/uikit-rtl.css',]
})
export class NavbarInfluComponent {

  id!: number;
  type: string | null = null;
  username: string | null = null;
  imag!: string;

  constructor(private img: ImgService) {}

  ngOnInit() {
    this.id = Number(this.getCookie('id'));
    this.type = this.getCookie('type');
    this.username = this.getCookie('name');
    this.imag = this.img.getInfluAvatarById(this.id);
  }

  getCookie(name: string): string | null {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split('=');
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  }
}
