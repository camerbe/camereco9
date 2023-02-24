import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-rubrique-start',
  templateUrl: './rubrique-start.component.html',
  styleUrls: ['./rubrique-start.component.css']
})
export class RubriqueStartComponent implements OnInit{
  /**
   *
   */
  constructor(
    private authservice:AuthService,
    private router:Router
  ) {}
  ngOnInit(): void {
    if (!this.authservice.loggedIn()){
      this.authservice.logout
      this.router.navigate(['/login'])
    }
  }
}
