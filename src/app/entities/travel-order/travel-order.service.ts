import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TravelOrder } from 'src/app/entities/travel-order/travel-order';

import { AppSettings } from './../../util/app-settings';
import { Bill } from '../bill/bill';

@Injectable()
export class TravelOrderService {
    private getTravelOrdersListUrl: string = '/travelorders';
    private getTravelOrderListUrl: string = '/travelorder';
    private createTravelOrderUrl: string = '/travelorder';
    private getTravelOrderStatusUrl: string = '/travelStatuses';
    private updateTravelOrderUrl: string = '/travelorder';
    private employeeTravelOrderUrl: string = '/usertravelorders';

    createdTravelOrderUrl: string = '/created';
    approvedTravelOrderUrl: string = '/approved';
    finishedTravelOrderUrl: string = '/finished';
    refusedTravelOrderUrl: string = '/refused';

    createBillUrl: string = '/bill';

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
    getTravelOrderStatuses() {
        return this.http.get(AppSettings.APP_ENDPOINT + this.getTravelOrderStatusUrl);
    }

    updateTraverOrder(travelOrder: TravelOrder) {
        return this.http.put(AppSettings.APP_ENDPOINT + this.updateTravelOrderUrl, travelOrder);
    }

    employeeTravelOrder(username: string) {
        return this.http.get(AppSettings.APP_ENDPOINT + this.employeeTravelOrderUrl + '/' + username);
    }

    setBill(bill: Bill) {
        return this.http.post(AppSettings.APP_ENDPOINT + this.createBillUrl, bill);
    }

}


