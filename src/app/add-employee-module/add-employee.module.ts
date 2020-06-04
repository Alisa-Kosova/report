import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BaseEmployeeComponent } from './components/base-employee/base-employee.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';

@NgModule({
  declarations: [BaseEmployeeComponent, EditEmployeeComponent, AddEmployeeComponent],
  imports: [CommonModule, FormsModule],
  entryComponents: [BaseEmployeeComponent, EditEmployeeComponent, AddEmployeeComponent],
  exports: [BaseEmployeeComponent, EditEmployeeComponent, AddEmployeeComponent],
})
export class AddEmployeeModule { }