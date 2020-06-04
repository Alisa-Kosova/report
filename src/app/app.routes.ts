import { Route } from '@angular/router';
import { EmployeesComponent } from './employees-module/components/employees/employees.component';

export const ROUTES: Route[] = [
  {path: 'employees', component: EmployeesComponent},
  {path: '', redirectTo: 'employees', pathMatch: 'full'}
];
