import { PopupService } from './../../popup.service';
import { VehicleService } from './../../../entities/vehicle/vehicles.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/entities/vehicle/vehicle';

@Component({
  selector: 'app-all-vehicles-list',
  templateUrl: './all-vehicles-list.component.html',
  styleUrls: ['./all-vehicles-list.component.css']
})
export class AllVehiclesListComponent implements OnInit {

  private vehicleSubscription: Subscription;
  private vehicleList: Vehicle[] = [];
  settings = {};
  constructor(
    private vehicleService: VehicleService,
    private popupService: PopupService) { }

  ngOnInit() {
    this.vehicleSubscription = this.vehicleService.getAllVehicles().subscribe(
      res => this.onSuccess(res),
      err => console.log("Cannot get vehicles"))
  }

  onSuccess(data) {
    this.vehicleList = data;
    console.log(this.vehicleList);
    this.tableHeaders();
  }

  refreshTableEvent(data) {
    console.log(data);
    this.vehicleList.push(data);
    this.tableHeaders();
  }


  openModal(template) {
    this.popupService.openModal(template);

  }

  tableHeaders() {
    this.settings = {
      columns: {

        brand: {
          title: 'Brand',
        },
        consumption: {
          title: 'Consumption'
        },
        cubage: {
          title: 'Cubage'
        },
        distance: {
          title: 'Distance'
        },
        vehicleNum: {
          title: 'Vehicle Number'
        },
        lastService: {
          title: 'Last service'
        },
        isAvailable: {
          title: 'Available'
        }
      },
      actions: {
        add: false,
        edit: false,
        delete: false,
      },
      edit: false,

    }

  }
}
