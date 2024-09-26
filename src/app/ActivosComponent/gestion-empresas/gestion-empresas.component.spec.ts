import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEmpresasComponent } from './gestion-empresas.component';

describe('GestionEmpresasComponent', () => {
  let component: GestionEmpresasComponent;
  let fixture: ComponentFixture<GestionEmpresasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionEmpresasComponent]
    });
    fixture = TestBed.createComponent(GestionEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
