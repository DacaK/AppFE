import { AppSettings } from './../../util/app-setings';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EmployeeService {

    registrationUrl = '/register';
    loginUrl = '/login'
    constructor(private http: HttpClient) { }

    registerUser(user) {
        return this.http.post(AppSettings.APP_ENDPOINT + this.registrationUrl, user);
    }

    loginUser(user) {
        return this.http.post(AppSettings.APP_ENDPOINT + this.loginUrl, user)
    }

}