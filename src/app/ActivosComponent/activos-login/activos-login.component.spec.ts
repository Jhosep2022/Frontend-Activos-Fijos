import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivosLoginComponent } from './activos-login.component';

describe('ActivosLoginComponent', () => {
  let component: ActivosLoginComponent;
  let fixture: ComponentFixture<ActivosLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivosLoginComponent]
    });
    fixture = TestBed.createComponent(ActivosLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
