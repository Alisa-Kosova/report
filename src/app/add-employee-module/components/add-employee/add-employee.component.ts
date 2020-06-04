import { Component, Output, EventEmitter } from '@angular/core';
import { BaseEmployeeComponent } from '../base-employee/base-employee.component';
import { PopupService } from '../../../services/popup.service';
import { EmployeesService } from '../../../services/employees-service.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: '../base-employee/base-employee.component.html',
  styleUrls: ['../base-employee/base-employee.component.scss']
})

export class AddEmployeeComponent extends BaseEmployeeComponent {

  constructor(popupService: PopupService, employeesService: EmployeesService) {
    super(popupService, employeesService);
  }

  ngOnInit(): void {
  }

  saveEmployee() {
    if (this.employee.name && this.employee.surname) {
      this.addData();
      this.employeesService.createEmployee(this.formData).subscribe((res) => {
        if (res) {
          this.popupService.close();
        }
      });
    }
  }

}
