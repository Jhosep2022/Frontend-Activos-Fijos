import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivoProyectoComponent } from './activo-proyecto.component';

describe('ActivoProyectoComponent', () => {
  let component: ActivoProyectoComponent;
  let fixture: ComponentFixture<ActivoProyectoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivoProyectoComponent]
    });
    fixture = TestBed.createComponent(ActivoProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
