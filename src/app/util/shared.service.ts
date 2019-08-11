import { Vehicle } from './../entities/vehicle/vehicle';
import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';


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