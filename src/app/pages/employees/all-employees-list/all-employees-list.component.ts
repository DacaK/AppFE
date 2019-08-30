import { AlertsService } from './../../../util/alerts/alerts.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

import { Employee } from './../../../entities/employee/employee';
import { ConfirmModal } from 'src/app/util/confirmation-modal/confirm-modal.component';

import { EmployeeService } from 'src/app/entities/employee/employee.service';


@Component({
  selector: 'app-all-employees-list',
  templateUrl: './all-employees-list.component.html',
  styleUrls: ['./all-employees-list.component.css']
})
export class AllEmployeesListComponent implements OnInit, OnDestroy {

  private employeesSubscription: Subscription;
  employeeList: Employee[] = [];
  bsModalRef: BsModalRef;
  settings = {};
  OK: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private alertsService: AlertsService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.loadEmployees();
  }


  loadEmployees() {
    this.employeesSubscription = this.employeeService.getAllEmployees().subscribe(res =>
      this.onSuccess(res)
    )
  }

  onSuccess(data) {
    this.employeeList = data;
    this.tableHeaders();

  }

  ToggleActivation(event) {
    (event.data.isActive) ? this.setUserDeactive(event.data) : this.setUserActive(event.data);
  }

  setUserDeactive(data) {
    const initialState = {
      title: `Are you sure you want to deactivate ${data.firstName}  ${data.lastName}`
    }
    this.bsModalRef = this.modalService.show(ConfirmModal, { initialState })
    this.bsModalRef.content.onClose = () => {
      this.bsModalRef.hide();
    };
    this.bsModalRef.content.onSave = () => {
      this.employeeService.deactivateEmployee(data.id).subscribe(
        res => {
          this.loadEmployees();
          this.alertsService.info(`${data.firstName}  ${data.lastName} is successfully deactivated`)
        },
        err => this.alertsService.warning('Something is wrong!')
      )
      this.bsModalRef.hide();
    };
  }
  setUserActive(data) {
    const initialState = {
      title: `Are you sure you want to activate ${data.firstName}  ${data.lastName}`
    }
    this.bsModalRef = this.modalService.show(ConfirmModal, { initialState })
    this.bsModalRef.content.onClose = () => {
      this.bsModalRef.hide();
    };
    this.bsModalRef.content.onSave = () => {
      this.employeeService.activateEmployee(data.id).subscribe(
        res => {
          this.loadEmployees();
          this.alertsService.info(`${data.firstName}  ${data.lastName} is successfully activated`)
        },
        err => this.alertsService.warning('Something is wrong!')
      )
      this.bsModalRef.hide();
    };

  }
  tableHeaders() {
    this.settings = {
      columns: {
        firstName: {
          title: 'First Name',
        },
        lastName: {
          title: 'Last Name'
        },
        username: {
          title: 'Username'
        },
        email: {
          title: 'Email'
        },
        authority: {
          title: 'role',
          editable: false,
          valuePrepareFunction: (authority) => {
            return authority.role;
          }
        },
        isActive: {
          title: 'Is active',
          valuePrepareFunction: (active) => {
            if (active) {
              return 'Active'
            }
            return 'Inactive';
          }
        }
      },

      actions: {
        add: false,
        edit: false,
        delete: false,
        position: "right",
        custom: [
          {
            name: 'handleRequest',
            title: '<button type="button" class="btn btn-success">Active/Inactive</button>'
          },

        ],

      },
      edit: false,
    };
  }

  ngOnDestroy() {
    this.employeesSubscription.unsubscribe();
  }


}
