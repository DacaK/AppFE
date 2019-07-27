import { AlertsService } from './../../../util/alerts/alerts.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

import { Vehicle } from 'src/app/entities/vehicle/vehicle';

import { ConfirmModal } from 'src/app/util/confirmation-modal/confirm-modal.component';

import { PopupService } from './../../popup.service';
import { VehicleService } from './../../../entities/vehicle/vehicles.service';


@Component({
  selector: 'app-all-vehicles-list',
  templateUrl: './all-vehicles-list.component.html',
  styleUrls: ['./all-vehicles-list.component.css']
})
export class AllVehiclesListComponent implements OnInit {

  bsModalRef: BsModalRef;
  private vehicleSubscription: Subscription;
  private vehicleList: Vehicle[] = [];
  settings = {};
  template: any;
  constructor(
    private vehicleService: VehicleService,
    private popupService: PopupService,
    private modalService: BsModalService,
    private alertsService: AlertsService) { }

  ngOnInit() {
    this.loadVehicles();
  }

  loadVehicles() {
    this.vehicleSubscription = this.vehicleService.getAllVehicles().subscribe(
      res => this.onSuccess(res),
      err => console.log("Cannot get vehicles"))
  }

  onSuccess(data) {
    this.vehicleList = data;
    this.tableHeaders();
  }

  refreshTableEvent(data) {
    console.log(data);
    this.vehicleList.push(data);
    this.tableHeaders();
  }


  openModal(template) {
    this.template = template;
    this.popupService.openModal(this.template);

  }

  customAction(value) {
    switch (value.action) {
      case 'edit':
        this.editVehicle(value.data);
        break;
      case 'delete':
        this.deleteVehice(value.data);
        break;
    }
  }

  editVehicle(data) {
    console.log(data.id);
  }

  deleteVehice(data) {
    const initialState = {
      title: 'Are you sure you want to delete this item'
    }
    this.bsModalRef = this.modalService.show(ConfirmModal, { initialState })
    this.bsModalRef.content.onClose = () => {
      this.bsModalRef.hide();
    };
    this.bsModalRef.content.onSave = () => {
      this.onDelete(data);
      this.bsModalRef.hide();
    };
  }

  onDelete(data) {
    this.vehicleService.deleteVehicle(data.id).subscribe(res => {
      this.alertsService.info("Succesfuly deleted!");
    })
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
        },
        isAvailable: {
          title: 'Available'
        }
      },
      actions: {
        add: false,
        edit: false,
        delete: false,
        columnTitle: "Actions",
        position: "right",
        custom: [{
          name: 'edit',
          title: '<i class="fas fa-edit" data-toggle="tooltip" data-placement="top" title="Edit Vehicle">&nbsp;</i>'
        }, {
          name: 'delete',
          title: '<i class="fas fa-trash" data-toggle="tooltip" data-placement="top" title="Delete Vehicle">&nbsp;</i>'
        }]
      },
      edit: false,


    }

  }
}
