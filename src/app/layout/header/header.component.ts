import { SharedService } from './../../util/shared.service';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/entities/employee/employee';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() logoutMessageEvent: EventEmitter<any> = new EventEmitter();

  private currentLoggedUserSubscription: Subscription;
  private isLoggedInSubscription: Subscription;

  isLoggedIn: boolean = false;
  private currentUser: Employee = null;

  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit() {
    this.currentLoggedUserSubscription = this.sharedService.currentLoggedUser$.subscribe(
      res => this.currentUser = res
    )
    this.isLoggedInSubscription = this.sharedService.isLoggedIn$.subscribe(res =>
      this.isLoggedIn = res);
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


