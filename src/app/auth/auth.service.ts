import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppSettings } from '../util/app-settings';
import { Employee } from '../entities/employee/employee';

@Injectable()
export class AuthService {

    private registrationUrl: string = '/register';
    private loginUrl: string = '/login';
    private currentLoggedUserUrl: string = '/getEmployee';


    constructor(private http: HttpClient) { }

    registerUser(user: Employee) {
        return this.http.post(AppSettings.APP_ENDPOINT + this.registrationUrl, user);
    }

    loginUser(user: Employee) {
        return this.http.post(AppSettings.APP_ENDPOINT + this.loginUrl, user)
    }

    loggedIn() {
        return !!localStorage.getItem('token');
    }

    getToken() {
        return localStorage.getItem('token');
    }

    getCurrentLoggedUser() {
        return this.http.get(AppSettings.APP_ENDPOINT + this.currentLoggedUserUrl);
    }
}