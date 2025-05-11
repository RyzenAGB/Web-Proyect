// // charts.component.ts
// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { NgChartsModule } from 'ng2-charts';
// import { MatCardModule } from '@angular/material/card'; 
// import { MatIconModule } from '@angular/material/icon';

// import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

// @Component({
//   selector: 'app-charts',
//   standalone: true,
//   imports: [CommonModule, NgChartsModule, MatCardModule, MatIconModule],
//   templateUrl: './charts.component.html',
//   styleUrls: ['./charts.component.css']
// })
// export class ChartsComponent {
//   // Configuración de gráfico de barras
//   public barChartOptions: ChartConfiguration['options'] = {
//     responsive: true,
//   };

//   public barChartType: ChartType = 'bar';
//   public barChartData: ChartData<'bar'> = {
//     labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
//     datasets: [
//       { data: [10, 20, 30, 40, 50], label: 'Registros' }
//     ],
//   };

//   // Configuración de gráfico de pastel
//   public pieChartOptions: ChartConfiguration['options'] = {
//     responsive: true,
//   };

//   public pieChartData: ChartData<'pie'> = {
//     labels: ['A', 'B', 'C'],
//     datasets: [
//       { data: [300, 500, 100] }
//     ],
//   };

//   // Configuración de gráfico de línea
//   public lineChartOptions: ChartConfiguration['options'] = {
//     responsive: true,
//   };

//   public lineChartData: ChartData<'line'> = {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
//     datasets: [
//       {
//         data: [65, 59, 80, 81, 56],
//         label: 'Serie 1',
//         borderColor: 'blue',
//         fill: false
//       },
//       {
//         data: [28, 48, 40, 19, 86],
//         label: 'Serie 2',
//         borderColor: 'red',
//         fill: false
//       }
//     ]
//   };
// }
import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { DashboardService } from '../../services/dashboard.service';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
  imports: [CommonModule, NgChartsModule, MatCardModule, MatIconModule],
})
export class ChartsComponent implements OnInit {
  // Configuración de las opciones del gráfico de barras
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  // Configuración de los datos del gráfico de barras
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        label: 'Registros por Mes',
        data: [],
        backgroundColor: '#42A5F5',
      },
    ],
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getRegistrosPorMes().subscribe((registros) => {
      this.barChartData.labels = registros.map((r) => r.mes);
      this.barChartData.datasets[0].data = registros.map((r) => r.total);
    });
  }
}