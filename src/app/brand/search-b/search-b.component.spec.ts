import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBComponent } from './search-b.component';

describe('SearchBComponent', () => {
  let component: SearchBComponent;
  let fixture: ComponentFixture<SearchBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
