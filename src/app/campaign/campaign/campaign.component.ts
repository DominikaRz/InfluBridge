import { transition } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css',
  '../../../assets/uikit/css/uikit.css',
  '../../../assets/uikit/css/uikit-rtl.css']
})
export class CampaignComponent {
  /*name!: string;
  dueDate!: string;
  prize!: string;
  shortDescription!: string;
  description!: string;
  image!: string;
  tags!: [];
  labelButton!: string;*/
  
  name = 'Graceful Glow-Up';
  dueDate = 'May 15, 2023';
  prize = 'full set of Beaut by Grace products';
  shortDescription = "Collaborate with Beauty by Grace to showcase their beauty products and transform your look! We're looking for beauty influencers who can create a stunning transformation video using our products.";
  description = "Beauty by Grace is excited to present our latest campaign, the Graceful Glow-Up. We are searching for 10 talented beauty influencers who can create an amazing transformation video using our beauty products. As a participant, you'll receive a full set of Beauty by Grace products to use in your transformation, and a chance to showcase your skills to a wider audience. The campaign is open to beauty influencers across all social media platforms who are passionate about makeup and skincare. Whether you're a beauty guru on YouTube or a rising star on Instagram, we want to hear from you! The deadline to apply is May 15, 2023, so make sure to submit your entry before then. To apply, simply create a transformation video using Beauty by Grace products, and post it on your social media account with the hashtag #GracefulGlowUp. Don't forget to tag @beautybygrace to make sure we see your entry! Our team of judges will review all entries and select 10 winners based on creativity, execution, and overall impact. As a winner of the Graceful Glow-Up campaign, you'll receive a full set of Beauty by Grace products, a chance to be featured on our social media channels, and an opportunity to collaborate with our brand on future campaigns. So what are you waiting for? Join the Graceful Glow-Up campaign today and let's create some stunning transformations together!";
  tags = ['makeup', 'skincare', 'transition', 'beauty'];//, 'beauty', 'beauty', 'beauty', 'beauty', 'beauty', 'beauty', 'beauty', 'beauty', 'beauty', 'beauty', 'beauty', 'beauty', 'beauty'];
  labelButton = 'Quit Campaign'
  image = 'c34a8b8f-6b56-4686-b422-c199081a5b0d.jpg'



}
