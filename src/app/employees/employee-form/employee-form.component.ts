import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

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
    private router: Router
  ) { 
    this.employeeForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      position: ['', Validators.required],
      hireDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Check if editing an existing employee
    const employeeToEdit = history.state.data;
    if (employeeToEdit) {
      this.isEditMode = true;
      this.employeeId = employeeToEdit.id;
      this.employeeForm.patchValue(employeeToEdit);
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
