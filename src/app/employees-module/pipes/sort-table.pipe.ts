import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../../common/model/employee';
import { headerTable } from '../../common/model/header-table';

@Pipe({
  name: 'sortTable'
})

export class SortTablePipe implements PipeTransform {

  transform(employees: Employee[], order: string, sort: string): Employee[] {

    let sortField = this.findFieldName(sort);

    const ascending = (a, b) => {
      if (typeof (a[sortField]) === 'string' && typeof (b[sortField]) === 'string') {
        return a[sortField].localeCompare(b[sortField]);
      }
      return a[sortField] - b[sortField];
    };

    const descending = (a, b) => {
      if (typeof (a[sortField]) === 'string' && typeof (b[sortField]) === 'string') {
        return b[sortField].localeCompare(a[sortField]);
      }
      return b[sortField] - a[sortField];
    };

    if (sort) {
      if (order === 'inc') {
        employees.sort(ascending);
      } else if (order === 'dec') {
        employees.sort(descending);
      }
    }
    return employees;
  }

  findFieldName(sort) {
    for (let key in headerTable) {
      if (headerTable[key] === sort) return key;
    }
  }
}
