import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { SharedService } from './shared.service';
import { AlertsService } from './alerts/alerts.service';
import { AlertModule } from "ngx-bootstrap";
import { CommonModule } from '@angular/common';
import { AlertsComponent } from './alerts/alerts.component';


const utilRoutes: Routes = [
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: '/not-found' }
]
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(utilRoutes),
        AlertModule.forRoot(),],
    exports: [AlertsComponent],
    declarations: [
        NotFoundComponent,
        AlertsComponent
    ],
    providers: [SharedService, AlertsService],
})
export class UtilModule { }
