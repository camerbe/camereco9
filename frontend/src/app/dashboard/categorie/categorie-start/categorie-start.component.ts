import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-categorie-start',
  templateUrl: './categorie-start.component.html',
  styleUrls: ['./categorie-start.component.css']
})
export class CategorieStartComponent implements OnInit{
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
