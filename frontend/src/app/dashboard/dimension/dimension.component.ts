import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dimension } from 'src/app/models/dimension';
import { AuthService } from 'src/app/shared/auth.service';
import { DimensionService } from 'src/app/shared/dimension.service';

@Component({
  selector: 'app-dimension',
  templateUrl: './dimension.component.html',
  styleUrls: ['./dimension.component.less']
})
export class DimensionComponent implements OnInit {

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

  deleteDimension(id: bigint) {
    this.dimensionservice.delete(id)
      .subscribe({
        next:(res)=>{
          if(res) this.router.navigate(['/dashboard/dimension'])
        },
        error:(e)=>console.log(e)

      })
    }
  getAll(){
    return this.dimensionservice.getAll()
      .subscribe({
        next:(res)=>{
          this.dimensions=Object.values(res)[0].data
          return this.dimensions
        },
        error:(e)=>{
          console.log(e)
        }
      })
  }

  ngOnInit(): void {
   this.getAll()
  }

}
