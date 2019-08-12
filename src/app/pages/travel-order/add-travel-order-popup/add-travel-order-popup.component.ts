import { TravelOrderService } from './../../../entities/travel-order/travel-order.service';
import { EmployeeService } from 'src/app/entities/employee/employee.service';
import { AlertsService } from 'src/app/util/alerts/alerts.service';
import { VehicleService } from './../../../entities/vehicle/vehicles.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TravelOrder } from 'src/app/entities/travel-order/travel-order';
import { Vehicle } from './../../../entities/vehicle/vehicle';
import { Employee } from 'src/app/entities/employee/employee';

import { PopupService } from './../../popup.service';

@Component({
  selector: 'app-add-travel-order-popup',
  templateUrl: './add-travel-order-popup.component.html',
  styleUrls: ['./add-travel-order-popup.component.css']
})
export class AddTravelOrderPopupComponent implements OnInit, OnDestroy {

  @Output() refreshTableEvent: EventEmitter<TravelOrder> = new EventEmitter();
  @Input() travelOrderSelected: TravelOrder;
  vehicleSubscription: Subscription;
  employeeSubscription: Subscription;
  travelStatusSubscription: Subscription;
  addTravelOrderForm: NgForm;
  vehicleList: Vehicle[] = [];
  travelOrder: TravelOrder = {};
  employee: Employee = {};
  isSubmitted: boolean = false;
  selectDropdown: string = 'daca';
  constructor(
    private vehicleService: VehicleService,
    private travelOrderService: TravelOrderService,
    private employeeService: EmployeeService,
    private popupService: PopupService,
    private alertsService: AlertsService
  ) { }

  ngOnInit() {
    this.loadAllAvailableVehicles();
    this.loadLoggedUser();
    this.travelOrder = this.travelOrderSelected;


  }



  loadAllAvailableVehicles() {
    this.vehicleSubscription = this.vehicleService.getAvailableVehicles().subscribe(
      res => this.onSuccessVehicle(res),
      err => this.alertsService.error("Something is wrong"));

  }

  loadLoggedUser() {
    this.employeeSubscription = this.employeeService.getLoggedEmployee().subscribe(
      res => this.employee = res
    )

  }
  onSuccessVehicle(data) {
    this.vehicleList = data;
  }

  onSave(data) {
    this.travelOrder = data.value;
    this.travelOrder.employee = this.employee;
    this.travelOrderService.createTravelOrder(this.travelOrder).subscribe(
      res => {
        this.isSubmitted = true;
        this.refreshTableEvent.emit(res);
        this.alertsService.info("Travel order successfully created!");
      },
      (err) => this.alertsService.error("Something is wrong"));

  }

  onClose(data) {
    this.popupService.closeModal();
  }

  ngOnDestroy() {
    this.vehicleSubscription.unsubscribe();
    this.employeeSubscription.unsubscribe();
  }

}
