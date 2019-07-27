import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Ng2SmartTableModule } from 'ng2-smart-table';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesRoutingModule } from './pages-routing.module';
import { TokenInterceptorService } from '../auth/token-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { HeaderComponent } from '../layout/header/header.component';
import { AllEmployeesListComponent } from './employees/all-employees-list/all-employees-list.component';
import { CommonModule } from '@angular/common';
import { AllVehiclesListComponent } from './vehicles/all-vehicles-list/all-vehicles-list.component';
import { AddVehiclePopupComponent } from './vehicles/add-vehicle-popup/add-vehicle-popup.component';
import { PopupService } from './popup.service';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilModule } from '../util/util.module';


@NgModule({

    declarations: [
        DashboardComponent,
        SidebarComponent,
        HeaderComponent,
        AllEmployeesListComponent,
        AllVehiclesListComponent,
        AddVehiclePopupComponent
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
