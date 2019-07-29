import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Vehicle } from 'src/app/entities/vehicle/vehicle';
import { VehicleService } from 'src/app/entities/vehicle/vehicles.service';

@Component({
  selector: 'app-unavailable-vehicles',
  templateUrl: './unavailable-vehicles.component.html',
  styleUrls: ['./unavailable-vehicles.component.css']
})
export class UnavailableVehiclesComponent implements OnInit {

  private vehicleSubscription: Subscription;
  private settings = {};
  unavailableVehicleList: Vehicle[] = [];

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.loadUnavailableVehicles();
  }

  loadUnavailableVehicles() {
    this.vehicleSubscription = this.vehicleService.getUnavailableVehicles().subscribe(
      res => this.onSuccess(res),
      err => console.log("err")
    )
  }

  onSuccess(data) {
    this.unavailableVehicleList = data;
    this.tableHeaders();
  }
  tableHeaders() {
    this.settings = {
      columns: {

        brand: {
          title: 'Brand',
        },
        model: {
          title: 'Model',
        },
        vehicleNum: {
          title: 'Vehicle Number'
        },
        licenceNum: {
          title: 'Licence Number'
        },
        distance: {
          title: 'Distance'
        },
        lastService: {
          title: 'Last service'
        },
        cubage: {
          title: 'Cubage'
        },
        consumption: {
          title: 'Consumption'
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

  ngOnDestroy() {
    this.vehicleSubscription.unsubscribe();
  }
}
