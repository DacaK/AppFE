import { AlertsService } from 'src/app/util/alerts/alerts.service';
import { Subscription } from 'rxjs';
import { TravelOrderService } from './../../../entities/travel-order/travel-order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TravelOrder } from 'src/app/entities/travel-order/travel-order';

@Component({
  selector: 'app-created-travel-order',
  templateUrl: './created-travel-order.component.html',
  styleUrls: ['./created-travel-order.component.css']
})
export class CreatedTravelOrderComponent implements OnInit, OnDestroy {

  createdSubscription: Subscription;
  createdTravelOrder: TravelOrder[] = [];
  settings = {};
  constructor(
    private travelOrderService: TravelOrderService,
    private alertsService: AlertsService) { }

  ngOnInit() {
    this.createdSubscription = this.travelOrderService.getCreatedTravelOrder().subscribe(
      res => this.onSuccess(res),
      err => this.alertsService.error('Something is wrong. Try later')
    )
  }
  onSuccess(data) {
    this.createdTravelOrder = data;
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
    this.createdSubscription.unsubscribe();
  }
}
