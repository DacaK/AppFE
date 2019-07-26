import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Role } from 'src/app/entities/employee/role';

import { SharedService } from './../../util/shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  private currentUserSubscription: Subscription;

  private isLoggedInSubscription: Subscription;
  private isAdminSubscription: Subscription;
  isLoggedIn: boolean = false;
  // isAdmin: any;
  currentUser: any;

  constructor(private sharedService: SharedService, private authService: AuthService) { }

  ngOnInit() {
    this.authService.currentUser$.subscribe(
      res => {
        this.currentUser = res;
      }
    )


  }
  get isAdmin() {
    return this.currentUser && this.currentUser.pmfkm === Role.ADMIN;
  }


  ngOnDestroy() {
    this.isLoggedInSubscription.unsubscribe();
    this.isAdminSubscription.unsubscribe();
  }

}
