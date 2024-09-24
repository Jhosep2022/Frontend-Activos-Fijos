import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCustodiosComponent } from './gestion-custodios.component';

describe('GestionCustodiosComponent', () => {
  let component: GestionCustodiosComponent;
  let fixture: ComponentFixture<GestionCustodiosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionCustodiosComponent]
    });
    fixture = TestBed.createComponent(GestionCustodiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
