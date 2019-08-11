import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Employee } from 'src/app/entities/employee/employee';
import { AuthService } from '../auth.service';
import { AlertsService } from 'src/app/util/alerts/alerts.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  private currentLoggedUserSubscription: Subscription;
  registrationForm: FormGroup;
  employee: Employee = {};
  isSubmitted: boolean = false; public currentUser = {};



  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private alertsService: AlertsService,
    private router: Router) {
    // if (this.authService.currentUser$) {
    //   this.router.navigate(['/']);
    // }
  }


  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.currentLoggedUserSubscription = this.authService.currentUser$.subscribe(
      res => {
        this.currentUser = res;
        if (this.currentUser) {
          this.router.navigate(['/']);
        }


      }
    )

  }

  // convenience getter for easy access to form fields
  get f() { return this.registrationForm.controls; }

  onRegister(data) {
    this.authService.registerUser(data.value).subscribe(

      (res) => {
        this.onSuccess(res);
      },
      (err) => {
        this.alertsService.error("Something is wrong");
      })
    this.registrationForm.reset();
  }


  onSuccess(data) {
    this.alertsService.info("You have succesfully registered!");
    this.isSubmitted = true;
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
