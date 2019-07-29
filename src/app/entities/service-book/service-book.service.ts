import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ServiceBook } from './service-book';
import { AppSettings } from './../../util/app-settings';

@Injectable()
export class ServiceBookService {

    private addVehicleServiceUrl: string = '/servicebook'
    constructor(private http: HttpClient) { }

    addVehicleService(serviceBook: ServiceBook){
        return this.http.post(AppSettings.APP_ENDPOINT+ this.addVehicleServiceUrl, serviceBook);
    }
}