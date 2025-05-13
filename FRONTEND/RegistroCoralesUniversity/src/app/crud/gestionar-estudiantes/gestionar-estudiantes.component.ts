import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { StudentService } from '../../services/student.service';
import { AuthService } from '../../../services/auth.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-gestionar-estudiantes',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './gestionar-estudiantes.component.html',
  styleUrls: ['./gestionar-estudiantes.component.css']
})
export class GestionarEstudiantesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'fecha_registro', 'acciones'];
  dataSource = new MatTableDataSource<any>();
  estudianteForm!: FormGroup;
  loading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private studentService: StudentService,
    private authService: AuthService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

ngOnInit(): void {
  this.estudianteForm = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    fecha_registro: ['', Validators.required]
  });

  this.displayedColumns = this.puedeEditar
    ? ['id', 'nombre', 'apellido', 'fecha_registro', 'acciones']
    : ['id', 'nombre', 'apellido', 'fecha_registro'];

  this.cargarEstudiantes();
}

  get puedeEditar(): boolean {
    return this.authService.obtenerUsuario()?.rol === 'profesor';
  }

  cargarEstudiantes() {
    this.studentService.getEstudiantesDetallado().subscribe((data) => {
      console.log(data); 
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    });
  }

  guardarEstudiante() {
  if (this.estudianteForm.invalid) return;

  const datos = this.estudianteForm.value;

  if (this.estudianteEditando) {
    this.studentService.actualizarEstudiante(this.estudianteEditando.id, datos).subscribe(() => {
      this.snackBar.open('Estudiante actualizado', 'Cerrar', { duration: 3000 });
      this.estudianteForm.reset();
      this.estudianteEditando = null;
      this.cargarEstudiantes();
    });
  } else {
    this.studentService.crearEstudiante(datos).subscribe(() => {
      this.snackBar.open('Estudiante creado correctamente', 'Cerrar', { duration: 3000 });
      this.estudianteForm.reset();
      this.cargarEstudiantes();
    });
  }
}

  eliminarEstudiante(id: number) {
    if (!confirm('¿Deseas eliminar este estudiante?')) return;

    this.studentService.eliminarEstudiante(id).subscribe(() => {
      this.snackBar.open('Estudiante eliminado', 'Cerrar', { duration: 3000 });
      this.cargarEstudiantes();
    });
  }
  estudianteEditando: any = null;

  editar(estudiante: any) {
    this.estudianteEditando = estudiante;
    this.estudianteForm.patchValue(estudiante);
  }
  
  generarPDF(): void {
  const doc = new jsPDF();
  const columnas = ['ID', 'Nombre', 'Fecha de Registro'];
  const filas = this.dataSource.filteredData.map((est: any) => [
    est.id,
    est.nombre,
    est.fecha_registro,
  ]);

  doc.text('Reporte de Estudiantes', 10, 10);
  autoTable(doc, {
    head: [columnas],
    body: filas,
    startY: 20,
  });

  doc.save('reporte-estudiantes.pdf');
}
}
