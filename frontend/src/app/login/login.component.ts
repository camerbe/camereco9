import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { LogedUser } from '../shared/models/loged-user.model';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit{
  loginForm:FormGroup;
  errors:any=null;
  credential!: Credential;

  constructor(
    private fb:FormBuilder,
    private authservice:AuthService,
    private router:Router
  ){
    this.loginForm=this.fb.group({
      email:['',[Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]],
    })
  }
  get email(){
    return this.loginForm.get('email')
  }
  get password(){
    return this.loginForm.get('password')
  }
  ngOnInit(): void {
    this.authservice.logout
  }
  onSubmit() {

    this.authservice.signin(this.loginForm.value)
    this.authservice.isLoggedIn.subscribe({
      next:(res)=>{
        this.loginForm.patchValue({
          email:'',
          password:''
        })
        res? this.router.navigate(['/dashboard/user']): this.router.navigateByUrl('login')
      },
      error:(e)=>{
        console.log(e)
        this.router.navigateByUrl('login')
      }
    })

  }
}
