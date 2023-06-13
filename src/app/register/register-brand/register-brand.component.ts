import { Binary } from '@angular/compiler';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register-brand',
  templateUrl: './register-brand.component.html',
  styleUrls: ['./register-brand.component.css',
  '../../../assets/uikit/css/uikit.css',
  '../../../assets/uikit/css/uikit-rtl.css',]
})
export class RegisterBrandComponent {
  title = 'Register as Influencer';
  //step 1
  usernameLabel = 'Email';
  passwordLabel = 'Password';
  username!: string;
  password!: string;/*
  username = "adamg@gmail.com";
  password = "1234567";*/
  //step 2
  nameLabel = 'Name';
  surnameLabel = 'Surname';
  phoneLabel = 'Phone number';
  brandLabel = 'Brand / company name';
  nipLabel = 'NIP number';
  
  name!: string;
  surname!: string;
  phone!: string;
  brandName!: string;
  nip!: string;/*
  name = "Adam";
  surname = "Gawor";
  phone = "123 456 789";
  brandName = "AdamGaw";
  nip = "1293756432";*/
  //step 3
  descriptionLabel = 'Describe yourself';
  avatarLabel = 'Avatar';
  description!: string;
  //description = "My brand is ...";
  avatar!: Binary;
  


  onSubmit() {
    console.log('Username: ' + this.username);
    console.log('Password: ' + this.password);
    console.log('name: ' + this.name);
    console.log('surname: ' + this.surname);
    console.log('phone: ' + this.phone);
    console.log('brandName: ' + this.brandName);
    console.log('description: ' + this.description);
    console.log('avatar: ' + this.avatar);
  }
  
}
