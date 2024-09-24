import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroActivosComponent } from './registro-activos.component';

describe('RegistroActivosComponent', () => {
  let component: RegistroActivosComponent;
  let fixture: ComponentFixture<RegistroActivosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroActivosComponent]
    });
    fixture = TestBed.createComponent(RegistroActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
