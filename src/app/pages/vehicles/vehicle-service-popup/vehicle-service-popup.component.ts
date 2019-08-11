import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { ServiceBookService } from './../../../entities/service-book/service-book.service';
import { ServiceBook } from './../../../entities/service-book/service-book';
import { PopupService } from '../../popup.service';
import { AlertsService } from 'src/app/util/alerts/alerts.service';

@Component({
  selector: 'app-vehicle-service-popup',
  templateUrl: './vehicle-service-popup.component.html',
  styleUrls: ['./vehicle-service-popup.component.css']
})
export class VehicleServicePopupComponent implements OnInit {

  @Output() refreshTableEvent: EventEmitter<any> = new EventEmitter();
  @Input() selectedItem: {}
  serviceBook: ServiceBook = {}
  isSubmitted: boolean = false;
  constructor(
    private serviceBookService: ServiceBookService,
    private popupService: PopupService,
    private alertsService: AlertsService, ) { }

  ngOnInit() {
    console.log("popup", this.selectedItem);
  }

  onSave(data) {
    console.log(data);
    this.serviceBook = data.value;
    this.serviceBook.vehicle = this.selectedItem;
    this.serviceBookService.addVehicleService(this.serviceBook).subscribe(
      res => this.onSuccess(res),
      err => console.log("Errrror", err)


    )
  }

  onSuccess(data) {
    this.refreshTableEvent.emit(data);
    this.alertsService.info("Service successfully added!");
    this.isSubmitted = true;
  }




  onClose() {
    this.popupService.closeModal();
  }

}
