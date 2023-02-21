import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
[x: string]: any;
  isTokenValid:boolean;
  userAddForm!: FormGroup;

  constructor(private fb:FormBuilder,
    private userservice:UserService,
    private authservice:AuthService,
    private router:Router) {
      this.userAddForm=this.fb.group({
        nom:['',[Validators.required]],
        prenom:['',[Validators.required]],
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required,Validators.minLength(6)]],
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
    this.router.navigate([this.router.url])
  }
  onSubmit() {
    this.userservice.create(this.userAddForm.value)
    .subscribe({
      next:(result)=>{
        const res:userResponse=result as userResponse
        if(res.sucess)
          this.router.navigateByUrl('dashboard/user')
        else
        this.router.navigateByUrl('dashboard/user/add')
      },
      error:(e)=>{console.log(e)}
    })

  }
  getAllUsers() {
    this.router.navigate(['/dashboard/user'])
  }
}
