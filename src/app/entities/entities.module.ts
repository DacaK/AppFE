import { NgModule } from '@angular/core';

import { VehicleService } from './vehicle/vehicles.service';
import { EmployeeService } from './employee/employee.service';
import { ServiceBookService } from './service-book/service-book.service';
import { TravelOrderService } from './travel-order/travel-order.service';


@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [
        EmployeeService,
        VehicleService,
        ServiceBookService,
        TravelOrderService],
})
export class EntitiesModule { }
