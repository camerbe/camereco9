import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { LogedUser } from '../shared/models/loged-user.model';
import { User } from '../shared/models/user.model';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  currentUser!: LogedUser;
  isTokenValid:boolean;
  @Input() users!:User[]

  constructor(
    private authservice:AuthService,
    private userservice:UserService,
    private route:Router
    ){

  }
  ngOnInit() {

    if (!this.authservice.loggedIn()){
      this.logout()
      this.route.navigate(['/login'])
    }
    this.getAllUser()
  }
  getAllUser() {
    this.getCurrentUser()
    this.userservice.getAll()
    .subscribe({
      next:(usrs)=>this.users=usrs["users"],
      error:(e)=>{
        this.logout()
        this.route.navigate(['/login'])
      }
    })
  }
  getCurrentUser(){
    this.authservice.logeduser.subscribe(result=>{
      const usr:LogedUser={
        fullName: result.fullName,
        id: result.id,
        message: result.message,
        role: result.role,
        sucess: result.sucess,
        token: result.token,
        tokenduration: result.tokenduration
      }
      this.currentUser=usr

     })
  }
  logout(){
    this.authservice.logout()
  }

}
