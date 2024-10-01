import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DireccionDialogComponent } from './direccion-dialog.component';

describe('DireccionDialogComponent', () => {
  let component: DireccionDialogComponent;
  let fixture: ComponentFixture<DireccionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DireccionDialogComponent]
    });
    fixture = TestBed.createComponent(DireccionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
