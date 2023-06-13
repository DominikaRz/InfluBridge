import { Component } from '@angular/core';
import socialData from './social.json';
import brandsData from './brands.json'; 
import tagsData from './tags.json'; 

interface Social {
  id: number;
  name: String;
  number: number;
}

interface Brands {  
  id: Number;  
  name: String;  
  brand: String;   
}

@Component({
  selector: 'app-settings-i',
  templateUrl: './settings-i.component.html',
  styleUrls: ['./settings-i.component.css', '../../../assets/uikit/css/uikit.css', '../../../assets/uikit/css/uikit-rtl.css']
})
export class SettingsIComponent {
  nick = 'Julia Rows';
  avatar = '4e25ab7c-a222-4db6-8e8d-6b96bcaef5071.jpg';

  medias: Social[] = socialData;
  totalNumber!: number;
  roundedNumber!: string;
  description = "I'm Julia Rows, a fashion and lifestyle influencer from NYC. I share my passion for fashion and beauty on Instagram, Facebook, and Twitter. I collaborate with brands I love and whose values align with mine. I also support charities and organizations for women's empowerment and environmental sustainability.";

  brands: Brands[] = brandsData; 
  tags = tagsData.tags;


  ngOnInit() {
    this.calculateTotalNumber();
    this.roundNumber();
  }

  calculateTotalNumber() {
    this.totalNumber = this.medias.reduce((sum, media) => sum + media.number, 0);
  }

  roundNumber() {
    if (this.totalNumber >= 1000000) {
      this.roundedNumber = 'over ' + (this.totalNumber / 1000000).toLocaleString(undefined, { maximumFractionDigits: 1 }) + ' million followers';
    } else if (this.totalNumber >= 1000) {
      this.roundedNumber = (this.totalNumber / 1000).toLocaleString(undefined, { maximumFractionDigits: 1 }) + ' thousand followers';
    } else {
      this.roundedNumber = this.totalNumber.toLocaleString();
    }
  }


  prevPass!: string;
  newPass!: string;
  onSubmit() {  
    console.log(this.prevPass);
    console.log(this.newPass);
  }


  image!: BinaryData;
  SubmitImage(){
    console.log(this.image);
  }

  newDesc= this.description;
  SubmitDescripion(){
    this.description = this.newDesc;
  }
//-------------
indexes: number[] = [];

toggleIndex(index: number): void {
  const selectedIndex = this.indexes.indexOf(index);
  if (selectedIndex > -1) {
    this.indexes.splice(selectedIndex, 1);
  } else {
    this.indexes.push(index);
  }
}

isIndexSelected(index: number): boolean {
  return this.indexes.includes(index);
}

deleteAtIndex(): void {
  this.tags = this.tags.filter((_, index) => !this.indexes.includes(index));
  this.indexes = [];
}

closeModal(): void {
  //this.dialogRef.close();
}

get filteredTags(): any[] {
  return this.tags.filter((_, index) => !this.indexes.includes(index));
}

//----------------

  indexesN: Array<Number> = [];
  AddToIndexesN(index: Number){ this.indexesN.push(index); }
  RemoveIndexN(){ this.indexesN = []; }
  DeleteAtIndexN(){
    for(var i=0; i<this.indexesN.length; i++)
      delete this.tags[this.indexes[i]];
  }
  
}

