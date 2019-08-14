import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Chart } from 'chart.js'

import { TravelOrder } from 'src/app/entities/travel-order/travel-order';

import { TravelOrderService } from './../../entities/travel-order/travel-order.service';
import { AlertsService } from './../../util/alerts/alerts.service';
import { log } from 'util';



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
    this.loadStatuses();
  }

  loadStatuses() {
    this.statusTravelOrderSubscription = this.travelOrderService.getAllTravelOrder().subscribe(
      res => this.onSuccessStatus(res),
      err => this.alertsService.error("Invalid username or password")
    )
  }

  onSuccessStatus(data) {
    let statusesPreviousMonth: TravelOrder[] = [];
    this.travelStatuses = data;

    for (let i = 0; i < this.travelStatuses.length; i++) {
      const element = this.travelStatuses[i];
      let createOrderDate = new Date(element.createdAt).getMonth();
      let currentDate = new Date().getMonth();
      if (currentDate - createOrderDate === 0) {
        statusesPreviousMonth.push(element);
      }
    }
    this.preparePieChart(statusesPreviousMonth);
    this.prepareBarChart();

  }
  preparePieChart(statusesPreviousMonth) {
    let allStatuses = [];
    let statusCreated: any = [];
    let statusApproved: any = [];
    let statusFinished: any = [];
    let statusRefused: any = [];

    let statusCreatedSum: number = 0;
    let statusApprovedSum: number = 0;
    let statusRefusedSum: number = 0;
    let statusFinishedSum: number = 0;

    for (let i = 0; i < statusesPreviousMonth.length; i++) {
      if (statusesPreviousMonth[i].travelStatus.name === 'created') {
        statusCreatedSum++;
        statusCreated.push(statusesPreviousMonth[i].travelStatus.id);
      }
      else if (statusesPreviousMonth[i].travelStatus.name === 'approved') {
        statusApprovedSum++;
        statusApproved.push(statusesPreviousMonth[i].travelStatus.id);
      }
      else if (statusesPreviousMonth[i].travelStatus.name === 'refused') {
        statusRefusedSum++;
        statusRefused.push(statusesPreviousMonth[i].travelStatus.id);
      }
      else {
        statusFinishedSum++
        statusFinished.push(statusesPreviousMonth[i].travelStatus.id);
      }
    }

    allStatuses[0] = statusCreatedSum;
    allStatuses[1] = statusApprovedSum;
    allStatuses[2] = statusRefusedSum;
    allStatuses[3] = statusFinishedSum;
    this.travelStatusPieChart(allStatuses);
  }

  travelStatusPieChart(data) {
    let travelStatusPieChart = new Chart('travelStatusPieChart', {
      type: 'pie',
      data: {
        datasets: [{
          data: data,
          backgroundColor: ['#36b9cc', '#1cc88a', '#ffff99', '#4e73df'],
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

  prepareBarChart() {
    let statusCreated: any = [];
    let statusApproved: any = [];
    let statusFinished: any = [];
    let statusRefused: any = [];

    let lastSixMonthData = [];
    var currentDate = new Date();
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let lastSixMonthLabel = []

    for (let i = 0; i < 6; i++) {
      lastSixMonthLabel.push(months[(currentDate.getMonth() - i)]);
    }

    for (var i = 0; i < 6; i++) {
      let statusCreatedSum: number = 0;
      let statusApprovedSum: number = 0;
      let statusRefusedSum: number = 0;
      let statusFinishedSum: number = 0;

      for (var j = 0; j < this.travelStatuses.length; j++) {
        if (new Date(this.travelStatuses[j].createdAt).getMonth() == (new Date().getMonth() - i)) {
          if (this.travelStatuses[j].travelStatus.name === 'created') {
            statusCreatedSum++;
          }
          else if (this.travelStatuses[j].travelStatus.name === 'approved') {
            statusApprovedSum++;
          }
          else if (this.travelStatuses[j].travelStatus.name === 'refused') {
            statusRefusedSum++;
          }
          else statusFinishedSum++;

        }
      }
      statusCreated.push(statusCreatedSum);
      statusApproved.push(statusApprovedSum);
      statusFinished.push(statusFinishedSum);
      statusRefused.push(statusRefusedSum);
    }
    lastSixMonthData[0] = lastSixMonthLabel.reverse();
    lastSixMonthData[1] = statusCreated.reverse();
    lastSixMonthData[2] = statusApproved.reverse();
    lastSixMonthData[3] = statusRefused.reverse();
    lastSixMonthData[4] = statusFinished.reverse();

    this.travelStatusBarChart(lastSixMonthData);
  }

  travelStatusBarChart(data) {
    var barChartData = {
      labels: data[0],
      datasets: [
        {
          label: "Created",
          backgroundColor: "#36b9cc",
          borderColor: "#36b9cc",
          borderWidth: 1,
          data: data[1]
        },
        {
          label: "Approved",
          backgroundColor: "#1cc88a",
          borderColor: "#1cc88a",
          borderWidth: 1,
          data: data[2]
        },
        {
          label: "Refused",
          backgroundColor: "#ffff99",
          borderColor: "#ffff99",
          borderWidth: 1,
          data: data[3]
        },
        {
          label: "Finished",
          backgroundColor: "#4e73df",
          borderColor: "#4e73df",
          borderWidth: 1,
          data: data[4]
        }
      ]
    };
    var chartOptions = {
      responsive: true,
      legend: {
        position: "top"
      },
      // title: {
      //   display: true,
      //   text: "Bar Chart"
      // },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
    var myBarChart = new Chart('travelStatusBarChart', {
      type: 'bar',
      data: barChartData,
      options: chartOptions
    });
  }

}
