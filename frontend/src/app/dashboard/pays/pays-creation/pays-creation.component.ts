import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PaysService } from 'src/app/shared/services/pays.service';

@Component({
  selector: 'app-pays-creation',
  templateUrl: './pays-creation.component.html',
  styleUrls: ['./pays-creation.component.css']
})
export class PaysCreationComponent implements OnInit{

  paysAddForm: FormGroup;
  isAddMode:boolean;
  id:string;
  /**
   *
   */
  constructor(
    private fb:FormBuilder,
    private paysService:PaysService,
    private authservice:AuthService,
    private route:ActivatedRoute,
    private router:Router

  ) {
    this.paysAddForm=this.fb.group({
      code:['',Validators.required],
      pays:['',Validators.required],
      country:['',Validators.required],
      createdBy:[''],
      lastmodifiedBy:['']
    })
  }
  get code(){
    return this.paysAddForm.get('code');
  }
  get pays(){
    return this.paysAddForm.get('pays');
  }
  get country(){
    return this.paysAddForm.get('country');
  }

  ngOnInit(): void {
    if (!this.authservice.loggedIn()){
      this.authservice.logout
      this.router.navigate(['/login'])
    }
    this.id=this.route.snapshot.params['code']
    this.isAddMode=!this.id
    if(!this.isAddMode){
      this.paysService.show(this.id)
        .pipe(first())
        .subscribe({
          next:(res) =>this.paysAddForm.patchValue(res['pays']),
          error:(err)=>console.log(err)
        })
    }
  }

  onSubmit() {
    this.authservice.logeduser.subscribe({
      next:(res)=>{
        this.paysAddForm.patchValue({
          createdBy:res.fullName,
          lastmodifiedBy:res.fullName
        })
      }
    })
    if(this.isAddMode){
      this.paysService.create(this.paysAddForm.value)
        .subscribe({
          next:(res)=>{
            if(res['sucess']){
              this.router.navigate(['dashboard/pays'])
            }
            else{
              this.router.navigate(['dashboard/pays/edit',this.id])
            }
          },
          error:(err)=>{
            console.log(err);
            this.router.navigate(['dashboard/pays/edit',this.id])
          }
        })
    }
    else{
      this.paysService.update(this.id,this.paysAddForm.value)
      .subscribe({
        next:(res)=>{
          if(res['sucess']){
            this.router.navigate(['dashboard/pays'])
          }
          else{
            this.router.navigate(['dashboard/pays/edit',this.id])
          }
        },
        error:(err)=>{
          console.log(err)
          this.router.navigate(['dashboard/pays/edit',this.id])
        }
      })
    }
  }
}
