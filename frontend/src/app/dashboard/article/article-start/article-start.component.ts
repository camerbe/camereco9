import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-article-start',
  templateUrl: './article-start.component.html',
  styleUrls: ['./article-start.component.css']
})
export class ArticleStartComponent implements OnInit {

  id:BigInt;
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
    this.authservice.logeduser.subscribe({
      next:(res)=>this.id=res['id']
    })
  }

}
