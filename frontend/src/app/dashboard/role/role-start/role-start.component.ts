import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-role-start',
  templateUrl: './role-start.component.html',
  styleUrls: ['./role-start.component.css']
})
export class RoleStartComponent implements OnInit{
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
