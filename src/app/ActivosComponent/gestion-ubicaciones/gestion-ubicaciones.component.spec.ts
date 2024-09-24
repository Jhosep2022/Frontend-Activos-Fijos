import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionUbicacionesComponent } from './gestion-ubicaciones.component';

describe('GestionUbicacionesComponent', () => {
  let component: GestionUbicacionesComponent;
  let fixture: ComponentFixture<GestionUbicacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionUbicacionesComponent]
    });
    fixture = TestBed.createComponent(GestionUbicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
