// charts.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent {
  // Configuración de gráfico de barras
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };

  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
    datasets: [
      { data: [10, 20, 30, 40, 50], label: 'Registros' }
    ],
  };

  // Configuración de gráfico de pastel
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };

  public pieChartData: ChartData<'pie'> = {
    labels: ['A', 'B', 'C'],
    datasets: [
      { data: [300, 500, 100] }
    ],
  };

  // Configuración de gráfico de línea
  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };

  public lineChartData: ChartData<'line'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56],
        label: 'Serie 1',
        borderColor: 'blue',
        fill: false
      },
      {
        data: [28, 48, 40, 19, 86],
        label: 'Serie 2',
        borderColor: 'red',
        fill: false
      }
    ]
  };
}
