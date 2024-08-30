import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionActividadesComponent } from './gestion-actividades.component';

describe('GestionActividadesComponent', () => {
  let component: GestionActividadesComponent;
  let fixture: ComponentFixture<GestionActividadesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionActividadesComponent]
    });
    fixture = TestBed.createComponent(GestionActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
