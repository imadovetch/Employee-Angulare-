import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private localStorageKey = 'employees';

  constructor() { }

  // Add a new employee
  addEmployee(employee: any): void {
    const employees = this.getEmployees();
    employees.push(employee);
    localStorage.setItem(this.localStorageKey, JSON.stringify(employees));
  }

  // Get all employees
  getEmployees(): any[] {
    const employees = localStorage.getItem(this.localStorageKey);
    return employees ? JSON.parse(employees) : [];
  }

  // Get employee by ID
  getEmployeeById(id: string): any {
    const employees = this.getEmployees();
    return employees.find(emp => emp.id === id);
  }

  // Update an employee
  updateEmployee(updatedEmployee: any): void {
    const employees = this.getEmployees();
    const index = employees.findIndex(emp => emp.id === updatedEmployee.id);
    if (index !== -1) {
      employees[index] = updatedEmployee;
      localStorage.setItem(this.localStorageKey, JSON.stringify(employees));
    }
  }

  // Delete an employee
  deleteEmployee(id: string): void {
    const employees = this.getEmployees();
    const updatedEmployees = employees.filter(emp => emp.id !== id);
    localStorage.setItem(this.localStorageKey, JSON.stringify(updatedEmployees));
  }
}
