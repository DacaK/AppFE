import { AppSettings } from './../../util/app-settings';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicle } from './vehicle';

@Injectable()
export class VehicleService {

    private addVehicle: string = '/vehicle';
    private getVehicles: string = '/vehicles';
    constructor(private http: HttpClient) {
    }

    getAllVehicles() {
        return this.http.get(AppSettings.APP_ENDPOINT + this.getVehicles);
    }

    addNewVehicle(vehicle: Vehicle) {
        return this.http.post(AppSettings.APP_ENDPOINT + this.addVehicle, vehicle);
    }
}