import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { Role } from 'src/app/shared/models/role.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RoleService } from 'src/app/shared/services/role.service';

@Component({
  selector: 'app-role-creation',
  templateUrl: './role-creation.component.html',
  styleUrls: ['./role-creation.component.css']
})
export class RoleCreationComponent implements OnInit{
roles:Role[]=[];
roleAddForm: FormGroup;
isAddMode: boolean;
id:number;

/**
 *
 */
constructor(
  private fb:FormBuilder,
    private roleService:RoleService,
    private router:Router,
    private authservice:AuthService,
    private route:ActivatedRoute
) {
  this.roleAddForm=this.fb.group({
    role:['',[Validators.required]],
    shortrole:['',[Validators.required]],
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
    this.roleService.show(this.id)
    .pipe(first())
    .subscribe({
      next:(res)=>{
        const rub=res['role']
        this.roleAddForm.patchValue(rub)
      },
      error:(err)=>console.log(err)
    })
  }
}

get role(){
  return this.roleAddForm.get('role')
}
get shortrole(){
  return this.roleAddForm.get('shortrole')
}
onSubmit() {
  this.authservice.logeduser.subscribe({
    next:(res)=>{
      this.roleAddForm.patchValue({
        createdBy:res.fullName,
        lastmodifiedBy:res.fullName
      })
    }
  })
  if(this.isAddMode){
    this.roleService.create(this.roleAddForm.value)
    .subscribe({
      next:(res)=> {
        if(res) this.router.navigate(['dashboard/role'])
      },
      error:(err)=>console.log(err)
    })
  }
  else{
    this.roleService.update(this.id,this.roleAddForm.value)
    .subscribe({
      next:(res)=>{
        if(res) this.router.navigate(['dashboard/role'])
      },
      error:(err)=>{
        console.log(err)
        this.router.navigate(['dashboard/role/edit',this.id])
      }

    })
  }
}

}
