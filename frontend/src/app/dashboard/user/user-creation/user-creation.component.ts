import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { Role } from 'src/app/shared/models/role.model';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

export interface userResponse{
  sucess:boolean;
  utilisateur:{
    id:bigint,
    fullname:string,
    email:string,
    lastmodifiedBy:string,
    createdBy:string,
    suspended:boolean
  };
  message:string;

}
@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.less']
})

export class UserCreationComponent implements OnInit{

  isAddMode:boolean;
  id:number;
  roleId:number;
  userAddForm!: FormGroup;

  constructor(private fb:FormBuilder,
    private userservice:UserService,
    private authservice:AuthService,
    private router:Router,
    private route:ActivatedRoute) {
      this.userAddForm=this.fb.group({
        nom:['',[Validators.required]],
        prenom:['',[Validators.required]],
        email:['',[Validators.required,Validators.email]],
        password:['123456',[Validators.required,Validators.minLength(6)]],
        role:[[Validators.required]],

      })

  }

  get nom(){
    return this.userAddForm.get('nom')
  }
  get prenom(){
    return this.userAddForm.get('prenom')
  }
  get email(){
    return this.userAddForm.get('email')
  }
  get password(){
    return this.userAddForm.get('password')
  }
  get role(){
    return this.userAddForm.get('role')
  }

  ngOnInit(): void {
    if (!this.authservice.loggedIn()){
      this.authservice.logout
      this.router.navigate(['/login'])
    }
    this.id = +this.route.snapshot.params['id'];
    this.isAddMode=!this.id
    if(!this.isAddMode){
      this.userservice.show(this.id).
      pipe(first())
      .subscribe({
        next:(res)=>{
          const resUser=res["Utilisateur"] as User
          const roles=resUser.roles as Role
          this.userAddForm.patchValue({
            role:roles[0].id
          })
          this.roleId=roles[0].id
          this.userAddForm.patchValue(resUser)


        },
        error:(err)=>{console.log(err)}
      })
    }
    //this.router.navigate([this.router.url])
  }
  onSubmit() {
    console.log(`form : ${this.userAddForm.valid}`)
    this.authservice.logeduser.subscribe({
      next:(res)=>{
        this.userAddForm.patchValue({
          createdBy:res.fullName,
          lastmodifiedBy:res.fullName
        })
      }
    })
    if(this.isAddMode){
      this.userservice.create(this.userAddForm.value)
      .subscribe({
        next:(res)=>{
          if(res['sucess']) this.router.navigateByUrl('dashboard/user')
          else{
            console.log(res['message'])
            this.router.navigateByUrl('dashboard/user/add')
          }
        },
        error:(err)=>{
          console.log(err)
          this.router.navigateByUrl('dashboard/user/add')
        }
      })
    }
    else{
      this.userservice.update(this.id,this.userAddForm.value)
      .subscribe({
        next:(res)=>{
          if(res['sucess']) this.router.navigateByUrl('dashboard/user')
          else{
            console.log(res['message'])
            this.router.navigateByUrl('dashboard/user/add')
          }
        },
        error:(err)=>{
          console.log(err)
          this.router.navigate(['dashboard/user/edit',this.id])
        }
      })
    }


  }

}
