import { TestBed } from '@angular/core/testing';
import { EmployeeService } from './employee.service';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let mockLocalStorage: { [key: string]: string };

  beforeEach(() => {
    mockLocalStorage = {};

    // Mock localStorage functions
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return mockLocalStorage[key] || null;
    });

    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
      mockLocalStorage[key] = value;
    });

    spyOn(localStorage, 'removeItem').and.callFake((key: string) => {
      delete mockLocalStorage[key];
    });

    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an employee to localStorage', () => {
    const employee = { id: '1', name: 'John Doe', email: 'john@example.com' };
    service.addEmployee(employee);

    const storedEmployees = JSON.parse(mockLocalStorage['employees']);
    expect(storedEmployees.length).toBe(1);
    expect(storedEmployees[0].id).toBe('1');
  });

  it('should retrieve all employees from localStorage', () => {
    const employees = [
      { id: '1', name: 'John Doe', email: 'john@example.com' },
      { id: '2', name: 'Jane Doe', email: 'jane@example.com' }
    ];
    mockLocalStorage['employees'] = JSON.stringify(employees);

    const retrievedEmployees = service.getEmployees();
    expect(retrievedEmployees.length).toBe(2);
    expect(retrievedEmployees[0].name).toBe('John Doe');
  });

  it('should get an employee by ID', () => {
    const employees = [
      { id: '1', name: 'John Doe', email: 'john@example.com' },
      { id: '2', name: 'Jane Doe', email: 'jane@example.com' }
    ];
    mockLocalStorage['employees'] = JSON.stringify(employees);

    const employee = service.getEmployeeById('1');
    expect(employee.name).toBe('John Doe');
  });

  it('should update an employee', () => {
    const employees = [
      { id: '1', name: 'John Doe', email: 'john@example.com' }
    ];
    mockLocalStorage['employees'] = JSON.stringify(employees);

    const updatedEmployee = { id: '1', name: 'John Smith', email: 'johnsmith@example.com' };
    service.updateEmployee(updatedEmployee);

    const storedEmployees = JSON.parse(mockLocalStorage['employees']);
    expect(storedEmployees[0].name).toBe('John Smith');
  });

  it('should delete an employee by ID', () => {
    const employees = [
      { id: '1', name: 'John Doe', email: 'john@example.com' },
      { id: '2', name: 'Jane Doe', email: 'jane@example.com' }
    ];
    mockLocalStorage['employees'] = JSON.stringify(employees);

    service.deleteEmployee('1');

    const storedEmployees = JSON.parse(mockLocalStorage['employees']);
    expect(storedEmployees.length).toBe(1);
    expect(storedEmployees[0].id).toBe('2');
  });
});
