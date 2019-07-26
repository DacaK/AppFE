import { Component, OnInit, NgZone } from '@angular/core';
import { Alerts } from './alerts.model';
import { AlertsService } from './alerts.service';
import { AppSettings } from '../app-settings';

@Component({
    selector: 'app-alerts',
    templateUrl: './alerts.component.html',
    styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {


    showStatus: boolean;
    timeout = AppSettings.ALERT_TIMEOUT;
    alerts: Alerts[] = [];

    constructor(
        private alertService: AlertsService,
        private ngZone: NgZone
    ) { }

    ngOnInit() {
        this.alertService.getAlert().subscribe((alert: Alerts) => {
            if (!alert) {
                this.alerts = [];
                return;
            }
            this.alerts.push(alert);
            this.showStatus = true;

            this.ngZone.runOutsideAngular(() =>
                setTimeout(() =>
                    this.ngZone.run(() =>
                        this.showStatus = false,
                        this.alerts = []
                    ), this.timeout
                )
            )
        });
    }

}
