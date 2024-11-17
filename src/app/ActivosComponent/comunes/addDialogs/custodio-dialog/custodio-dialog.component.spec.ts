import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustodioDialogComponent } from './custodio-dialog.component';

describe('CustodioDialogComponent', () => {
  let component: CustodioDialogComponent;
  let fixture: ComponentFixture<CustodioDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustodioDialogComponent]
    });
    fixture = TestBed.createComponent(CustodioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
