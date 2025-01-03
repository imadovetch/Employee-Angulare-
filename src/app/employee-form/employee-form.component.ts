import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';  

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  employeeForm: FormGroup;
  isEditMode = false;
  employeeId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute // Import ActivatedRoute
  ) { 
    this.employeeForm = this.fb.group({
      id: [uuidv4()],   // Default UUID for new employees
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      position: ['', Validators.required],
      hireDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Check if there is an 'id' in the URL
    this.route.paramMap.subscribe(params => {
      const id = params.get('id'); // Get the employee ID from the route
      if (id) {
        this.isEditMode = true;
        this.employeeId = id;
        this.loadEmployeeData(id); // Fetch employee data if editing
      }
    });
  }

  // Load the employee data for editing
  loadEmployeeData(id: string): void {
    const employeeToEdit = this.employeeService.getEmployeeById(id); // Fetch employee from service
    if (employeeToEdit) {
      this.employeeForm.patchValue(employeeToEdit); // Update the form with employee data
    } else {
      console.error('Employee not found');
    }
  }

  // Add or update employee
  onSubmit(): void {
    if (this.employeeForm.valid) {
      if (this.isEditMode && this.employeeId) {
        this.employeeService.updateEmployee(this.employeeForm.value);
      } else {
        this.employeeService.addEmployee(this.employeeForm.value);
      }
      this.router.navigate(['/employees']);
    }
  }

  // Reset form
  resetForm(): void {
    this.employeeForm.reset();
  }
}
