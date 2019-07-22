import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/entities/employee/employee';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {


  @ViewChild('registrationForm') registrationForm: NgForm;
  employee: Employee = {};
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {

  }

  onRegister(data) {
    this.authService.registerUser(data.value).subscribe();
  }

}
