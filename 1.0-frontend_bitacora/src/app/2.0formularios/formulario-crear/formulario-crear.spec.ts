import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCrear } from './formulario-crear';

describe('FormularioCrear', () => {
  let component: FormularioCrear;
  let fixture: ComponentFixture<FormularioCrear>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioCrear]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioCrear);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
