import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/entities/employee/employee';
import { EmployeeService } from 'src/app/entities/employee/employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  employee: Employee = {};
  constructor(
    private employeeService: EmployeeService
  ) { }

  ngOnInit() {
  }

  onLogin(data) {
    console.log(data.value);
    this.employeeService.loginUser(data.value).subscribe(res => {
      console.log(res);
    },
      err => {
        console.log("err");
      })
  }

}
