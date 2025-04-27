import { Routes } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { AlumnoComponent } from '../perfiles/alumno/alumno.component';
import { ProfesorComponent } from '../perfiles/profesor/profesor.component';
import { RegisterComponent } from '../auth/register/register.component';


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
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];
