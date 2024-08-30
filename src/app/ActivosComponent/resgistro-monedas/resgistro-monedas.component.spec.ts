import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResgistroMonedasComponent } from './resgistro-monedas.component';

describe('ResgistroMonedasComponent', () => {
  let component: ResgistroMonedasComponent;
  let fixture: ComponentFixture<ResgistroMonedasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResgistroMonedasComponent]
    });
    fixture = TestBed.createComponent(ResgistroMonedasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
