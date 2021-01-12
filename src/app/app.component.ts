import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'alpha-frontend';
  employeeList: any = [];
  dataSource = null;
  displayedColumns: string[] = ['uid', 'name', 'surname', 'phone', 'email', 'image'];
  searchByTextInput: string;
  filteredDataSource = null;
  @ViewChild('registrationForm', { static: true }) registrationForm: NgForm;
  model: any = {};

  error = "";
  success = "";

  constructor(private employeeService: EmployeeService) { }

  public showEmployees() {

    return this.employeeService.getEmployees().subscribe((result: Array<any>) => {
      this.dataSource = new MatTableDataSource(result);
    });
  }

  public getImageUrl(element: any) {
    if (element && element.image && element.image[0] && element.image[0].url) {
      return "https://alpha-bank-demo.herokuapp.com" + element.image[0].url;
    }
    return "assets/default-picture.png";
  }

  public searchByText() {
    return this.employeeService.getEmployees().subscribe((result: Array<any>) => {
      const filteredEmployees = result.filter(employee => {
        // console.log(Object.keys(employee));
        return Object.keys(employee).some(key => {
          if (typeof employee[key] == 'string') {
            return employee[key].toLowerCase().includes(this.searchByTextInput.toLowerCase());
          }
        });
      });
      console.log(filteredEmployees);
      this.filteredDataSource = new MatTableDataSource(filteredEmployees);
    });
  }

  createEmployee() {
    this.employeeService.createEmployee(this.model)

      .subscribe((success) => {
        console.log("Successfully created an employee");
        this.success = "Alpha Bank employee created";
        this.error = null;
      },
        (error: HttpErrorResponse) => {
          this.success = null;
          let concatError = "";
          console.log(error.error.data.errors);
          if (error && error.error && error.error.data && error.error.data.errors) {

            Object.keys(error.error.data.errors).forEach((key) => {
              error.error.data.errors[key].forEach((elementVal) => {
                concatError += elementVal + " ";
              });
              
            })
          }
          this.error = concatError;
        });
  }

  get diagnostic() { return JSON.stringify(this.registrationForm.value); }
}
