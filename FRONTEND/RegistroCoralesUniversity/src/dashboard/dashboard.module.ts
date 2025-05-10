import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';

import { KpisComponent } from './kpis/kpis.component';
import { ChartsComponent } from './charts/charts.component';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [DashboardComponent, KpisComponent, ChartsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    NgChartsModule
  ]
})
export class DashboardModule {}
