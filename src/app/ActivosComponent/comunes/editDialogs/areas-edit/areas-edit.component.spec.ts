import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasEditComponent } from './areas-edit.component';

describe('AreasEditComponent', () => {
  let component: AreasEditComponent;
  let fixture: ComponentFixture<AreasEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AreasEditComponent]
    });
    fixture = TestBed.createComponent(AreasEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
