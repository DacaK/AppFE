import { AllEmployeesListComponent } from './employees/all-employees-list/all-employees-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Role } from '../entities/employee/role';
import { AuthGuard } from '../auth/auth.guard';

const pagesRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'employees',
     component: AllEmployeesListComponent,
      canActivate: [AuthGuard],
    data:{roles: [Role.ADMIN]} },
]

@NgModule({
    imports: [RouterModule.forChild(pagesRoutes)],
    exports: [RouterModule],
    declarations: [],
})
export class PagesRoutingModule { }