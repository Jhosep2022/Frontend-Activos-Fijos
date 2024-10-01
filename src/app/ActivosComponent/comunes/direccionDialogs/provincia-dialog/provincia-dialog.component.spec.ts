import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinciaDialogComponent } from './provincia-dialog.component';

describe('ProvinciaDialogComponent', () => {
  let component: ProvinciaDialogComponent;
  let fixture: ComponentFixture<ProvinciaDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProvinciaDialogComponent]
    });
    fixture = TestBed.createComponent(ProvinciaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
