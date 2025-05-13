import { Routes } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { AlumnoComponent } from '../perfiles/alumno/alumno.component';
import { ProfesorComponent } from '../perfiles/profesor/profesor.component';
import { RegisterComponent } from '../auth/register/register.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { TablaEstudiantesComponent } from './visualizacion/tabla-estudiantes/tabla-estudiantes.component';
import { GestionarEstudiantesComponent } from './crud/gestionar-estudiantes/gestionar-estudiantes.component';


export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {   path: '',
        redirectTo: 'login', 
        pathMatch: 'full' 
    },
    {
        path: 'alumno',
        component: AlumnoComponent,
    },
    {
        path: 'profesor',
        component: ProfesorComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
    },
    {
        path: 'visualizacion',
        component: TablaEstudiantesComponent,

    },
    {
        path: 'crud',
        component: GestionarEstudiantesComponent,
    },
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];
