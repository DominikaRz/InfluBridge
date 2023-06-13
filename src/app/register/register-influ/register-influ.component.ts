import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';


import tagsData from './tags.json';
interface Tag {
  id: number;
  tag: string;
}

@Component({
  selector: 'app-register-influ',
  templateUrl: './register-influ.component.html',
  styleUrls: ['./register-influ.component.css',
  '../../../assets/uikit/css/uikit.css',
  '../../../assets/uikit/css/uikit-rtl.css',]
})
export class RegisterInfluComponent {
  title = 'Register as Influencer';
  //step 1
  usernameLabel = 'Email';
  passwordLabel = 'Password';
  username!: string;
  password!: string;
  //step 2
  nameLabel = 'Name';
  surnameLabel = 'Surname';
  phoneLabel = 'Phone number';
  name!: string;
  surname!: string;
  phone!: string;
  //step 3
  descriptionLabel = 'Describe yourself';
  avatarLabel = 'Avatar';
  description!: string;
  avatar!: string;
  //step 4

  tags: Tag[] = tagsData.tags;
  appliedFilters: number[] = [];
  filteredTags: Tag[] = [];
  tagFilterInput: FormControl;

  toggleTagFilter(tagId: number): void {
    if (this.isTagFilterApplied(tagId)) {
      this.removeTagFilter(tagId);
    } else {
      this.applyTagFilter(tagId);
    }
  }

  applyTagFilter(tagId: number): void {
    this.appliedFilters.push(tagId);
  }

  removeTagFilter(tagId: number): void {
    const index = this.appliedFilters.indexOf(tagId);
    if (index > -1) {
      this.appliedFilters.splice(index, 1);
    }
  }

  isTagFilterApplied(tagId: number): boolean {
    return this.appliedFilters.includes(tagId);
  }

  getTagNameById(tagId: number): string {
    const tag = this.tags.find(t => t.id === tagId);
    return tag ? tag.tag : '';
  }

  filterTags(): void {
    const searchText = this.tagFilterInput.value.toLowerCase().trim();
    if (searchText.length === 0) {
      this.filteredTags = this.tags;
    } else {
      this.filteredTags = this.tags.filter(tag => {
        const tagText = this.getTagNameById(tag.id).toLowerCase();
        return tagText.includes(searchText);
      });
    }
  }
  
  
  
//------------FORMS------------
  form!: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.tagFilterInput = this.formBuilder.control('');
  }


  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],

      name: ['', Validators.required],
      surname: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[\s+]?[0-9\s]+$')]],

      description: [''],
      avatar: [''],

      tagFilterInput: [''],
    });
    //for filtering tags using search input
    this.filterTags();
    this.tagFilterInput.valueChanges.subscribe(() => {
      this.filterTags();
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

  activeOptions: string[] = [];

toggleOption(event: MouseEvent) {
  const option = event.target as HTMLOptionElement;
  const value = option.value;

  if (this.isOptionActive(value)) {
    this.activeOptions = this.activeOptions.filter((activeOption) => activeOption !== value);
  } else {
    this.activeOptions.push(value);
  }
}

isOptionActive(optionValue: string): boolean {
  return this.activeOptions.includes(optionValue);
}


  

  onSubmit() {
    console.log('Username: ' + this.username);
    console.log('Password: ' + this.password);
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
