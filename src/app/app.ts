import { CommonModule } from '@angular/common';
import { Component, NgModule, signal } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun, AlignmentType  } from 'docx';
import { saveAs } from 'file-saver';
import { EstudiantesService, Estudiante } from './1.0-services/estudiantes';
import { ActividadEstudiantes, Actividad } from './1.0-services/1.1-actividad/actividad-estudiantes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('1.0-frontend_bitacora');

  estudiante: Estudiante[] = [];
  // estudiante: Estudiante ={
  //   nombre: '',
  //   carne: '',
  //   carrera: '',
  //   telefono: '',
  //   fechaInicio: '',
  //   fechaFinalizacion: '',
  //   cantidadHoras: 0,
  //   coordUDB: '',
  //   institucion: '',
  //   coordInst: ''
  // }

  actividad: Actividad[] = [];

  constructor(private estudiantesService: EstudiantesService,private actividadEstudiantes: ActividadEstudiantes) {}

  ngOnInit(): void {
    const estudianteId = 1;
    const shard = 'ingenieria'; // ingenieria, administracion, multimedia

    this.estudiantesService.getEstudianteById(shard, estudianteId).subscribe({
      next: (data: Estudiante[]) => {
        this.estudiante = data;
        console.log(this.estudiante[0].nombre);
        console.log('Estudiante cargado:', data);
      },
      error: (err) => console.error('Error al obtener estudiante:', err)
    });

    this.actividadEstudiantes.getActividadesById(shard, estudianteId).subscribe({
      next: (data: Actividad[]) => {
        this.actividad = data;
        console.log('Actividades cargadas:', data);
      },
      error: (err) => console.error('Error al obtener actividades:', err)
    });

    console.log(this.estudiante);
    
  }

  exportWord() {
  const tableRows = [];

  // Filas
  tableRows.push(
    new TableRow({
      children: [
        new TableCell({ children: [new Paragraph("Fecha")] }),
        new TableCell({ children: [new Paragraph("Nombre")] }),
        new TableCell({ children: [new Paragraph("Descripción")] }),
        new TableCell({ children: [new Paragraph("Horas")] }),
      ],
    })
  );

  // estas son filas de actividades
  this.actividad.forEach(act => {
    tableRows.push(
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph(act.fecha)] }),
          new TableCell({ children: [new Paragraph(act.nombre)] }),
          new TableCell({ children: [new Paragraph(act.descripcion)] }),
          new TableCell({ children: [new Paragraph(act.horas.toString())] }),
        ],
      })
    );
  });

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({ children: [new TextRun({ text: "Bitácora de Actividades", bold: true })] }),
          new Paragraph({ text: " " }), 
          new Paragraph({ text: `estudiante: ${this.estudiante.nombre}, Carné: ${this.estudiante.carne}, Carrera: ${this.estudiante.carrera} Teléfono: ${this.estudiante.telefono}` }),
          new Paragraph({ text: `Coordinador UDB: ${this.estudiante.coordUDB}, Institución: ${this.estudiante.institucion}, Coordinador Institución: ${this.estudiante.coordInst}` }),
          new Paragraph({ text: `Fechas: ${this.estudiante.fechaInicio} - ${this.estudiante.fechaFinalizacion}` }),
          new Paragraph({ text: `Horas totales: ${this.estudiante.cantidadHoras}` }),
          new Paragraph({ text: " " }),
          new Table({ rows: tableRows,
            width: { size: 100, type: "pct" },
            alignment: AlignmentType.CENTER,
           }),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then(blob => {
    saveAs(blob, 'bitacora.docx');
  });
}
}

