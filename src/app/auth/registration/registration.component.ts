import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Employee } from 'src/app/entities/employee/employee';
import { EmployeeService } from 'src/app/entities/employee/employee.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {


  @ViewChild('registrationForm') registrationForm: NgForm;
  employee: Employee = {};
  constructor(
    private employeeService: EmployeeService
  ) { }

  ngOnInit() {

  }

  onRegister(data) {
    this.employeeService.registerUser(data.value).subscribe();




  }

}
