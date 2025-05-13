import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../services/student.service'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import * as XLSX from 'xlsx';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import * as Papa from 'papaparse';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

(jsPDF as any).autoTable = autoTable;

@Component({ 
  selector: 'app-tabla-estudiantes',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatPaginatorModule
  ],
  templateUrl: './tabla-estudiantes.component.html',
  styleUrls: ['./tabla-estudiantes.component.css']
})
export class TablaEstudiantesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'nombre', 'fecha_registro'];
  dataSource = new MatTableDataSource<any>();
  filterText = '';
  loading = true;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    
    this.studentService.getEstudiantes().subscribe((data) => {
      this.dataSource.data = data;
      this.loading = false;
    });

    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'nombre': return item.nombre.toLowerCase();
        case 'fecha_registro': return new Date(item.fecha_registro);
        default: return item[property];
      }
    };
  }

  ngAfterViewInit(): void {
    // Asignar el paginador y el ordenamiento después de que las vistas se hayan inicializado
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log('Paginator:', this.paginator); // Depuración
    console.log('Sort:', this.sort); // Depuración
  }

  filtrar() {
    this.dataSource.filter = this.filterText.trim().toLowerCase();

    // Si se filtran los datos, reinicia la paginación
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  exportarExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.filteredData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Estudiantes');
    XLSX.writeFile(wb, 'estudiantes.xlsx');
  }

  cargarArchivo(event: any): void {
    const archivo: File = event.target.files[0];
    const lector: FileReader = new FileReader();

    if (archivo.name.endsWith('.json')) {
      lector.onload = (e: any) => {
        const contenido = e.target.result;
        const jsonData = JSON.parse(contenido);
        this.dataSource.data = jsonData;

        // Reasignar el paginador y el ordenamiento después de cargar nuevos datos
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        // Forzar la actualización del paginador
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      };

      lector.readAsText(archivo);
    } else if (archivo.name.endsWith('.csv')) {
      Papa.parse(archivo, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          this.dataSource.data = result.data;

          // Reasignar el paginador y el ordenamiento después de cargar nuevos datos
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          // Forzar la actualización del paginador
          if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
          }
        },
        error: (error) => {
          console.error('Error al procesar el archivo CSV:', error);
        }
      });
    } else {
      console.error('Formato de archivo no soportado. Por favor, cargue un archivo JSON o CSV.');
    }

    lector.readAsText(archivo);
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