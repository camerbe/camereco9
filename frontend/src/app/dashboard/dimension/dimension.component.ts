import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dimension } from 'src/app/shared/models/dimension';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DimensionService } from 'src/app/shared/services/dimension.service';

@Component({
  selector: 'app-dimension',
  templateUrl: './dimension.component.html',
  styleUrls: ['./dimension.component.less']
})
export class DimensionComponent implements OnInit {
  isTokenValid:boolean;
  dimensions: Dimension[] = [];
  /**
   *
   */
  constructor(
    private dimensionservice:DimensionService,
    private authservice:AuthService,
    private router:Router
    ) {


  }

  deleteDimension(id:bigint) {
    this.dimensionservice.delete(id)
      .subscribe({
        next:(res:Response)=>{
          if(res.ok) {
            this.getAll()
            this.router.navigate(['/dashboard/dimension'])
          }
        },
        error:(e)=>console.log(e)

      })
    }
  getAll(){
    return this.dimensionservice.getAll()
      .subscribe({
        next:(res)=>{
          this.dimensions=res["dimensions"]
          return this.dimensions
        },
        error:(e)=>{
          console.log(e)
        }
      })
  }

  ngOnInit(): void {
    if (!this.authservice.loggedIn()){
      this.authservice.logout
      this.router.navigate(['/login'])
    }
   this.getAll()
  }

}
