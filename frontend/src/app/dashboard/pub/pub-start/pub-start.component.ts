import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-pub-start',
  templateUrl: './pub-start.component.html',
  styleUrls: ['./pub-start.component.less']
})
export class PubStartComponent implements OnInit{
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
