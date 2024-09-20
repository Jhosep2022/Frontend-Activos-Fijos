import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionProyectosComponent } from './gestion-proyectos.component';

describe('GestionProyectosComponent', () => {
  let component: GestionProyectosComponent;
  let fixture: ComponentFixture<GestionProyectosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionProyectosComponent]
    });
    fixture = TestBed.createComponent(GestionProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
