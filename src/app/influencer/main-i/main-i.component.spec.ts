import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainIComponent } from './main-i.component';

describe('MainIComponent', () => {
  let component: MainIComponent;
  let fixture: ComponentFixture<MainIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
