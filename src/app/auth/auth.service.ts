import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { AppSettings } from '../util/app-settings';
import { Employee } from '../entities/employee/employee';

import { SharedService } from './../util/shared.service';


@Injectable()
export class AuthService {

    private registrationUrl: string = '/register';
    private loginUrl: string = '/login';
    private currentLoggedUserUrl: string = '/getEmployee';

    private currentUser: any;
    public currentUserSubject: BehaviorSubject<any>;
    public currentUser$: Observable<any>;



    constructor(private http: HttpClient, private sharedService: SharedService) {
        this.currentUserSubject = new BehaviorSubject(this.getDecodedToken());
        this.currentUser$ = this.currentUserSubject.asObservable();

    }
    public get getCurrentUserValue() {
        return this.currentUserSubject.value;
    }

    registerUser(user: Employee) {
        return this.http.post(AppSettings.APP_ENDPOINT + this.registrationUrl, user);
    }

    loginUser(user: Employee) {
        return this.http.post(AppSettings.APP_ENDPOINT + this.loginUrl, user);

    }

    loggedIn() {
        let isLoggedIn: boolean;
        isLoggedIn = !!localStorage.getItem('token');
        return isLoggedIn;
    }

    getToken() {
        return localStorage.getItem('token');
    }

    getDecodedToken() {
        let token = localStorage.getItem('token');
        const helper = new JwtHelperService();
        this.currentUser = helper.decodeToken(token);
        return this.currentUser;
    }

    getCurrentLoggedUser() {
        return this.http.get(AppSettings.APP_ENDPOINT + this.currentLoggedUserUrl);
    }

    logout() {
        localStorage.removeItem('token');
        this.currentUserSubject.next(null);
    }

}