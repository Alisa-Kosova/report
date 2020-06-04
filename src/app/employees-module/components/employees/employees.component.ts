import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../common/model/employee';
import { headerTable } from '../../../common/model/header-table';
import { EmployeesService } from '../../../services/employees-service.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})

export class EmployeesComponent implements OnInit {
  public employees: Employee[];
  public employeesHead = [];
  public sort: string;
  public order: string = 'inc';
  public activeElement: Employee;

  constructor(private employeesService: EmployeesService) {
  }

  ngOnInit(): void {
    this.getHeaderTable();
    this.updateEmployees();
  }

  updateEmployees() {
    this.employeesService.getEmployees().subscribe((employees) => {
      this.employees = employees;
    });
  }

  private getHeaderTable() {
    for (let key in headerTable) {
      this.employeesHead.push(headerTable[key])
    }
  }

  public setSort(headName, target) {
    if (headName !== 'Превью' && target.className !== 'table-emploees__cursor') {
      this.sort = headName;
    } else if (headName === 'Превью') this.sort = undefined;

    this.order === 'inc' ? this.order = 'dec' : this.order = 'inc';
  }

  public searchEmployee(event) {
    this.employees = event;
  }

  setActive(event) {
    this.activeElement = event;
    this.employeesService.activeEmployeeId = event._id;
  }
}
