import { VehicleService } from './vehicle/vehicles.service';
import { NgModule } from '@angular/core';
import { EmployeeService } from './employee/employee.service';


@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [EmployeeService, VehicleService],
})
export class EntitiesModule { }
