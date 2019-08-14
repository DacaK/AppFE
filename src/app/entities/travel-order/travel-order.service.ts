import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TravelOrder } from 'src/app/entities/travel-order/travel-order';

import { AppSettings } from './../../util/app-settings';

@Injectable()
export class TravelOrderService {
    private getTravelOrdersListUrl: string = '/travelorders';
    private getTravelOrderListUrl: string = '/travelorder';
    private createTravelOrderUrl: string = '/travelorder';

    createdTravelOrderUrl: string = '/created';
    approvedTravelOrderUrl: string = '/approved';
    finishedTravelOrderUrl: string = '/finished';
    refusedTravelOrderUrl: string = '/refused';

    constructor(private http: HttpClient) { }

    getAllTravelOrder() {
        return this.http.get(AppSettings.APP_ENDPOINT + this.getTravelOrderListUrl);
    }

    createTravelOrder(travelOrder: TravelOrder) {
        return this.http.post(AppSettings.APP_ENDPOINT + this.createTravelOrderUrl, travelOrder);
    }

    getCreatedTravelOrder() {
        return this.http.get(AppSettings.APP_ENDPOINT + this.getTravelOrdersListUrl + this.createdTravelOrderUrl);
    }

    getApprovedTravelOrder() {
        return this.http.get(AppSettings.APP_ENDPOINT + this.getTravelOrdersListUrl + this.approvedTravelOrderUrl);
    }
    getRefusedTravelOrder() {
        return this.http.get(AppSettings.APP_ENDPOINT + this.getTravelOrdersListUrl + this.refusedTravelOrderUrl);
    }
    getFinishedTravelOrder() {
        return this.http.get(AppSettings.APP_ENDPOINT + this.getTravelOrdersListUrl + this.finishedTravelOrderUrl);
    }

}


