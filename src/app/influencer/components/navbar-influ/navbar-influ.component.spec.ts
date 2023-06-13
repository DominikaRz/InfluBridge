import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarInfluComponent } from './navbar-influ.component';

describe('NavbarInfluComponent', () => {
  let component: NavbarInfluComponent;
  let fixture: ComponentFixture<NavbarInfluComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarInfluComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarInfluComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
