import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/entities/employee/employee';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  currentUser: Employee;
  role: any;
  x: any;
  admin: boolean = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    // this.x = this.authService.getCurrentLoggedUser()
    //   .subscribe(res => {
    //     this.currentUser = res;
    //     console.log(this.currentUser);
    //     this.role = this.currentUser.authority.role;
    //     console.log(this.role);
    //     this.isAdmin(res);
    //   }
    //   );
  }

  isAdmin(data) {
    console.log(data);

    console.log("dfdfsd", this.currentUser.authority.role);
    // console.log(this.currentUser.authority.role === 'ADMIN');
    this.admin = this.currentUser.authority.role === 'ADMIN'
    console.log(this.admin);

    return this.admin;


  }



}
