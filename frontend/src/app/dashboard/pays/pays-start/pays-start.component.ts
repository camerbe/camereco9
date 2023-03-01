import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-pays-start',
  templateUrl: './pays-start.component.html',
  styleUrls: ['./pays-start.component.css']
})
export class PaysStartComponent implements OnInit{


  constructor(
    private router:Router,
    private authservice:AuthService
  ) {}
  ngOnInit(): void {
    if (!this.authservice.loggedIn()){
      this.authservice.logout
      this.router.navigate(['/login'])
    }
  }



}
