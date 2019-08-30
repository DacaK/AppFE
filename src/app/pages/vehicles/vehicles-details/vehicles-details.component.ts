import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';

import { Vehicle } from 'src/app/entities/vehicle/vehicle';

import { SharedService } from 'src/app/util/shared.service';
import { ServiceBookService } from 'src/app/entities/service-book/service-book.service';
import { ServiceBook } from 'src/app/entities/service-book/service-book';
import { PopupService } from '../../popup.service';

@Component({
  selector: 'app-vehicles-details',
  templateUrl: './vehicles-details.component.html',
  styleUrls: ['./vehicles-details.component.css']
})
export class VehiclesDetailsComponent implements OnInit {

  serviceBookList: ServiceBook[] = [];
  vehicleDetails: Vehicle = {};
  billServiceTemplate: any;
  selectedId: number;
  settings = {};
  selectedItem: Vehicle = {};

  constructor(
    private sharedService: SharedService,
    private serviceBook: ServiceBookService,
    private popupService: PopupService,
    private router: Router
  ) { }

  ngOnInit() {
    this.sharedService.selectedVehicle.subscribe(res => {
      this.onSuccess(res);
    });
  }

  loadVehicleDetails() {
    this.serviceBook.getServiceBookById(this.selectedItem.id).subscribe(res => this.onSuccessServiceBook(res));
  }

  onSuccess(res) {
    this.selectedItem = res;
    this.loadVehicleDetails();
  }
  onSuccessServiceBook(data) {
    this.serviceBookList = data;
    this.tableHeaders();
  }

  openServiceModal(billServiceTemplate) {
    this.popupService.openModal(billServiceTemplate);
  }
  refreshTableEvent(data) {
    this.loadVehicleDetails();
  }

  navigateToVehicle() {
    this.router.navigate(['/vehicles']);
  }

  tableHeaders() {
    this.settings = {
      columns: {

        companyName: {
          title: 'Company Name',
        },
        repairDate: {
          title: 'Repair date',
        },
        repairKilometers: {
          title: 'Repair Kilometers',
        },
        serviceDescription: {
          title: 'Service Description'
        }
      },
      actions: {
        add: false,
        edit: false,
        delete: false,
        columnTitle: "Actions",
        position: "right",
      },
      edit: false,
    }
  }

}
