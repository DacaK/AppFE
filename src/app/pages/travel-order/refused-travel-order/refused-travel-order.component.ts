import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { TravelOrder } from 'src/app/entities/travel-order/travel-order';

import { TravelOrderService } from 'src/app/entities/travel-order/travel-order.service';
import { AlertsService } from 'src/app/util/alerts/alerts.service';

@Component({
  selector: 'app-refused-travel-order',
  templateUrl: './refused-travel-order.component.html',
  styleUrls: ['./refused-travel-order.component.css']
})
export class RefusedTravelOrderComponent implements OnInit {

  refusedSubscription: Subscription;
  refusedTravelOrder: TravelOrder[] = [];
  settings = {};
  constructor(
    private travelOrderService: TravelOrderService,
    private alertsService: AlertsService) { }

  ngOnInit() {
    this.refusedSubscription = this.travelOrderService.getRefusedTravelOrder().subscribe(
      res => this.onSuccess(res),
      err => this.alertsService.error('Something is wrong. Try later')
    )
  }
  onSuccess(data) {
    this.refusedTravelOrder = data;
    console.log(data);
    this.tableHeaders();
  }

  tableHeaders() {
    this.settings = {
      columns: {
        employee: {
          title: 'Employee',
          editable: false,
          valuePrepareFunction: (employee) => {
            return employee.firstName + ' ' + employee.lastName;
          }
        },
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
        }
      },

      actions: {
        add: false,
        edit: false,
        delete: false,
        position: "right"
      },
      edit: false,
    };
  }
  ngOnDestroy() {
    this.refusedSubscription.unsubscribe();
  }

}
