import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private configUrl = 'https://alpha-bank-demo.herokuapp.com/bank-employees';

  constructor(private http: HttpClient) { }

  public getEmployees(): any {
    return this.http.get(this.configUrl);
  }

  public createEmployee(employeeData) {
    return this.http.post(this.configUrl, employeeData);
  }
}
