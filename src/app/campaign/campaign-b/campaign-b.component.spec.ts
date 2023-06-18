import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignBComponent } from './campaign-b.component';

describe('CampaignBComponent', () => {
  let component: CampaignBComponent;
  let fixture: ComponentFixture<CampaignBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignBComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
