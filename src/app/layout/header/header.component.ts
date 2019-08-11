import { Subscription } from 'rxjs';

import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


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
  public currentUser = {
    // sub: '',
    // pmfkm: 'ROLE_USER',
    // exp: null,
    // iat: null

  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.currentLoggedUserSubscription = this.authService.currentUser$.subscribe(
      res => {
        this.currentUser = res;


      }
    )
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


