import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { SharedService } from './shared.service';
import { AlertsService } from './alerts/alerts.service';
import { AlertModule } from "ngx-bootstrap";
import { CommonModule } from '@angular/common';
import { AlertsComponent } from './alerts/alerts.component';
import { ConfirmModal } from './confirmation-modal/confirm-modal.component';


const utilRoutes: Routes = [
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: '/not-found' },
    { path: '**', redirectTo: '' }
]
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(utilRoutes),
        AlertModule.forRoot(),],
    exports: [AlertsComponent],
    declarations: [
        NotFoundComponent,
        AlertsComponent,
        ConfirmModal
    ],
    providers: [SharedService, AlertsService],
    entryComponents: [ConfirmModal]
})
export class UtilModule { }
