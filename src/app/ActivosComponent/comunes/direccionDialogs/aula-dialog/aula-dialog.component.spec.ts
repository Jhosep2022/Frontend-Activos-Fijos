import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AulaDialogComponent } from './aula-dialog.component';

describe('AulaDialogComponent', () => {
  let component: AulaDialogComponent;
  let fixture: ComponentFixture<AulaDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AulaDialogComponent]
    });
    fixture = TestBed.createComponent(AulaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
