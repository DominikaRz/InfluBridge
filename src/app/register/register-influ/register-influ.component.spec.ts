import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterInfluComponent } from './register-influ.component';

describe('RegisterInfluComponent', () => {
  let component: RegisterInfluComponent;
  let fixture: ComponentFixture<RegisterInfluComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterInfluComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterInfluComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
