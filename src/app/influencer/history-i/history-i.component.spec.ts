import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryIComponent } from './history-i.component';

describe('HistoryIComponent', () => {
  let component: HistoryIComponent;
  let fixture: ComponentFixture<HistoryIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
