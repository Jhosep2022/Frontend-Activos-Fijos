import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloqueDialogComponent } from './bloque-dialog.component';

describe('BloqueDialogComponent', () => {
  let component: BloqueDialogComponent;
  let fixture: ComponentFixture<BloqueDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BloqueDialogComponent]
    });
    fixture = TestBed.createComponent(BloqueDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
