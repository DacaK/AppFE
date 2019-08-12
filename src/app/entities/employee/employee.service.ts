import { AppSettings } from './../../util/app-settings';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class EmployeeService {

    private getEmployees: string = '/getEmployees';
    private getEmployee: string = '/getEmployee';
    constructor(
        private http: HttpClient
    ) { }

    getAllEmployees() {
        return this.http.get(AppSettings.APP_ENDPOINT + this.getEmployees);

    }

    getLoggedEmployee() {
        return this.http.get(AppSettings.APP_ENDPOINT + this.getEmployee);
    }

}