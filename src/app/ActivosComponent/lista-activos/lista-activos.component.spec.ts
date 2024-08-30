import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaActivosComponent } from './lista-activos.component';

describe('ListaActivosComponent', () => {
  let component: ListaActivosComponent;
  let fixture: ComponentFixture<ListaActivosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaActivosComponent]
    });
    fixture = TestBed.createComponent(ListaActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
