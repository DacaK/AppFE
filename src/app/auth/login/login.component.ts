import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Employee } from 'src/app/entities/employee/employee';
import { EmployeeService } from 'src/app/entities/employee/employee.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm: NgForm;
  employee: Employee = {};
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  onLogin(data) {
    console.log(data.value);
    this.authService.loginUser(data.value).subscribe(

      (res) => {
        this.onSuccess(res);
      },
      (err) => {
        console.log("err");
      })
    this.loginForm.reset();
  }

  onSuccess(data) {
    console.log(data.token);
    localStorage.setItem('token', data.token);
    this.router.navigate(['/dashboard'])
    this.getCurrentLoggedUser();
  }

  getCurrentLoggedUser() {
    this.authService.getCurrentLoggedUser();
    
  }

  navigateToRegistration() {
    this.router.navigate(['/registration']);
  }


}
