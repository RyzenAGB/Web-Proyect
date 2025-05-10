import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-kpis',
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './kpis.component.html',
  styleUrl: './kpis.component.css'
})

export class KpisComponent {
  registros = 128;
  cambios = 12;
  alertas = 3;
}
