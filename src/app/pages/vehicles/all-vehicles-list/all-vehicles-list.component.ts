import { SharedService } from './../../../util/shared.service';
import { AlertsService } from './../../../util/alerts/alerts.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

import { Vehicle } from 'src/app/entities/vehicle/vehicle';

import { ConfirmModal } from 'src/app/util/confirmation-modal/confirm-modal.component';

import { PopupService } from './../../popup.service';
import { VehicleService } from './../../../entities/vehicle/vehicles.service';
import { Router } from '@angular/router';


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
  selectedItem: number;
  constructor(
    private router: Router,
    private vehicleService: VehicleService,
    private popupService: PopupService,
    private sharedService: SharedService,
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
    this.loadVehicles();
  }

  getRow(data) {
    console.log("getRow", data.data);
    this.sharedService.updateDataSelection(data.data);
    this.router.navigate(['/vehicles/details']);
  }

  addVehicleModal(template) {
    this.selectedItem = null;
    this.popupService.openModal(template);
  }

  editVehicleModal(data, template) {
    this.selectedItem = data.id;
    this.popupService.openModal(template);
  }

  vehicleServiceModal(data, template) {
    this.selectedItem = data;
    console.log("this.selectedItemthis.selectedItem", this.selectedItem);

    this.popupService.openModal(template);
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
      this.loadVehicles();
      this.alertsService.info("Succesfuly deleted!");
    })
  }

  customAction(value, template, billServiceTemplate) {
    switch (value.action) {
      case 'edit':
        this.editVehicleModal(value.data, template);
        break;
      case 'vehicleService':
        this.vehicleServiceModal(value.data, billServiceTemplate);
        break;
      case 'delete':
        this.deleteVehice(value.data);
        break;
    }
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
          title: 'Available',
          valuePrepareFunction: (data) => {
            if (data) {
              return 'Yes'
            }
            return 'No';
          }
        }
      },
      actions: {
        add: false,
        edit: false,
        delete: false,
        columnTitle: "Actions",
        position: "right",
        custom: [
          {
            name: 'edit',
            title: '<i class="fas fa-edit" data-toggle="tooltip" data-placement="top" title="Edit Vehicle"></i>'
          },
          {
            name: 'vehicleService',
            title: '<i class="fas fa-book" data-toggle="tooltip" data-placement="top" title="Add service book">&nbsp;</i>'
          },
          {
            name: 'delete',
            title: '<i class="fas fa-trash" data-toggle="tooltip" data-placement="top" title="Delete Vehicle"></i>'
          }],
      },
      edit: false,
      rowClassFunction(data) {
        console.log("Daaaaata", data.data.distance);
        if (data.data.distance > 300000) {
          return 'aborted'
        }
        if (data.data.distance - data.data.lastService > 30000) {
          return 'solved'
        }

      }
    }
  }

  ngOnDestroy() {
    this.vehicleSubscription.unsubscribe();

  }
}
