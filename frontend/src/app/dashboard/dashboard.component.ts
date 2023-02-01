import { Component, Input, OnInit } from '@angular/core';
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
    private userservice:UserService
    ){

  }
  ngOnInit() {
   this.getCurrentUser()
   this.getAllUser()
  }
  getAllUser() {
    this.userservice.getAll()
    .subscribe(usrs=>{
      const[sucess,users]=Object.values(usrs)
      return this.users=users
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
