import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RubriqueService } from 'src/app/shared/services/rubrique.service';

@Component({
  selector: 'app-rubrique-creation',
  templateUrl: './rubrique-creation.component.html',
  styleUrls: ['./rubrique-creation.component.css']
})
export class RubriqueCreationComponent implements OnInit {
  rubriqueAddForm!: FormGroup;
  isAddMode:boolean;
  id:number;
  /**
   *
   */
  constructor(
    private fb:FormBuilder,
    private rubriqueService:RubriqueService,
    private router:Router,
    private authservice:AuthService,
    private route:ActivatedRoute
  ) {
    this.rubriqueAddForm=this.fb.group({
      rubrique:['',[Validators.required]],
      createdBy:[],
      lastmodifiedBy:[]
    })
  }
get rubrique(){
  return this.rubriqueAddForm.get("rubrique")
}
onSubmit() {
  this.authservice.logeduser.subscribe({
    next:(res)=>{
      this.rubriqueAddForm.patchValue({
        createdBy:res.fullName,
        lastmodifiedBy:res.fullName
      })
    }
  })
  if(this.isAddMode){
    this.rubriqueService.create(this.rubriqueAddForm.value)
    .subscribe({
      next:(res)=> {
        if(res) this.router.navigate(['dashboard/rubrique'])
      },
      error:(err)=>console.log(err)
    })
  }
  else{
    this.rubriqueService.update(this.id,this.rubriqueAddForm.value)
    .subscribe({
      next:(res)=>{

        if(res) this.router.navigate(['dashboard/rubrique'])
      },
      error:(err)=>{
        console.log(err)
        this.router.navigate(['dashboard/rubrique/edit',this.id])
      }

    })
  }
}
  ngOnInit(): void {
    if (!this.authservice.loggedIn()){
      this.authservice.logout
      this.router.navigate(['/login'])
    }
    this.id = +this.route.snapshot.params['id'];
    this.isAddMode=!this.id
    if(!this.isAddMode){
      this.rubriqueService.show(this.id)
      .pipe(first())
      .subscribe({
        next:(res)=>{
          const rub=res['rubrique']
          this.rubriqueAddForm.patchValue(rub)
        },
        error:(err)=>console.log(err)
      })
    }
  }

}
