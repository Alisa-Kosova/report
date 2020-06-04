import { Component, OnInit, Input } from '@angular/core';
import { PopupService } from '../../../services/popup.service';
import { EmployeesService } from '../../../services/employees-service.service';
import { Employee } from '../../../common/model/employee';

@Component({
  selector: 'app-base-employee',
  templateUrl: './base-employee.component.html',
  styleUrls: ['./base-employee.component.scss']
})
export class BaseEmployeeComponent implements OnInit {
  public employee: Employee;
  public urlPhoto: any;
  public formData = new FormData();

  constructor(public popupService: PopupService, public employeesService: EmployeesService) {
    this.employee = new Employee();
    this.employee.address = {};
  }

  ngOnInit(): void {
  }

  getEmployee() {
    this.employeesService.getEmployeeByID(this.employeesService.activeEmployeeId).subscribe((employee) => {
      this.employee = employee;
      this.urlPhoto = this.employeesService.decodePhoto(employee);
      if (!this.employee.address) this.employee.address = {};
    });
  }

  closePopup() {
    this.popupService.close();
  }

  selectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.urlPhoto = event.target.result;
      }
      this.formData.append('file', event.target.files[0]);
    }
  }

  addData() {
    Object.keys(this.employee).forEach(key => {
      this.formData.set(key, this.employee[key]);
    });
    Object.keys(this.employee.address).forEach(key => {
      this.formData.set(key, this.employee.address[key]);
    });
  }

  saveEmployee() {
  }
}
