import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisaEditComponent } from './divisa-edit.component';

describe('DivisaEditComponent', () => {
  let component: DivisaEditComponent;
  let fixture: ComponentFixture<DivisaEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DivisaEditComponent]
    });
    fixture = TestBed.createComponent(DivisaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
