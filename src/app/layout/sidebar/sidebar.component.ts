import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { SharedService } from './../../util/shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  private isLoggedInSubscription: Subscription;
  private isAdminSubscription: Subscription;
  isLoggedIn: boolean = false;
  isAdmin: boolean;

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.isLoggedInSubscription = this.sharedService.isLoggedIn$.subscribe(res => {
      this.isLoggedIn = res;
    });
    this.isAdminSubscription = this.sharedService.isAdmin$.subscribe(res => {
      this.isAdmin = res;
    })
  }


  ngOnDestroy() {
    this.isLoggedInSubscription.unsubscribe();
    this.isAdminSubscription.unsubscribe();
  }

}
