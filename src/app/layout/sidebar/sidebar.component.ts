import { SharedService } from './../../util/shared.service';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Employee } from 'src/app/entities/employee/employee';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  private isLoggedInSubscription: Subscription;
  isLoggedIn: boolean = false;

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.isLoggedInSubscription = this.sharedService.isLoggedIn$.subscribe(res => {
      this.isLoggedIn = res;
      console.log(this.isLoggedIn)
    });
  }


  ngOnDestroy() {
    this.isLoggedInSubscription.unsubscribe();
  }

}
