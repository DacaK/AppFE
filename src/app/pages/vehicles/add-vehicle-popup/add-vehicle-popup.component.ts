import { AlertsService } from 'src/app/util/alerts/alerts.service';
import { FormGroup, NgForm } from '@angular/forms';
import { VehicleService } from './../../../entities/vehicle/vehicles.service';
import { Vehicle } from 'src/app/entities/vehicle/vehicle';
import { PopupService } from './../../popup.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-vehicle-popup',
  templateUrl: './add-vehicle-popup.component.html',
})
export class AddVehiclePopupComponent implements OnInit {

  @Output() refreshTableEvent: EventEmitter<any> = new EventEmitter();
  addVehicleForm: NgForm;
  vehicle: Vehicle = {};
  isSubmitted: boolean = false;
  constructor(
    private vehicleService: VehicleService,
    private popupService: PopupService,
    private alertsService: AlertsService) { }

  onSave(data) {
    this.vehicleService.addNewVehicle(data.value).subscribe(
      res => this.onSuccess(res),
      err => console.log(err)
    );
  }



  onSuccess(res) {
    this.refreshTableEvent.emit(res);
    this.alertsService.info("Vehicle successfully added!");
    this.isSubmitted = true;
  }
  ngOnInit() {

  }


  onClose() {
    this.popupService.closeModal();
  }

}
