import { Vehicle } from './../entities/vehicle/vehicle';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { TravelOrder } from '../entities/travel-order/travel-order';


@Injectable()
export class SharedService {

    selected = new BehaviorSubject<Vehicle>(new Vehicle());
    selectedVehicle = this.selected.asObservable();

    constructor() {
    }

    updateDataSelection(data) {
        this.selected.next(data);
    }


}