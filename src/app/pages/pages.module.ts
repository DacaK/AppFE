import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Ng2SmartTableModule } from 'ng2-smart-table';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesRoutingModule } from './pages-routing.module';
import { TokenInterceptorService } from '../auth/token-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';

import { HeaderComponent } from '../layout/header/header.component';
import { AllEmployeesListComponent } from './employees/all-employees-list/all-employees-list.component';
import { AllVehiclesListComponent } from './vehicles/all-vehicles-list/all-vehicles-list.component';
import { AddVehiclePopupComponent } from './vehicles/add-vehicle-popup/add-vehicle-popup.component';
import { UnavailableVehiclesComponent } from './vehicles/unavailable-vehicles/unavailable-vehicles.component';
import { AvailableVehiclesComponent } from './vehicles/available-vehicles/available-vehicles.component';

import { PopupService } from './popup.service';
import { UtilModule } from '../util/util.module';
import { VehicleServicePopupComponent } from './vehicles/vehicle-service-popup/vehicle-service-popup.component';


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
        VehicleServicePopupComponent
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
