import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ResizeColumnDirective } from './directives/resize-column.directive';
import { SortTablePipe } from './pipes/sort-table.pipe';
import { PopupModule } from '../popup-module/popup.module';
import { RouterModule } from '@angular/router';
import { ROUTES } from '../app.routes';

@NgModule({
  declarations: [EmployeesComponent, EmployeeComponent, SearchBarComponent, ResizeColumnDirective, SortTablePipe],
  imports: [CommonModule, FormsModule, RouterModule.forRoot(ROUTES), PopupModule],
  exports: [EmployeesComponent, EmployeeComponent, SearchBarComponent],
})
export class EmployeesModule { }