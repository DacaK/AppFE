import { NgModule } from '@angular/core';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeService } from './employee/employee.service';

@NgModule({
    imports: [],
    exports: [],
    declarations: [EmployeeComponent],
    providers: [EmployeeService],
})
export class EntitiesModule { }
