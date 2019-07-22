import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesRoutingModule } from './pages-routing.module';
import { TokenInterceptorService } from '../auth/token-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
    imports: [
        PagesRoutingModule
    ],
    exports: [],
    declarations: [DashboardComponent],
    providers: [TokenInterceptorService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true
        }],
})
export class PagesModule { }
