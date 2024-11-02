import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelosEditComponent } from './modelos-edit.component';

describe('ModelosEditComponent', () => {
  let component: ModelosEditComponent;
  let fixture: ComponentFixture<ModelosEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModelosEditComponent]
    });
    fixture = TestBed.createComponent(ModelosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
