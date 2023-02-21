import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-dimension-start',
  templateUrl: './dimension-start.component.html',
  styleUrls: ['./dimension-start.component.less']
})
export class DimensionStartComponent implements OnInit{
  isTokenValid:boolean;
  /**
   *
   */
  constructor(
    private authservice:AuthService,
    private router:Router
    ) {


  }
  ngOnInit(): void {
    if (!this.authservice.loggedIn()){
      this.authservice.logout
      this.router.navigate(['/login'])
    }
  }

}
