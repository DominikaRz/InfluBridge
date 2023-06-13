import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsBComponent } from './settings-b.component';

describe('SettingsBComponent', () => {
  let component: SettingsBComponent;
  let fixture: ComponentFixture<SettingsBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsBComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
