import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

const routes: Routes = [
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employees/new', component: EmployeeFormComponent },
  { path: 'employees/edit/:id', component: EmployeeFormComponent },
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'employees', loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
