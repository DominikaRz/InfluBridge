import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';

import { RegisterChooseComponent } from './register/register-choose/register-choose.component';
import { RegisterInfluComponent } from './register/register-influ/register-influ.component';
import { RegisterBrandComponent } from './register/register-brand/register-brand.component';

import { MainIComponent } from './influencer/main-i/main-i.component';
import { SearchIComponent } from './influencer/search-i/search-i.component';
import { HistoryIComponent } from './influencer/history-i/history-i.component';
import { SettingsIComponent } from './influencer/settings-i/settings-i.component';

import { MainBComponent } from './brand/main-b/main-b.component';
import { HistoryBComponent } from './brand/history-b/history-b.component';
import { SettingsBComponent } from './brand/settings-b/settings-b.component';
import { SearchBComponent } from './brand/search-b/search-b.component';

import { CampaignComponent } from './campaign/campaign/campaign.component';
import { CampaignBComponent } from './campaign/campaign-b/campaign-b.component';
import { ViewComponent } from './influencer/view/view.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FooterInfluComponent } from './influencer/components/footer-influ/footer-influ.component';
import { NavbarInfluComponent } from './influencer/components/navbar-influ/navbar-influ.component';
import { SidenavComponent } from './influencer/components/sidenav/sidenav.component';
import { NavbarBrandComponent } from './brand/components/navbar-brand/navbar-brand.component';
import { FooterBrandComponent } from './brand/components/footer-brand/footer-brand.component';

import { ExampleBackComponent } from './check/example-back/example-back.component';
import { NavbarMainComponent } from './components/navbar-main/navbar-main.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    MainIComponent,
    RegisterChooseComponent,
    RegisterInfluComponent,
    RegisterBrandComponent,
    CampaignComponent,
    MainBComponent,
    HistoryIComponent,
    HistoryBComponent,
    SearchIComponent,
    NavbarComponent,
    FooterComponent,
    SidenavComponent,
    FooterInfluComponent,
    NavbarInfluComponent,
    SettingsIComponent,
    NavbarBrandComponent,
    FooterBrandComponent,
    SettingsBComponent,
    ViewComponent,
    SearchBComponent,
    ExampleBackComponent,
    NavbarMainComponent,
    CampaignBComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TypeaheadModule.forRoot(),
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
