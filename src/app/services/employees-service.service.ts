import { Injectable } from '@angular/core';
import { Employee } from '../common/model/employee';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})

export class EmployeesService {
  public activeEmployeeId: string;
  public url = 'http://localhost:3000/api/employees';

  constructor(private http: HttpClient, private domSanitizer: DomSanitizer) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url);
  }

  getEmployeeByID(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.url}/${id}`);
  }

  searchEmployee(surname: string) {
    const params = new HttpParams()
    .set('surname', surname);
    return this.http.get<Employee>(this.url, { params });
  }

  createEmployee(employee) {
    return this.http.post('http://localhost:3000/api/employees', employee);
  }

  updateEmployee(id: string, employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.url}/${id}`, employee);
  }

  deleteEmployee(id: string): Observable<Employee> {
    return this.http.delete<Employee>(`${this.url}/${id}`);
  }

  decodePhoto(employee) {
    if (employee.photo) {
      let TYPED_ARRAY = new Uint8Array(employee.photo.img.data.data);
      const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
      let base64String = btoa(STRING_CHAR);
      return this.domSanitizer.bypassSecurityTrustUrl('data: image / jpg; base64,' + base64String);
    }
  }
}

