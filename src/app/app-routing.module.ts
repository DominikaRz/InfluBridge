import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { RegisterChooseComponent } from './register/register-choose/register-choose.component';
import { RegisterInfluComponent } from './register/register-influ/register-influ.component';
import { RegisterBrandComponent } from './register/register-brand/register-brand.component';
import { MainBComponent } from './brand/main-b/main-b.component';
import { HistoryBComponent } from './brand/history-b/history-b.component';
import { SearchBComponent } from './brand/search-b/search-b.component';
import { SettingsBComponent } from './brand/settings-b/settings-b.component';
import { MainIComponent } from './influencer/main-i/main-i.component';
import { SearchIComponent } from './influencer/search-i/search-i.component';
import { HistoryIComponent } from './influencer/history-i/history-i.component';
import { SettingsIComponent } from './influencer/settings-i/settings-i.component';

import { CampaignComponent } from './campaign/campaign/campaign.component';
import { CampaignBComponent } from './campaign/campaign-b/campaign-b.component';
import { ViewComponent } from './influencer/view/view.component';


import { ExampleBackComponent } from './check/example-back/example-back.component';

const routes: Routes = [
  { path: '', component: MainComponent, title: 'InfluBridge'}, //main page
  { path: 'login', component: LoginComponent}, //login page
  //register pages
  { path: 'register', component: RegisterChooseComponent},
  { path: 'registerInflu', component: RegisterInfluComponent},
  { path: 'registerBrand', component: RegisterBrandComponent},
  //influencer pages
  { path: 'influ', component: MainIComponent},
  { path: 'HistoryInflu', component: HistoryIComponent},
  { path: 'searchBrands', component: SearchIComponent},
  { path: 'settingsInflu', component: SettingsIComponent},
  //single pages
  { path: 'campaign/:id', component: CampaignComponent}, //for influencer
  { path: 'viewCampaign/:id', component: CampaignBComponent}, //for brand
  { path: 'influencer/:id', component: ViewComponent},
  
  //brand pages
  { path: 'brand', component: MainBComponent},
  { path: 'HistoryBrand', component: HistoryBComponent},
  { path: 'searchInfluencers', component: SearchBComponent},
  { path: 'SettingsBrand', component: SettingsBComponent},

  { path: 'check', component: ExampleBackComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
