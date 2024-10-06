import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEstadousoComponent } from './gestion-estadouso.component';

describe('GestionEstadousoComponent', () => {
  let component: GestionEstadousoComponent;
  let fixture: ComponentFixture<GestionEstadousoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionEstadousoComponent]
    });
    fixture = TestBed.createComponent(GestionEstadousoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
