import { Routes } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { AlumnoComponent } from '../perfiles/alumno/alumno.component';
import { ProfesorComponent } from '../perfiles/profesor/profesor.component';
import { RegisterComponent } from '../auth/register/register.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { TablaEstudiantesComponent } from './visualizacion/tabla-estudiantes/tabla-estudiantes.component';
import { GestionarEstudiantesComponent } from './crud/gestionar-estudiantes/gestionar-estudiantes.component';
import { AuthGuard } from './auth/auth.guard';
import { GuestGuard } from './auth/guest.guard';


export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [GuestGuard], // Solo accesible si no está autenticado
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [GuestGuard], // Solo accesible si no está autenticado
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard], // Solo accesible si está autenticado
    },
    {
        path: 'crud',
        component: GestionarEstudiantesComponent,
        canActivate: [AuthGuard], // Solo accesible si está autenticado
    },
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full',
    },
];
