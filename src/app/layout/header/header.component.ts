import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { SharedService } from './../../util/shared.service';
import { Subscription } from 'rxjs';

import { AuthService } from './../../auth/auth.service';
import { TravelOrderService } from 'src/app/entities/travel-order/travel-order.service';
import { AlertsService } from 'src/app/util/alerts/alerts.service';
import { TravelOrder } from 'src/app/entities/travel-order/travel-order';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() logoutMessageEvent: EventEmitter<any> = new EventEmitter();

  private currentLoggedUserSubscription: Subscription;
  createdSubscription: Subscription;
  private isLoggedInSubscription: Subscription;
  createdTravelOrder: TravelOrder[] = [];
  createdTravelRequestLength: number;

  isLoggedIn: boolean = false;
  public currentUser = {
    // sub: '',
    // pmfkm: 'ROLE_USER',
    // exp: null,
    // iat: null

  };

  constructor(
    private authService: AuthService,
    private travelOrderService: TravelOrderService,
    private sharedService: SharedService,
    private alertsService: AlertsService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.currentLoggedUserSubscription = this.authService.currentUser$.subscribe(
      res => {
        this.currentUser = res;
      }
    )

    this.createdSubscription = this.travelOrderService.getCreatedTravelOrder().subscribe(
      res => this.onSuccess(res),
      err => this.alertsService.error('Something is wrong. Try later')
    )
  }


  onSuccess(data) {
    this.createdTravelOrder = data;
    console.log("ssssssssssss", this.createdTravelOrder);
    this.createdTravelRequestLength = this.createdTravelOrder.length;
  }

  onLogut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  ngOnDestroy() {
    this.currentLoggedUserSubscription.unsubscribe();
    this.isLoggedInSubscription.unsubscribe();
  }
}


