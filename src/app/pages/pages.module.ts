import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { Ng2SmartTableModule } from 'ng2-smart-table';

import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { HeaderComponent } from '../layout/header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllEmployeesListComponent } from './employees/all-employees-list/all-employees-list.component';
import { AllVehiclesListComponent } from './vehicles/all-vehicles-list/all-vehicles-list.component';
import { AddVehiclePopupComponent } from './vehicles/add-vehicle-popup/add-vehicle-popup.component';
import { UnavailableVehiclesComponent } from './vehicles/unavailable-vehicles/unavailable-vehicles.component';
import { AvailableVehiclesComponent } from './vehicles/available-vehicles/available-vehicles.component';
import { VehicleServicePopupComponent } from './vehicles/vehicle-service-popup/vehicle-service-popup.component';
import { TravelOrderComponent } from './travel-order/travel-order/travel-order.component';
import { VehiclesDetailsComponent } from './vehicles/vehicles-details/vehicles-details.component';
import { AddTravelOrderPopupComponent } from './travel-order/add-travel-order-popup/add-travel-order-popup.component';
import { RefusedTravelOrderComponent } from './travel-order/refused-travel-order/refused-travel-order.component';
import { ApprovedTravelOrderComponent } from './travel-order/approved-travel-order/approved-travel-order.component';
import { CreatedTravelOrderComponent } from './travel-order/created-travel-order/created-travel-order.component';
import { FinishedTravelOrderComponent } from './travel-order/finished-travel-order/finished-travel-order.component';

import { UtilModule } from '../util/util.module';
import { PagesRoutingModule } from './pages-routing.module';
import { TokenInterceptorService } from '../auth/token-interceptor.service';
import { PopupService } from './popup.service';

@NgModule({

    declarations: [
        DashboardComponent,
        SidebarComponent,
        HeaderComponent,
        AllEmployeesListComponent,
        AllVehiclesListComponent,
        AddVehiclePopupComponent,
        UnavailableVehiclesComponent,
        AvailableVehiclesComponent,
        VehicleServicePopupComponent,
        TravelOrderComponent,
        VehiclesDetailsComponent,
        AddTravelOrderPopupComponent,
        RefusedTravelOrderComponent,
        ApprovedTravelOrderComponent,
        CreatedTravelOrderComponent,
        FinishedTravelOrderComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        PagesRoutingModule,
        UtilModule,
        Ng2SmartTableModule,
        ModalModule.forRoot()
    ],
    exports: [
        SidebarComponent,
        HeaderComponent],
    providers: [
        PopupService,
        TokenInterceptorService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true
        }],
})
export class PagesModule { }
