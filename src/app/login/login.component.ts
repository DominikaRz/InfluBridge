import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

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
  username!: string | null;
  password!: string | null;
  rememberMe!: boolean;
  form!: FormGroup;

  onSubmit() {
    console.log('Username: ' + this.username);
    console.log('Password: ' + this.password);
    console.log('Remember me: ' + this.rememberMe);
  }

  constructor(private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator],]
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
