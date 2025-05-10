// dashboard/dashboard.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpisComponent } from './kpis/kpis.component';
import { ChartsComponent } from './charts/charts.component';

@Component({
  selector: 'app-dashboard',
  standalone: true, // también standalone
  imports: [CommonModule, KpisComponent, ChartsComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {}
