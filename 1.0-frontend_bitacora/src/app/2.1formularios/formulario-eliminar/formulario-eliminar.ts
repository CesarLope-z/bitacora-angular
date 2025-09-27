import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-formulario-crear',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule  ],
  templateUrl: './formulario-eliminar.html',
  styleUrl: './formulario-eliminar.css'
})
export class FormularioEliminar {

  form: FormGroup;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FormularioEliminar>
  ) {
    this.form = this.fb.group({
      id: ['', [Validators.required, Validators.min(1)]],
    });
  }

  eliminar() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value); // devuelve los datos al cerrar
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}