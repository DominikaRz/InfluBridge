import { Component, OnInit } from '@angular/core';
import { ImgService } from 'src/app/services/img.service';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';


import { PostService } from 'src/app/services/post.service';

interface LoginResponse {
  timestamp: string;
  status: number;
  message: string;
  data: InfluencerLoginData | BrandLoginData;
}

interface InfluencerLoginData {
  influencerPseudonym: string;
  influencerId: number;
}

interface BrandLoginData {
  brandId: number;
  brandName: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css',
              '../../assets/uikit/css/uikit.css',
              '../../assets/uikit/css/uikit-rtl.css', ]
})
export class LoginComponent implements OnInit {
  title = 'Welcome back!';
  subtitle = "Don't you have account yet?";
  usernameLabel = 'Email / username';
  passwordLabel = 'Password';
  rememberMeLabel = 'Remember me';
  submitButtonLabel = 'Login';
  username!: string;
  password!: string;
  rememberMe!: boolean;
  form!: FormGroup;

  /*
  onSubmit() {
    console.log('Username: ' + this.username);
    console.log('Password: ' + this.password);
    console.log('Remember me: ' + this.rememberMe);
  }*/
  
  userType: string = '';

selectUserType(userType: string): void {
  this.userType = userType;
}

setCookie(name: string, value: string): void {
  document.cookie = `${name}=${value}; path=/`;
}

  onSubmit(): void {
    const influencerUrl = 'http://localhost:8080/api/v1/influencer/login';
    const brandUrl = 'http://localhost:8080/api/v1/brand/login';

    const loginData = {
      pseudonym: this.username,
      password: this.password
    };

    const brandData = {
      name: this.username,
      password: this.password
    };
    
    this.http.post<any>(influencerUrl, loginData).subscribe(
      (response) => {
          const data: InfluencerLoginData = response.data as InfluencerLoginData;
          console.log('Influencer Pseudonym:', data.influencerPseudonym);
          console.log('Influencer ID:', data.influencerId);
              // Set cookies
              this.setCookie('id', data.influencerId.toString());
              this.setCookie('type', 'influencer');
              this.setCookie('name', data.influencerPseudonym);
      },
      (error) => {
        this.http.post<any>(brandUrl, brandData).subscribe(
          (response) => {
            if ('influencerPseudonym' in response.data && 'influencerId' in response.data) {
              const data: InfluencerLoginData = response.data as InfluencerLoginData;
              console.log('Influencer Pseudonym:', data.influencerPseudonym);
              console.log('Influencer ID:', data.influencerId);
              
            } else if ('brandId' in response.data && 'brandName' in response.data) {
              const data: BrandLoginData = response.data as BrandLoginData;
              console.log('Brand ID:', data.brandId);
              console.log('Brand Name:', data.brandName);

              // Set cookies
              this.setCookie('id', data.brandId.toString());
              this.setCookie('type', 'brand');
              this.setCookie('name', data.brandName);
            } else {
              // Handle the case where login is successful but response data is not as expected
              console.error('Invalid response data');
            }
          },
          (error) => {
            console.error('Error:', error);
          }
        );
      }
    );
/*
    this.http.post<any>(brandUrl, brandData).subscribe(
      (response) => {
        if ('influencerPseudonym' in response.data && 'influencerId' in response.data) {
          const data: InfluencerLoginData = response.data as InfluencerLoginData;
          console.log('Influencer Pseudonym:', data.influencerPseudonym);
          console.log('Influencer ID:', data.influencerId);
        } else if ('brandId' in response.data && 'brandName' in response.data) {
          const data: BrandLoginData = response.data as BrandLoginData;
          console.log('Brand ID:', data.brandId);
          console.log('Brand Name:', data.brandName);
        } else {
          // Handle the case where login is successful but response data is not as expected
          console.error('Invalid response data');
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );*/
  }

  
  

  

  constructor(private formBuilder: FormBuilder, private img: ImgService, private postService: PostService, private http: HttpClient) {}

  
  url = '/api/v1/influencer/settings/';

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', ],//[Validators.required, Validators.minLength(8), this.passwordValidator],]
        });
        


    }

    passwordValidator(control: AbstractControl): ValidationErrors | null {
      const value: string = control.value;
      const requirements: string[] = [];
    
      if (!value) { return null; }
    
      if (!/[0-9]/.test(value)) {  requirements.push('one number'); }
    
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) { requirements.push('one special character'); }
    
      if (!/[A-Z]/.test(value)) { requirements.push('one uppercase letter'); }
    
      if (requirements.length === 0) { return null; } 
      else { return { passwordRequirements: requirements }; }
    }
    
    
    
    //for visibility of password field
    togglePasswordVisibility() {
      const passwordInput = document.querySelector('#password') as HTMLInputElement;
      const icon = document.querySelector('#show');

      const type = passwordInput.type === 'password' ? 'text' : 'password';
      passwordInput.type = type;

      const ico = icon!.getAttribute('uk-icon') === 'eye-slash' ? 'eye' : 'eye-slash';
      icon!.setAttribute('uk-icon', ico);
  }
}
