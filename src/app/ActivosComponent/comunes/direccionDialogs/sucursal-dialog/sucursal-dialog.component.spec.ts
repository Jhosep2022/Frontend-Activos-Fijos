import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalDialogComponent } from './sucursal-dialog.component';

describe('SucursalDialogComponent', () => {
  let component: SucursalDialogComponent;
  let fixture: ComponentFixture<SucursalDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SucursalDialogComponent]
    });
    fixture = TestBed.createComponent(SucursalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
