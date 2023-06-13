import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryBComponent } from './history-b.component';

describe('HistoryBComponent', () => {
  let component: HistoryBComponent;
  let fixture: ComponentFixture<HistoryBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryBComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
