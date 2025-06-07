import { Routes } from '@angular/router';
import { Bienvenido } from './bienvenido/bienvenido';
import { Login } from './login/login';

export const routes: Routes = [
  { path: '', redirectTo: 'bienvenido', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'bienvenido', component: Bienvenido },
];
