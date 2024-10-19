import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionModelosComponent } from './gestion-modelos.component';

describe('GestionModelosComponent', () => {
  let component: GestionModelosComponent;
  let fixture: ComponentFixture<GestionModelosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionModelosComponent]
    });
    fixture = TestBed.createComponent(GestionModelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
