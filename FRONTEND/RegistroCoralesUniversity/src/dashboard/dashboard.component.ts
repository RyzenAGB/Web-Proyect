import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpisComponent } from './kpis/kpis.component';
import { ChartsComponent } from './charts/charts.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    KpisComponent,
    ChartsComponent,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {}