import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Employee } from './../../../entities/employee/employee';
import { EmployeeService } from 'src/app/entities/employee/employee.service';

@Component({
  selector: 'app-all-employees-list',
  templateUrl: './all-employees-list.component.html',
  styleUrls: ['./all-employees-list.component.css']
})
export class AllEmployeesListComponent implements OnInit, OnDestroy {

  private employeesSubscription: Subscription;
  employeeList: Employee[] = [];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeesSubscription = this.employeeService.getAllEmployees().subscribe(res =>
      this.onSuccess(res)
    )
  }

  onSuccess(data) {
    this.employeeList = data;
  }

  ngOnDestroy() {
    this.employeesSubscription.unsubscribe();
  }

}
