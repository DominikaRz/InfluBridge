import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsIComponent } from './settings-i.component';

describe('SettingsIComponent', () => {
  let component: SettingsIComponent;
  let fixture: ComponentFixture<SettingsIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
