import { Component, OnInit, Input } from '@angular/core';

import { ServiceBookService } from './../../../entities/service-book/service-book.service';
import { ServiceBook } from './../../../entities/service-book/service-book';
import { PopupService } from '../../popup.service';

@Component({
  selector: 'app-vehicle-service-popup',
  templateUrl: './vehicle-service-popup.component.html',
  styleUrls: ['./vehicle-service-popup.component.css']
})
export class VehicleServicePopupComponent implements OnInit {

  @Input() selectedItem: {}
  serviceBook: ServiceBook = {}
  constructor(
    private serviceBookService: ServiceBookService,
    private popupService: PopupService) { }

  ngOnInit() {
    console.log("popup", this.selectedItem);
  }

  onSave(data) {
    console.log(data);
    this.serviceBook = data.value;
    this.serviceBook.vehicle = this.selectedItem;
    this.serviceBookService.addVehicleService(this.serviceBook).subscribe(
      res => console.log("ress", res),
      err => console.log("Errrror", err)


    )
  }

  onClose() {
    this.popupService.closeModal();
  }

}
