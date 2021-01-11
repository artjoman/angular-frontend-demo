import { Component } from '@angular/core';
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
  displayedColumns: string[] = ['uid','name', 'surname', 'phone', 'email', 'image'];

  constructor(private employeeService: EmployeeService) { }

  public showEmployees() {

    return this.employeeService.getEmployees().subscribe((result: Array<any>) => {
      this.dataSource = new MatTableDataSource(result);
    });
  }
}
