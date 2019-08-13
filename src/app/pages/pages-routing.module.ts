import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Role } from '../entities/employee/role';
import { AuthGuard } from '../auth/auth.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AvailableVehiclesComponent } from './vehicles/available-vehicles/available-vehicles.component';
import { AllVehiclesListComponent } from './vehicles/all-vehicles-list/all-vehicles-list.component';
import { AllEmployeesListComponent } from './employees/all-employees-list/all-employees-list.component';
import { UnavailableVehiclesComponent } from './vehicles/unavailable-vehicles/unavailable-vehicles.component';
import { VehiclesDetailsComponent } from './vehicles/vehicles-details/vehicles-details.component';
import { TravelOrderComponent } from './travel-order/travel-order/travel-order.component';

const pagesRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
        path: 'employees',
        component: AllEmployeesListComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.ADMIN] }
    },
    {
        path: 'vehicles',
        children: [
            {
                path: '',
                component: AllVehiclesListComponent,
                canActivate: [AuthGuard],
                data: { roles: [Role.ADMIN] },
            },
            {
                path: 'available',
                component: AvailableVehiclesComponent,
                canActivate: [AuthGuard],
                data: { roles: [Role.ADMIN] }
            },
            {
                path: 'unavailable',
                component: UnavailableVehiclesComponent,
                canActivate: [AuthGuard],
                data: { roles: [Role.ADMIN] }
            },
            {
                path: 'details',
                component: VehiclesDetailsComponent,
                canActivate: [AuthGuard],
                data: { roles: [Role.ADMIN] }
            }
        ]
    },
    {
        path: 'travel-order',
        component: TravelOrderComponent,
        canActivate: [AuthGuard]
    },
]

@NgModule({
    imports: [RouterModule.forChild(pagesRoutes)],
    exports: [RouterModule],
    declarations: [],
})
export class PagesRoutingModule { }