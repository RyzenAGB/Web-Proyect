// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MatCardModule } from '@angular/material/card';
// import { MatIconModule } from '@angular/material/icon';

// @Component({
//   selector: 'app-kpis',
//   imports: [CommonModule, MatCardModule, MatIconModule],
//   templateUrl: './kpis.component.html',
//   styleUrl: './kpis.component.css'
// })

// export class KpisComponent {
//   registros = 128;
//   cambios = 12;
//   alertas = 3;
// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { DashboardService, Kpis } from '../../services/dashboard.service';

@Component({
  selector: 'app-kpis',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './kpis.component.html',
  styleUrls: ['./kpis.component.css']
})
export class KpisComponent implements OnInit {
  kpis: Kpis | null = null;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
  this.dashboardService.getKpis().subscribe({
    next: (data) => {
      console.log('Datos recibidos:', data); // Verifica los datos aquí
      this.kpis = data;
    },
    error: (err) => {
      console.error('Error al obtener los KPIs:', err);
    }
  });
  }
}