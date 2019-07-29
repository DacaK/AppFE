import { NgModule } from '@angular/core';

import { VehicleService } from './vehicle/vehicles.service';
import { EmployeeService } from './employee/employee.service';
import { ServiceBookService } from './service-book/service-book.service';


@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [EmployeeService, VehicleService, ServiceBookService],
})
export class EntitiesModule { }
