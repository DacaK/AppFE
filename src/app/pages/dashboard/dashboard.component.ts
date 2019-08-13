import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Chart } from 'chart.js'

import { TravelOrder } from 'src/app/entities/travel-order/travel-order';

import { TravelOrderService } from './../../entities/travel-order/travel-order.service';
import { AlertsService } from './../../util/alerts/alerts.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  statusTravelOrderSubscription: Subscription;

  travelStatuses: TravelOrder[] = [];

  constructor(
    private travelOrderService: TravelOrderService,
    private alertsService: AlertsService
  ) { }

  ngOnInit() {

    this.getChart();
    this.loadStatuses();
  }

  loadStatuses() {
    this.statusTravelOrderSubscription = this.travelOrderService.getAllTravelOrder().subscribe(
      res => this.onSuccessStatus(res),
      err => this.alertsService.error("Invalid username or password")
    )
  }

  onSuccessStatus(data) {
    this.travelStatuses = data;
    this.prepareChart();

  }
  prepareChart() {
    let allStatuses = [];
    let statusCreated: any = [];
    let statusApproved: any = [];
    let statusFinished: any = [];
    let statusRefused: any = [];

    let statusCreatedSum: number = 0;
    let statusApprovedSum: number = 0;
    let statusRefusedSum: number = 0;
    let statusFinishedSum: number = 0;
    for (let i = 0; i < this.travelStatuses.length; i++) {
      if (this.travelStatuses[i].travelStatus.name === 'created') {
        statusCreatedSum++;
        statusCreated.push(this.travelStatuses[i].travelStatus.id);
      }
      else if (this.travelStatuses[i].travelStatus.name === 'approved') {
        statusApprovedSum++;
        statusApproved.push(this.travelStatuses[i].travelStatus.id);
      }
      else if (this.travelStatuses[i].travelStatus.name === 'refused') {
        statusRefusedSum++;
        statusRefused.push(this.travelStatuses[i].travelStatus.id);
      }
      else {
        statusFinishedSum++
        statusFinished.push(this.travelStatuses[i].travelStatus.id);
      }

    }

    allStatuses[0] = statusCreatedSum;
    allStatuses[1] = statusApprovedSum;
    allStatuses[2] = statusRefusedSum;
    allStatuses[3] = statusFinishedSum;
    this.travelStatusPieChart(allStatuses);
  }

  travelStatusPieChart(data) {
    var travelStatusPieChart = new Chart('travelStatusPieChart', {
      type: 'pie',
      data: {
        datasets: [{
          data: data,
          backgroundColor: ['#36b9cc', '#1cc88a', '#ffff99', '#4e73df'],
          hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
          hoverBorderColor: "rgba(234, 236, 244, 1)",
        }],
        labels: [
          'Created',
          'Aproved',
          'Refused',
          'Finished'
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          fontSize: 10,
          display: true,
        },

      }
    });
  }

  getChart() {
    // new Chart('lineChart', {
    //   type: 'line',
    //   data: {
    //     labels: ["100", "200", "300", "400", "500", "600", "700", "800", "900", "1000", "1100", "1200"],
    //     datasets: [{
    //       label: 'Number of Items Sold in Months',
    //       data: [5, 8, 9, 2, 3],
    //       fill: false,
    //       lineTension: 0.2,
    //       borderColor: "red",
    //       borderWidth: 1
    //     }]
    //   },
    //   options: {
    //     title: {
    //       text: "Line Chart",
    //       display: true
    //     },
    //     scales: {
    //       yAxes: [{
    //         ticks: {
    //           beginAtZero: true
    //         }
    //       }]
    //     }
    //   }
    // });
  }

}
