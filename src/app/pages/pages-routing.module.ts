import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

const pagesRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
]

@NgModule({
    imports: [RouterModule.forChild(pagesRoutes)],
    exports: [],
    declarations: [],
})
export class PagesModule { }