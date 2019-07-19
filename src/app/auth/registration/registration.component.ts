import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  checkoutForm;
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.checkoutForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      address: '',
      email: '',
      password: ''
    })
  }

}
