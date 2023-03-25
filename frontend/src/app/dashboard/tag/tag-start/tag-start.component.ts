import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-tag-start',
  templateUrl: './tag-start.component.html',
  styleUrls: ['./tag-start.component.css']
})
export class TagStartComponent implements OnInit{

  /**
   *
   */
  constructor(
    private authservice:AuthService,
    private router:Router,

  ) {}

  ngOnInit(): void {
    if (!this.authservice.loggedIn()){
      this.authservice.logout
      this.router.navigate(['/login'])
    }
  }

}
