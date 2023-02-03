import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { LogedUser } from '../models/loged-user.model';
import { User } from '../models/user.model';
import { AuthService } from '../shared/auth.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  currentUser!: LogedUser;
  @Input() users!:User[]
  constructor(
    private authservice:AuthService,
    private userservice:UserService,
    private route:Router
    ){

  }
  ngOnInit() {
    this.getAllUser()
  }
  getAllUser() {
    this.getCurrentUser()
    this.userservice.getAll()
    .subscribe({
      next:(usrs)=>{
        const[sucess,users]=Object.values(usrs)
        return this.users=users
      },
      error:(e)=>{
        //console.log(e)
        this.logout()
        this.route.navigate(['/login'])
      }
    })
  }
  getCurrentUser(){
    this.authservice.logeduser.subscribe(result=>{
      const usr:LogedUser={
        fullName:result.fullName,
        id:result.id,
        message:result.message,
        role:result.role,
        sucess:result.sucess,
        token:result.token
      }
      this.currentUser=usr

     })
  }
  logout(){
    this.authservice.logout()
  }

}
