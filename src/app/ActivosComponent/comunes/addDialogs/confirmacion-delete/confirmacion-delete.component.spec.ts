import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionDeleteComponent } from './confirmacion-delete.component';

describe('ConfirmacionDeleteComponent', () => {
  let component: ConfirmacionDeleteComponent;
  let fixture: ComponentFixture<ConfirmacionDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmacionDeleteComponent]
    });
    fixture = TestBed.createComponent(ConfirmacionDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
