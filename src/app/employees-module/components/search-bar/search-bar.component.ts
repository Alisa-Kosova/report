import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { EmployeesService } from '../../../services/employees-service.service';
import { PopupService } from '../../../services/popup.service';
import { AddEmployeeComponent } from '../../../add-employee-module/components/add-employee/add-employee.component';
import { EditEmployeeComponent } from '../../../add-employee-module/components/edit-employee/edit-employee.component';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})

export class SearchBarComponent implements OnInit, OnDestroy {
  private userSearchUpdate$ = new Subject<string>();
  private unUserSearchUpdate: Subscription;

  @Output() updateEmployees = new EventEmitter();
  @Output() searchEmployee = new EventEmitter();

  constructor(private employeesService: EmployeesService, private popupService: PopupService) { }

  ngOnInit(): void {
    this.unUserSearchUpdate = this.userSearchUpdate$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(event => {
        return this.employeesService.searchEmployee(event);
      }))
      .subscribe(
        result => this.searchEmployee.emit(result),
        error => console.log(error)
      );
  }

  search(value) {
    this.userSearchUpdate$.next(value);
  }

  addEmpoyee() {
    this.popupService.open(AddEmployeeComponent);
  }

  editEmpoyee() {
    if (typeof this.employeesService.activeEmployeeId !== "undefined") {
      this.popupService.open(EditEmployeeComponent);
    } else {
      alert('Выберите сотрудника');
    }
  }

  deleteEmpoyee() {
    if (typeof this.employeesService.activeEmployeeId !== "undefined") {
      const answer = confirm(`Удалить сотрудника`);
      if (answer) {
        this.employeesService.deleteEmployee(this.employeesService.activeEmployeeId).subscribe(
          result => this.updateEmployees.emit(result),
          error => console.log(error)
        );
      }
    } else {
      alert('Выберите сотрудника');
    }
  }

  ngOnDestroy() {
    this.unUserSearchUpdate.unsubscribe();
  }
}
