import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { SharedService } from './shared.service';
// import { AlertsComponent } from './alerts/alerts.component';

const utilRoutes: Routes = [
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: '/not-found' }
]
@NgModule({
    imports: [RouterModule.forChild(utilRoutes)],
    exports: [],
    declarations: [NotFoundComponent,
        //  AlertsComponent
    ],
    providers: [SharedService],
})
export class UtilModule { }
