import { PopupService } from './../../popup.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { AlertsService } from './../../../util/alerts/alerts.service';
import { TravelOrderService } from './../../../entities/travel-order/travel-order.service';
import { TravelOrder } from 'src/app/entities/travel-order/travel-order';

@Component({
  selector: 'app-employee-travel-order',
  templateUrl: './employee-travel-order.component.html',
  styleUrls: ['./employee-travel-order.component.css']
})
export class EmployeeTravelOrderComponent implements OnInit, OnDestroy {

  currentUserSubscription: Subscription;
  employeeOrders: TravelOrder[] = [];
  travelOrder: TravelOrder = {};
  currentUser: any;
  settings = {};
  constructor(
    private authService: AuthService,
    private travelOrderService: TravelOrderService,
    private alertsService: AlertsService,
    private popupService: PopupService) { }

  ngOnInit() {
    this.currentUserSubscription = this.authService.currentUser$.subscribe(
      res => {
        this.currentUser = res;
      }
    )
    this.getTravelOrder();
  }

  getTravelOrder() {
    console.log(this.currentUser.sub);
    this.travelOrderService.employeeTravelOrder(this.currentUser.sub).subscribe(
      res => this.onSuccess(res),
      err => this.alertsService.error("Something is wrong")
    )
  }

  onSuccess(data) {
    this.employeeOrders = data;
    console.log(this.employeeOrders);
    this.tableHeaders();
  }
  addTravelOrder(TemplateRef) {
    this.travelOrder = {};
    this.popupService.openLargeModal(TemplateRef);
  }

  refreshTableEvent() {
    this.getTravelOrder();
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
      },
      edit: false,
    };
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }

}
