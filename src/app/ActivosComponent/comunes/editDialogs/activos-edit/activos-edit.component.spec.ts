import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivosEditComponent } from './activos-edit.component';

describe('ActivosEditComponent', () => {
  let component: ActivosEditComponent;
  let fixture: ComponentFixture<ActivosEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivosEditComponent]
    });
    fixture = TestBed.createComponent(ActivosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
