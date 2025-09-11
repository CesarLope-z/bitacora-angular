import { TestBed } from '@angular/core/testing';

import { ActividadEstudiantes } from './actividad-estudiantes';

describe('ActividadEstudiantes', () => {
  let service: ActividadEstudiantes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActividadEstudiantes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
