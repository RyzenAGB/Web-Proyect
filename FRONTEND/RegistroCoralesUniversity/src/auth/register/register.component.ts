import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})


export class RegisterComponent {
  usuario = {
    nombre: '',
    correo: '',
    password: '',
    rol: 'alumno' 
  };
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.register(this.usuario).subscribe(
      (response) => {
        // Si el registro es exitoso, muestra el mensaje de éxito
        this.successMessage = response.mensaje;
        this.errorMessage = null; // Limpiar cualquier mensaje de error previo
        this.router.navigate(['/dashboard']) // Redirige a la página de login (si lo deseas)
      },
      (error) => {
        // Si ocurre un error, muestra el mensaje de error
        this.successMessage = null; // Limpiar cualquier mensaje de éxito previo
        this.errorMessage = error.error.error || 'Hubo un error al registrar el usuario';
      }
    );
  }
}