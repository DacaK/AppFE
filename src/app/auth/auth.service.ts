import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppSettings } from '../util/app-settings';
import { Employee } from '../entities/employee/employee';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable()
export class AuthService {

    private registrationUrl: string = '/register';
    private loginUrl: string = '/login';
    private currentLoggedUserUrl: string = '/getEmployee';

    private currentUser: any;
    public role: string;

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
        // .subscribe(res => {
        //     this.currentUser = res;
        //     console.log(this.currentUser);
        //     this.role = this.currentUser.authority.role;
        //     console.log(this.role);
        // }
        // );
    }

    isUser() {
        return this.currentUser && this.role === 'USER';
    }

    isAdmin() {
        return this.currentUser && this.role === 'ADMIN';
    }

    logout() {
        localStorage.removeItem('token');
    }

}