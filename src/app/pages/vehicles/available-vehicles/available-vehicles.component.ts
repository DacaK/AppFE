import { Vehicle } from './../../../entities/vehicle/vehicle';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { VehicleService } from 'src/app/entities/vehicle/vehicles.service';

@Component({
  selector: 'app-available-vehicles',
  templateUrl: './available-vehicles.component.html',
  styleUrls: ['./available-vehicles.component.css']
})
export class AvailableVehiclesComponent implements OnInit, OnDestroy {

  private vehicleSubscription: Subscription;
  private settings = {};
  availableVehicleList: Vehicle[] = [];

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.loadAvailableVehicles();
  }

  loadAvailableVehicles() {
    this.vehicleSubscription = this.vehicleService.getAvailableVehicles().subscribe(
      res => this.onSuccess(res),
      err => console.log("err")
    )
  }

  onSuccess(data) {
    this.availableVehicleList = data;
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
