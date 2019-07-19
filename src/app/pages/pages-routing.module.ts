import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';

const pagesRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
]

@NgModule({
    imports: [RouterModule.forChild(pagesRoutes)],
    exports: [],
    declarations: [],
})
export class PagesModule { }