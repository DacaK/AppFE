import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppSettings } from '../util/app-settings';
import { Employee } from '../entities/employee/employee';

import { SharedService } from './../util/shared.service';

@Injectable()
export class AuthService {

    private registrationUrl: string = '/register';
    private loginUrl: string = '/login';
    private currentLoggedUserUrl: string = '/getEmployee';

    private currentUser: any;
    public role: string;

    constructor(private http: HttpClient,
        private sharedService: SharedService) { }

    registerUser(user: Employee) {
        return this.http.post(AppSettings.APP_ENDPOINT + this.registrationUrl, user);
    }

    loginUser(user: Employee) {
        return this.http.post(AppSettings.APP_ENDPOINT + this.loginUrl, user)
    }

    loggedIn() {
        let isLoggedIn: boolean;
        isLoggedIn = !!localStorage.getItem('token');
        this.sharedService.isLoggedInMessage(isLoggedIn);
        return isLoggedIn;
    }

    getToken() {
        return localStorage.getItem('token');
    }

    getCurrentLoggedUser() {
        return this.http.get(AppSettings.APP_ENDPOINT + this.currentLoggedUserUrl);

    }

    isUser() {
        let isUser: boolean;
        isUser = this.currentUser && this.role === 'USER';
        return isUser;
    }

    isAdmin() {
        let isAdmin: boolean;
        isAdmin = this.currentUser && this.role === 'ADMIN';
        this.sharedService.isAdminMessage(isAdmin)
        return isAdmin;
    }

    logout() {
        this.sharedService.isLoggedInMessage(false);
        localStorage.removeItem('token');
    }

}