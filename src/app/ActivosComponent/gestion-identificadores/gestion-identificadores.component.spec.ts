import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionIdentificadoresComponent } from './gestion-identificadores.component';

describe('GestionIdentificadoresComponent', () => {
  let component: GestionIdentificadoresComponent;
  let fixture: ComponentFixture<GestionIdentificadoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionIdentificadoresComponent]
    });
    fixture = TestBed.createComponent(GestionIdentificadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
