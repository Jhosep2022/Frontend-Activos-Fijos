import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDepreciacionComponent } from './gestion-depreciacion.component';

describe('GestionDepreciacionComponent', () => {
  let component: GestionDepreciacionComponent;
  let fixture: ComponentFixture<GestionDepreciacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionDepreciacionComponent]
    });
    fixture = TestBed.createComponent(GestionDepreciacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
