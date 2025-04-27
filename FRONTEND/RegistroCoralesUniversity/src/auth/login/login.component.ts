import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  correo = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login(this.correo, this.password).subscribe({
      next: () => {
        const user = this.auth.obtenerUsuario();
        if (user.rol === 'alumno') this.router.navigate(['/alumno']);
        else if (user.rol === 'profesor') this.router.navigate(['/profesor']);
      },
      error: err => {
        this.error = err.error?.error || 'Error al iniciar sesión';
      }
    });
  }
}
