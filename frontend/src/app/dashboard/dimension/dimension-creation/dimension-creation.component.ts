import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { Dimension } from 'src/app/shared/models/dimension';
import { LogedUser } from 'src/app/shared/models/loged-user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DimensionService } from 'src/app/shared/services/dimension.service';

@Component({
  selector: 'app-dimension-creation',
  templateUrl: './dimension-creation.component.html',
  styleUrls: ['./dimension-creation.component.less']
})
export class DimensionCreationComponent implements OnInit{
  isAddMode:boolean;
  id:number;
  dimensionAddForm!: FormGroup;
  constructor(
    private fb:FormBuilder,
    private dimensionservice:DimensionService,
    private router:Router,
    private authservice:AuthService,
    private route:ActivatedRoute
    ) {

      this.dimensionAddForm=this.fb.group({
        dimension:['',[Validators.required]],
        createdBy:[],
        lastmodifiedBy:[]
      })

  }
  ngOnInit(): void {
    if (!this.authservice.loggedIn()){
      this.authservice.logout
      this.router.navigate(['/login'])
    }
    this.id = +this.route.snapshot.params['id'];
    this.isAddMode=!this.id
    if(!this.isAddMode){
      this.dimensionservice.show(this.id).
      pipe(first())
      .subscribe({
        next:(res:Response)=>{
          const resDim=res["Dimension"] as Dimension
          this.dimensionAddForm.patchValue(resDim)

        },
        error:(err)=>{console.log(err)}
      })
    }
  }
  get dimension(){
    return this.dimensionAddForm.get('dimension')
  }
  onSubmit() {

    this.authservice.logeduser.subscribe({
      next:(res)=>{
        this.dimensionAddForm.patchValue({
          createdBy:res.fullName,
          lastmodifiedBy:res.fullName
        })
      }
    })
    if (this.isAddMode){
      this.dimensionservice.create(this.dimensionAddForm.value)
      .subscribe({
        next:(res)=>{
          if(res) this.router.navigate(['/dashboard/dimension'])
        },
        error:(e)=>{console.log(e)}
      })
    }
    else{
      this.dimensionservice.update(this.id,this.dimensionAddForm.value)
      .subscribe({
        next:(res)=>{
          if (res) this.router.navigate(['/dashboard/dimension'])
        },
        error:(err)=>{
          console.log(err)
          this.router.navigate(['/dashboard/dimension/edit'+this.id])
        }
      })
    }



    }
}
