import { TravelStatus } from './../../../entities/travel-order/travel-status';
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
import { Bill } from 'src/app/entities/bill/bill';

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
  statusSubscription: Subscription;

  addTravelOrderForm: NgForm;
  vehicleList: Vehicle[] = [];
  travelStatuses: TravelStatus[] = [];
  travelOrder: TravelOrder;
  bill: Bill = {};
  employee: Employee = {};
  isSubmitted: boolean = false;
  vehicleModelDropdown: any = '';


  constructor(
    private vehicleService: VehicleService,
    private travelOrderService: TravelOrderService,
    private employeeService: EmployeeService,
    private popupService: PopupService,
    private alertsService: AlertsService
  ) { }

  ngOnInit() {
    this.loadStatusesAndAvailableVehicles();
    this.loadLoggedUser();
    this.travelOrder = this.travelOrderSelected;
    this.travelOrder.vehicle ? this.vehicleModelDropdown = this.travelOrder.vehicle.id : this.vehicleModelDropdown = null;
  }

  clearFilter(event) {
    console.log("Eveeeent", event);
    this.vehicleModelDropdown = event;
    console.log("Data", this.vehicleModelDropdown);

  }

  changeStatus(event) {
    console.log(this.travelOrder.travelStatus.id);
  }



  loadStatusesAndAvailableVehicles() {
    let resStatus: TravelStatus;
    this.statusSubscription = this.travelOrderService.getTravelOrderStatuses().subscribe(
      res => resStatus = res,
      err => this.alertsService.error("Something is wrong!")
    )
    this.vehicleSubscription = this.vehicleService.getAvailableVehicles().subscribe(
      res => this.onSuccessStatusAndVehicle(res, resStatus),
      err => this.alertsService.error("Something is wrong!"));
  }

  loadLoggedUser() {
    this.employeeSubscription = this.employeeService.getLoggedEmployee().subscribe(
      res => this.employee = res
    )

  }
  onSuccessStatusAndVehicle(data, status) {
    this.vehicleList = data;
    this.travelStatuses = status;
  }

  onSave(data) {

    (this.travelOrderSelected.id !== undefined) ? this.update(data.value) : this.create(data.value);
  }
  create(data) {
    this.travelOrder.destination = data.destination;
    this.travelOrder.vehicle = new Vehicle(this.vehicleModelDropdown);;
    this.travelOrder.dateStart = data.dateStart;
    this.travelOrder.dateEnd = data.dateEnd;
    this.travelOrder.actDistance = data.actDistance;
    this.travelOrder.employee = this.employee;
    this.travelOrderService.createTravelOrder(this.travelOrder).subscribe(
      res => {
        this.isSubmitted = true;
        this.refreshTableEvent.emit(res);
        this.alertsService.info("Travel order successfully created!");
      },
      (err) => this.alertsService.error("Something is wrong"));

  }

  update(data) {
    console.log("ddddddddddddddddddd", data);
    console.log("this.travelOrder", this.travelOrder);
    if (this.travelOrder.travelStatus.id == 4) {
      this.setBill();
    }
    this.travelOrderService.updateTraverOrder(this.travelOrder).subscribe(
      res => {
        this.isSubmitted = true;
        this.refreshTableEvent.emit(res);
        this.alertsService.info("Travel order successfully updated!");
      },
      (err) => this.alertsService.error("Something is wrong")
    )
  }

  setBill() {
    this.bill.travelOrder = this.travelOrder;
    console.log(this.bill);
    this.travelOrderService.setBill(this.bill).subscribe(
      res =>
        console.log("Reeeees", res)
    )
  }

  onChange() {
    this.travelOrder.vehicle.model;
  }

  onClose(data) {
    this.popupService.closeModal();
  }

  ngOnDestroy() {
    this.vehicleSubscription.unsubscribe();
    this.employeeSubscription.unsubscribe();
  }

}


