import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioEliminar } from './formulario-eliminar';

describe('FormularioEliminar', () => {
  let component: FormularioEliminar;
  let fixture: ComponentFixture<FormularioEliminar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioEliminar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioEliminar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
