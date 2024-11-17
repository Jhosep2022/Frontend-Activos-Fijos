import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeloDialogComponent } from './modelo-dialog.component';

describe('ModeloDialogComponent', () => {
  let component: ModeloDialogComponent;
  let fixture: ComponentFixture<ModeloDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModeloDialogComponent]
    });
    fixture = TestBed.createComponent(ModeloDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
