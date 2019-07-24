import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Employee } from '../entities/employee/employee';

@Injectable()
export class SharedService {
    private loggedUser = new BehaviorSubject<Employee>(new Employee());
    currentLoggedUser$ = this.loggedUser.asObservable();

    private isLogedIn = new Subject<boolean>();
    isLoggedIn$ = this.isLogedIn.asObservable();

    private isLoggedAdmin = new Subject<boolean>();
    isAdmin$ = this.isLoggedAdmin.asObservable();


    constructor() { }

    sendLoggedUserMessage(employee: Employee) {
        this.loggedUser.next(employee);
    }

    isLoggedInMessage(data: boolean) {
        this.isLogedIn.next(data);
    }

    isAdminMessage(data: boolean) {
        this.isLoggedAdmin.next(data);
    }
}