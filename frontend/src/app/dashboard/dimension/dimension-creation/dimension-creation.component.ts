import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LogedUser } from 'src/app/models/loged-user.model';
import { AuthService } from 'src/app/shared/auth.service';
import { DimensionService } from 'src/app/shared/dimension.service';

@Component({
  selector: 'app-dimension-creation',
  templateUrl: './dimension-creation.component.html',
  styleUrls: ['./dimension-creation.component.less']
})
export class DimensionCreationComponent {

  dimensionAddForm!: FormGroup;
  constructor(
    private fb:FormBuilder,
    private dimensionservice:DimensionService,
    private router:Router,
    private authservice:AuthService
    ) {

      this.dimensionAddForm=this.fb.group({
        dimension:[],
        createdBy:[],
        lastmodifiedBy:[]
      })

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

    this.dimensionservice.create(this.dimensionAddForm.value)
      .subscribe({
        next:(res)=>{
          if(res) this.router.navigate(['/dashboard/dimension'])
        },
        error:(e)=>{console.log(e)}
      })
    }
}
