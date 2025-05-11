import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';

import { KpisComponent } from './kpis/kpis.component';
import { ChartsComponent } from './charts/charts.component';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [DashboardComponent, KpisComponent, ChartsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    NgChartsModule,
    BrowserAnimationsModule // Necesario para Angular Material
  ],
  exports: [DashboardComponent] // Exporta los componentes que necesites usar fuera de este módulo
})
export class DashboardModule {}