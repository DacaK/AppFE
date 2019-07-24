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


@NgModule({
    imports: [
        CommonModule,
        PagesRoutingModule,
        Ng2SmartTableModule
    ],
    exports: [
        SidebarComponent,
        HeaderComponent],
    declarations: [
        DashboardComponent,
        SidebarComponent,
        HeaderComponent,
        AllEmployeesListComponent],
    providers: [TokenInterceptorService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true
        }],
})
export class PagesModule { }
