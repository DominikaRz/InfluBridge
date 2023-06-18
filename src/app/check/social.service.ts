import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as cheerio from 'cheerio';

import * as puppeteer from 'puppeteer';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SocialService {

  constructor(private http: HttpClient) { }

/*
  channelUrl = "https://www.youtube.com/@Nerdforge";
  profileUrlI = "https://www.instagram.com/thenerdforge/"
  profileUrlT = "https://twitter.com/TheNerdforge"
  */
  
  //YouTube
  async getSubscriberCountYT(channelUrl: string): Promise<string> {
    try {
      const response = await this.http.get(channelUrl, { responseType: 'text' }).toPromise();
      const $ = cheerio.load(response!);
      const subscriberElement = $('.yt-subscription-button-subscriber-count-branded-horizontal');
      const subscriberCount = subscriberElement.text().trim();
      return subscriberCount;
    } catch (error) {
      console.error('Error scraping subscriber count:', error);
      throw error;
    }
  }

  getSubscriberCount(channelUrl: string): Observable<string> {
    return this.http.get(channelUrl, { responseType: 'text' }).pipe(
      map(response => {
        const $ = cheerio.load(response);
        const subscriberElement = $('.yt-subscription-button-subscriber-count-branded-horizontal');
        const subscriberCount = subscriberElement.text().trim();
        return subscriberCount;
      })
    );
  }

  //Instagram
  async getFollowerCountInstagram(profileUrl: string): Promise<number> {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(profileUrl);
  
      // Wait for the follower count element to load
      await page.waitForSelector('span.g47SY');
  
      // Extract the follower count
      const followerCount = await page.$eval('span.g47SY', (element) => parseInt(element.textContent!.replace(/,/g, ''), 10));
  
      await browser.close();
  
      return followerCount;
    } catch (error) {
      console.error('Error scraping follower count:', error);
      throw error;
    }
  }

  //Twitter
  async getFollowerCountTwitter(profileUrl: string): Promise<number> {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(profileUrl);
  
      // Wait for the follower count element to load
      await page.waitForSelector('a[data-nav="followers"] span[data-count]');
  
      // Extract the follower count
      const followerCount = await page.$eval('a[data-nav="followers"] span[data-count]', (element) => parseInt(element.getAttribute('data-count') || '0', 10));
  
      await browser.close();
  
      return followerCount;
    } catch (error) {
      console.error('Error scraping follower count:', error);
      throw error;
    }
  }
  
}
