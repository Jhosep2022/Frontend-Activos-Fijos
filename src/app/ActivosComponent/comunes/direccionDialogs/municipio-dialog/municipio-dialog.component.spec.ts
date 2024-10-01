import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipioDialogComponent } from './municipio-dialog.component';

describe('MunicipioDialogComponent', () => {
  let component: MunicipioDialogComponent;
  let fixture: ComponentFixture<MunicipioDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MunicipioDialogComponent]
    });
    fixture = TestBed.createComponent(MunicipioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
