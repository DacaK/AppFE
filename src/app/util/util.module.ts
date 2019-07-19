import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const utilRoutes: Routes = [
    { path: 'not-found', component: NotFoundComponent, data: { message: 'Page not found!' } },
    { path: '**', redirectTo: '/not-found' }
]
@NgModule({
    imports: [RouterModule.forChild(utilRoutes)],
    exports: [],
    declarations: [NotFoundComponent],
    providers: [],
})
export class UtilModule { }
