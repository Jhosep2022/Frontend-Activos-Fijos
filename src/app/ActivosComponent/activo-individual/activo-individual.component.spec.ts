import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivoIndividualComponent } from './activo-individual.component';

describe('ActivoIndividualComponent', () => {
  let component: ActivoIndividualComponent;
  let fixture: ComponentFixture<ActivoIndividualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivoIndividualComponent]
    });
    fixture = TestBed.createComponent(ActivoIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
