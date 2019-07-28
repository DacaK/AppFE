import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Vehicle } from 'src/app/entities/vehicle/vehicle';

import { PopupService } from './../../popup.service';
import { VehicleService } from './../../../entities/vehicle/vehicles.service';
import { AlertsService } from 'src/app/util/alerts/alerts.service';

@Component({
  selector: 'app-add-vehicle-popup',
  templateUrl: './add-vehicle-popup.component.html',
})
export class AddVehiclePopupComponent implements OnInit {

  @Output() refreshTableEvent: EventEmitter<any> = new EventEmitter();
  @Input() selectedItem: number;
  addVehicleForm: NgForm;
  vehicle: Vehicle = {};
  isSubmitted: boolean = false;
  constructor(
    private vehicleService: VehicleService,
    private popupService: PopupService,
    private alertsService: AlertsService) { }

  ngOnInit() {
    this.loadItem();
  }

  loadItem() {
    if (this.selectedItem) {
      this.vehicleService.getVehicleById(this.selectedItem).subscribe(
        res => this.vehicle = res,
        err => console.log("Errrr", err)
      );
    }
  }

  onSave(data) {
    (this.selectedItem == null) ? this.addVehicle(data.value) : this.updateVehicleDetails(this.vehicle);
  }


  addVehicle(data) {
    this.vehicleService.addNewVehicle(data).subscribe(
      res => this.onSucccesAdd(res),
      err => console.log(err)
    );
  }

  updateVehicleDetails(data) {
    this.vehicleService.updateVehicle(data).subscribe(
      res => this.onSuccessUpdate(res),
      err => console.log("Errrr", err)
    );

  };

  onSuccessUpdate(data) {
    this.refreshTableEvent.emit(data);
    this.alertsService.info("Vehicle successfully updated!");
    this.isSubmitted = true;
  }


  onSucccesAdd(res) {
    this.refreshTableEvent.emit(res);
    this.alertsService.info("Vehicle successfully added!");
    this.isSubmitted = true;
  }


  onClose(data) {
    this.popupService.closeModal();
    this.selectedItem = null;

  }

}
