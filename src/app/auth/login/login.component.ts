import { SharedService } from './../../util/shared.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Employee } from 'src/app/entities/employee/employee';
import { EmployeeService } from 'src/app/entities/employee/employee.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertsService } from 'src/app/util/alerts/alerts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm: NgForm;
  employee: Employee = {};
  message: string;
  constructor(
    private router: Router,
    private authService: AuthService,
    private sharedService: SharedService,
    private alertsService: AlertsService
  ) { }

  ngOnInit() {
  }

  onLogin(data) {
    this.authService.loginUser(data.value).subscribe(

      (res) => {
        this.onSuccess(res);
      },
      (err) => {
        this.alertsService.error("Invalid username or password");
      })
    this.loginForm.reset();
  }

  onSuccess(data) {
    localStorage.setItem('token', data.token);
    this.router.navigate(['/dashboard'])
    this.decodeToken(data.token);

  }


  decodeToken(data) {
    const helper = new JwtHelperService();
    let currentUser = helper.decodeToken(data);
    this.authService.currentUserSubject.next(currentUser);
  }

  navigateToRegistration() {
    this.router.navigate(['/registration']);
  }


}
