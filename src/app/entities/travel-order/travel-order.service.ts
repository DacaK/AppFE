import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TravelOrder } from 'src/app/entities/travel-order/travel-order';

import { AppSettings } from './../../util/app-settings';

@Injectable()
export class TravelOrderService {

    private getTravelOrderListUrl: string = '/travelorder';
    private createTravelOrderUrl: string = '/travelorder';
    constructor(private http: HttpClient) { }

    getAllTravelOrder() {
        return this.http.get(AppSettings.APP_ENDPOINT + this.getTravelOrderListUrl);
    }

    createTravelOrder(travelOrder: TravelOrder) {
        return this.http.post(AppSettings.APP_ENDPOINT + this.createTravelOrderUrl, travelOrder);
    }
}


