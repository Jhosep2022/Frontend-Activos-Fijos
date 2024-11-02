import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustodioEditComponent } from './custodio-edit.component';

describe('CustodioEditComponent', () => {
  let component: CustodioEditComponent;
  let fixture: ComponentFixture<CustodioEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustodioEditComponent]
    });
    fixture = TestBed.createComponent(CustodioEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
