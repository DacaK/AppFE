import { Component, OnInit, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { TravelOrder } from 'src/app/entities/travel-order/travel-order';
import { TravelOrderService } from './../../../entities/travel-order/travel-order.service';
import { AlertsService } from 'src/app/util/alerts/alerts.service';
import { PopupService } from './../../popup.service';

@Component({
  selector: 'app-travel-order',
  templateUrl: './travel-order.component.html',
  styleUrls: ['./travel-order.component.css']
})
export class TravelOrderComponent implements OnInit {

  travelOrderSubscription: Subscription;
  traverOrderList: TravelOrder[] = [];
  travelOrder: TravelOrder = {};
  settings = {};
  constructor(
    private travelOrderService: TravelOrderService,
    private alertsService: AlertsService,
    private popupService: PopupService) { }

  ngOnInit() {
    this.loadAllTravelOrders();
  }
  loadAllTravelOrders() {
    this.travelOrderSubscription = this.travelOrderService.getAllTravelOrder().subscribe(
      (res) => this.onSuccess(res),
      (err) => this.alertsService.error("Something is wrong"));
  }

  onSuccess(data) {
    this.traverOrderList = data;
    console.log(this.traverOrderList);
    this.tableHeaders();

  }

  addTravelOrder(TemplateRef) {
    this.travelOrder = {};
    this.popupService.openLargeModal(TemplateRef);
  }

  refreshTableEvent(data) {
    this.loadAllTravelOrders();
  }

  customEvent(event, travelOrderTemplate) {
    this.travelOrder = event.data;
    console.log(this.travelOrder);
    this.popupService.openLargeModal(travelOrderTemplate);
  }
  tableHeaders() {
    this.settings = {
      columns: {
        destination: {
          title: 'Destination',
        },
        dateStart: {
          title: 'Start Date'
        },
        dateEnd: {
          title: 'End Date'
        },
        estDistance: {
          title: 'Estimation Distance',
        },
        vehicle: {
          title: 'Vehicle/ Licence Number',
          valuePrepareFunction: (vehicle) => {
            return vehicle.brand + ' ' + vehicle.model + '/' + vehicle.vehicleNum;
          }
        },
        actDistance: {
          title: 'Actual Distance',
        },
        fuelConsumed: {
          title: 'Fuel comsumed',
        },
        travelStatus: {
          title: 'Status',
          valuePrepareFunction: (travelStatus) => {
            if (travelStatus.name === 'created') {
              return 'Waiting to be approved!'
            }
            return travelStatus.name;
          }
        }
      },

      actions: {
        add: false,
        edit: false,
        delete: false,
        position: "right",
        custom: [
          {
            name: 'handleRequest',
            title: '<i class="fas fa-edit" data-toggle="tooltip" data-placement="top" title="Resolve the request"></i>'
          }]
      },
      edit: false,
    };
  }

}
