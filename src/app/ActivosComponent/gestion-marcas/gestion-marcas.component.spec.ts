import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionMarcasComponent } from './gestion-marcas.component';

describe('GestionMarcasComponent', () => {
  let component: GestionMarcasComponent;
  let fixture: ComponentFixture<GestionMarcasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionMarcasComponent]
    });
    fixture = TestBed.createComponent(GestionMarcasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
