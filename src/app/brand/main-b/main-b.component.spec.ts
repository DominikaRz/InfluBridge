import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBComponent } from './main-b.component';

describe('MainBComponent', () => {
  let component: MainBComponent;
  let fixture: ComponentFixture<MainBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainBComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
