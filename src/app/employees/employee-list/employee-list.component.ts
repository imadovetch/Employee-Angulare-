import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: any[] = [];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  // Fetch employees from EmployeeService
  getEmployees(): void {
    this.employees = this.employeeService.getEmployees();
  }

  // Handle employee deletion
  deleteEmployee(id: string): void {
    this.employeeService.deleteEmployee(id);
    this.getEmployees(); // Refresh the list after deletion
  }

}
