import { AppSettings } from './../../util/app-settings';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicle } from './vehicle';

@Injectable()
export class VehicleService {

    private addVehicleUrl: string = '/vehicle';
    private getVehiclesUrl: string = '/vehicles';
    private getAvailableVehiclesUrl: string = '/allavaliable';
    private getUnvailableVehiclesUrl: string = '/allunavaliable';
    public getVehicleByIdUrl: string = '/vehicle'
    public updateVehicleByIdUrl: string = '/vehicle'
    private deleteVehicleUrl: string = '/delete'
    constructor(private http: HttpClient) {
    }

    getAllVehicles() {
        return this.http.get(AppSettings.APP_ENDPOINT + this.getVehiclesUrl);
    }
    getAvailableVehicles() {
        return this.http.get(AppSettings.APP_ENDPOINT + this.getAvailableVehiclesUrl);
    }

    getUnavailableVehicles() {
        return this.http.get(AppSettings.APP_ENDPOINT + this.getUnvailableVehiclesUrl);
    }

    getVehicleById(id: number) {
        return this.http.get(AppSettings.APP_ENDPOINT + this.getVehicleByIdUrl + '/' + id);
    }

    addNewVehicle(vehicle: Vehicle) {
        return this.http.post(AppSettings.APP_ENDPOINT + this.addVehicleUrl, vehicle);
    }

    updateVehicle(vehicle: Vehicle) {
        return this.http.post(AppSettings.APP_ENDPOINT + this.updateVehicleByIdUrl, vehicle);
    }

    deleteVehicle(id: number) {
        return this.http.put(AppSettings.APP_ENDPOINT + this.deleteVehicleUrl + '/' + id, id);
    }
}