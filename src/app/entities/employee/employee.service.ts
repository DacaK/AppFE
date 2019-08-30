import { AppSettings } from './../../util/app-settings';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class EmployeeService {

    private getEmployees: string = '/getEmployees';
    private getEmployee: string = '/getEmployee';
    private activateEmployeeUrl: string = '/activate';
    private deactivateEmployeeUrl: string = '/deactivate';
    constructor(
        private http: HttpClient
    ) { }

    getAllEmployees() {
        return this.http.get(AppSettings.APP_ENDPOINT + this.getEmployees);

    }

    getLoggedEmployee() {
        return this.http.get(AppSettings.APP_ENDPOINT + this.getEmployee);
    }

    deactivateEmployee(id: number) {
        return this.http.put(AppSettings.APP_ENDPOINT + this.deactivateEmployeeUrl + '/' + id, id);
    }
    activateEmployee(id: number) {
        return this.http.put(AppSettings.APP_ENDPOINT + this.activateEmployeeUrl + '/' + id, id);
    }

}