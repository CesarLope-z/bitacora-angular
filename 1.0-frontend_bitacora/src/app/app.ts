import { CommonModule } from '@angular/common';
import { Component, NgModule, signal } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Document, ImageRun, Packer, Paragraph, Table, TableRow, TableCell, TextRun, AlignmentType, Alignment, Spacing  } from 'docx';
import { saveAs } from 'file-saver';
import { EstudiantesService, Estudiante } from './1.0-services/estudiantes';
import { ActividadEstudiantes, Actividad } from './1.0-services/1.1-actividad/actividad-estudiantes';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormularioCrear } from './2.0formularios/formulario-crear/formulario-crear';
import { FormularioEliminar } from './2.1formularios/formulario-eliminar/formulario-eliminar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

export class App {
  protected readonly title = signal('1.0-frontend_bitacora');

  // estudiante: Estudiante[] = [];
  estudiante: Estudiante[] =[{
    nombre: '',
    carne: '',
    carrera: '',
    telefono: '',
    fechaInicio: '',
    fechaFinalizacion: '',
    cantidadHoras: 0,
    coordUDB: '',
    institucion: '',
    coordInst: ''
  }];

  actividad: Actividad[] = [
    {
      fecha: '',
      nombre: '',
      descripcion: '',
      horas: 0
    }
  ];

  constructor(private estudiantesService: EstudiantesService,private actividadEstudiantes: ActividadEstudiantes, private dialog: MatDialog) {}

  abrirFormularioCrear() {
    this.dialog.open(FormularioCrear, {
      width: '400px',
      data: {} // aquí podrías pasar datos si quieres
    });
  }
  abrirFormularioEliminar() {
    this.dialog.open(FormularioEliminar, {
      width: '200px',
      data: {} // aquí podrías pasar datos si quieres
    });
  }

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

    // console.log(this.estudiante);
    
  }
  async loadImage(url: string): Promise<ArrayBuffer> {
  const response = await fetch(url);
  return await response.arrayBuffer();
}

  async exportWord() {
  const tableRows = [];
  const imageData = await this.loadImage("assets/udb_logo.png"); // 👈 imagen en assets


  // Filas
  tableRows.push(
    new TableRow({
      children: [
        // los encabesados en negrita
        new TableCell({
        shading: { fill: "D9D9D9" }, // fondo gris
        children: [
          new Paragraph({
            text: "No",
            alignment: AlignmentType.CENTER,   // opcional: centrar
            spacing: { before: 200, after: 200 }, // espacio arriba/abajo
            indent: { left: 200, right: 200 },    // espacio a los lados (simula padding)
          }),
        ],
      }),

        new TableCell({
        shading: { fill: "D9D9D9" }, // fondo gris
        children: [
          new Paragraph({
            text: "Fecha",
            alignment: AlignmentType.CENTER,   // opcional: centrar
            spacing: { before: 200, after: 200 }, // espacio arriba/abajo
            indent: { left: 200, right: 200 },    // espacio a los lados (simula padding)
          }),
        ],
      }),
        new TableCell({
        shading: { fill: "D9D9D9" }, // fondo gris
        children: [
          new Paragraph({
            text: "Actividades",
            alignment: AlignmentType.CENTER,   // opcional: centrar
            spacing: { before: 200, after: 200 }, // espacio arriba/abajo
            indent: { left: 200, right: 200 },    // espacio a los lados (simula padding)
          }),
        ],
      }),
        new TableCell({
        shading: { fill: "D9D9D9" }, // fondo gris
        children: [
          new Paragraph({
            text: "Nombre del Alumno",
            alignment: AlignmentType.CENTER,   // opcional: centrar
            spacing: { before: 200, after: 200 }, // espacio arriba/abajo
            indent: { left: 200, right: 200 },    // espacio a los lados (simula padding)
          }),
        ],
      }),
        new TableCell({
        shading: { fill: "D9D9D9" }, // fondo gris
        children: [
          new Paragraph({
            text: "Firma",
            alignment: AlignmentType.CENTER,   // opcional: centrar
            spacing: { before: 200, after: 200 }, // espacio arriba/abajo
            indent: { left: 200, right: 200 },    // espacio a los lados (simula padding)
          }),
        ],
      }),
        new TableCell({
        shading: { fill: "D9D9D9" }, // fondo gris
        children: [
          new Paragraph({
            text: "Horas ",
            alignment: AlignmentType.CENTER,   // opcional: centrar
            spacing: { before: 200, after: 200 }, // espacio arriba/abajo
            indent: { left: 200, right: 200 },    // espacio a los lados (simula padding)
          }),
        ],
      }),
      ],
    })
  );

  // estas son filas de actividades
  this.actividad.forEach(act => {
    console.log(act)
    tableRows.push(
      new TableRow({
        children: [

          new TableCell({
            children: [
              new Paragraph({
                text: String(this.actividad.indexOf(act) + 1), spacing: { before: 200, after: 200 }, // 👈 espacio arriba y abajo (en twips, 200 ≈ 0.2cm)
                indent: { left: 200, right: 200 },
              }),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph({
                text: act.fecha, spacing: { before: 200, after: 200 }, indent: { left: 200, right: 200 },
              }),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph({
                text: act.descripcion, spacing: { before: 200, after: 200 }, indent: { left: 200, right: 200 },
              }),
            ],
          }),
          //nombre
          new TableCell({
            children: [
              new Paragraph({
                text: this.estudiante[0].nombre, spacing: { before: 200, after: 200 }, indent: { left: 200, right: 200 },
              }),
            ],
          }),
          //firma
          new TableCell({ children: [new Paragraph( " " )] }),
          new TableCell({
            children: [
              new Paragraph({
                text: String(act.horas), spacing: { before: 200, after: 200 }, indent: { left: 200, right: 200 },
              }),
            ],
          })
        ],
      })
    );
  });
  // fs es de file system

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({ children: [new TextRun({ text: "UNIVERSIDAD DON BOSCO", bold: true }) ], alignment: AlignmentType.CENTER }),
          new Paragraph({ children: [new TextRun({ text: "CENTRO DE DESARROLLO DE CARRERA", bold: true })], alignment: AlignmentType.CENTER }),
          new Paragraph({ children: [new TextRun({ text: "BITACORA DE ASISTENCIA DE SERVICIO SOCIAL ESTUDIANTIL", bold: true })], alignment: AlignmentType.CENTER }),
          new Paragraph({ text: " " }), 
          new Paragraph({ //nombre, carne, carrera
            children: [
              new TextRun({  text: 'NOMBRE DEL ALUMNO: ', bold: true}),
              new TextRun({  text: `${this.estudiante[0].nombre}   `, bold: false }),
              new TextRun({  text: 'CARNÉ: ', bold: true}),
              new TextRun({  text: `${this.estudiante[0].carne}    `, bold: false }),
              new TextRun({  text: 'CARRERA: ', bold: true}),
              new TextRun({  text: `${this.estudiante[0].carrera}`, bold: false })
            ]}),
          new Paragraph({ //coord, institucion, coord inst
            children: [
              new TextRun({  text: 'COORDINADOR UDB: ', bold: true}),
              new TextRun({  text: `${this.estudiante[0].coordUDB || "        "}`, bold: false }),
              new TextRun({  text: 'INSTITUCIÓN: ', bold: true}),
              new TextRun({  text: `${this.estudiante[0].institucion || "        "}`, bold: false }),
              new TextRun({  text: 'COORDINADOR DE LA INSTITUCIÓN: ', bold: true}),
              new TextRun({  text: `${this.estudiante[0].coordInst || "         "}`, bold: false })
            ]}),
          new Paragraph({ //nombre, carne, carrera
            children: [
              new TextRun({  text: 'FECHA DE INICIO: ', bold: true}),
              new TextRun({  text: `${this.estudiante[0].fechaInicio}                `, bold: false }),
              new TextRun({  text: 'FECHA DE FINALIZACION: ', bold: true}),
              new TextRun({  text: `${this.estudiante[0].fechaFinalizacion}`, bold: false })
            ]}),
          new Paragraph({
            children: [
              new TextRun({  text: 'HORAS TOTALES: ',  bold: true }),
              new TextRun({  text: `${this.estudiante[0].cantidadHoras}`, bold: false })
            ]}),
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
    saveAs(blob, `bitacora_${this.estudiante[0].carne}.docx`);
  });
}
}

