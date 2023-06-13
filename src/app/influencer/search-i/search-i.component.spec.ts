import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchIComponent } from './search-i.component';

describe('SearchIComponent', () => {
  let component: SearchIComponent;
  let fixture: ComponentFixture<SearchIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
