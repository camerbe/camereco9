import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
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
    private route:ActivatedRoute,
    private router:Router
    ){

  }

  getAll(){
    return this.userservice.getAll().subscribe({
      next:(usrs)=>{
        const [sucess,users]=Object.values(usrs)
        this.users=users
        return this.users
      },
      error:(e)=>{
        console.log(e)
      }
    })
  }


  // create(){
  //   this.userservice.create().subscribe()
  // }
  ngOnInit(): void {
    this.getAll()
  }
  deleteUser(userId:any) {

    let id=+userId
    this.userservice.delete(id).subscribe({
      next:(res)=>{
        if(res) this.router.navigate(['/dashboard/user'])
      },
      error:(e)=>{console.log(e)}
    })
  }
}
