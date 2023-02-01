import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { User } from '../../models/user.model';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {

  users!:User[]

  constructor(
    private userservice:UserService,
    private route:ActivatedRoute
    ){

  }

  getAll(){
    this.userservice.getAll().subscribe((usrs)=>{
      const [sucess,users]=Object.values(usrs)
      this.users=users
      return this.users
      })
  }
  // create(){
  //   this.userservice.create().subscribe()
  // }
  ngOnInit(): void {
    this.getAll()

  }
  deleteUser() {
    let id=this.route.snapshot.params['id']
    this.userservice.delete(id,null).subscribe(res=>{
      if(res){
        console.log(res)
      }
    })
    this.route.params.subscribe((params:Params)=>{
      id=params['id']
    })
  }
}
