import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionMonedasComponent } from './gestion-monedas.component';

describe('GestionMonedasComponent', () => {
  let component: GestionMonedasComponent;
  let fixture: ComponentFixture<GestionMonedasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionMonedasComponent]
    });
    fixture = TestBed.createComponent(GestionMonedasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
