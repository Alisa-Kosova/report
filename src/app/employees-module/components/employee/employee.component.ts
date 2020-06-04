import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../../../common/model/employee';
import { EmployeesService } from '../../../services/employees-service.service';

@Component({
  selector: '[app-employee]',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})

export class EmployeeComponent implements OnInit {
  public address: string;
  public url: any;

  @Input('app-employee') employee;

  constructor(private employeesService: EmployeesService) { }

  ngOnInit(): void {
    this.createAddress();
    this.url = this.employeesService.decodePhoto(this.employee);
  }

  createAddress() {
    if (this.employee.address) {
      const addressArr = [];
      Object.keys(this.employee.address).forEach(key => {
        if (key === 'city' || key === 'street' || key === 'house' || key === 'flat') {        
          addressArr.push(this.employee.address[key]);
        }
      });
      this.address = addressArr.join(' ');
    }
  }

}
