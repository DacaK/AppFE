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
import { RefusedTravelOrderComponent } from './travel-order/refused-travel-order/refused-travel-order.component';
import { FinishedTravelOrderComponent } from './travel-order/finished-travel-order/finished-travel-order.component';
import { ApprovedTravelOrderComponent } from './travel-order/approved-travel-order/approved-travel-order.component';
import { CreatedTravelOrderComponent } from './travel-order/created-travel-order/created-travel-order.component';
import { EmployeeTravelOrderComponent } from './travel-order/employee-travel-order/employee-travel-order.component';

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
                // data: { roles: [Role.ADMIN] }
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
        children: [
            {
                path: '',
                component: TravelOrderComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'created-travel-order',
                component: CreatedTravelOrderComponent,
                canActivate: [AuthGuard],
                data: { roles: [Role.ADMIN] }
            },
            {
                path: 'approved-travel-order',
                component: ApprovedTravelOrderComponent,
                canActivate: [AuthGuard],
                data: { roles: [Role.ADMIN] }
            },
            {
                path: 'refused-travel-order',
                component: RefusedTravelOrderComponent,
                canActivate: [AuthGuard],
                data: { roles: [Role.ADMIN] }
            },
            {
                path: 'finished-travel-order',
                component: FinishedTravelOrderComponent,
                canActivate: [AuthGuard],
                data: { roles: [Role.ADMIN] }
            },
            {
                path: 'create-travel-order',
                component: EmployeeTravelOrderComponent,
                canActivate: [AuthGuard],
            }
        ]
    },
]

@NgModule({
    imports: [RouterModule.forChild(pagesRoutes)],
    exports: [RouterModule],
    declarations: [],
})
export class PagesRoutingModule { }