import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleBackComponent } from './example-back.component';

describe('ExampleBackComponent', () => {
  let component: ExampleBackComponent;
  let fixture: ComponentFixture<ExampleBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleBackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExampleBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
