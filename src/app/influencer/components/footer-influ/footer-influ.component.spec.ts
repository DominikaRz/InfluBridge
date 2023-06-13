import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterInfluComponent } from './footer-influ.component';

describe('FooterInfluComponent', () => {
  let component: FooterInfluComponent;
  let fixture: ComponentFixture<FooterInfluComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterInfluComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterInfluComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
