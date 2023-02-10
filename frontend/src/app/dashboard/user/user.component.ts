import { Component, OnDestroy, OnInit, ɵclearResolutionOfComponentResourcesQueue } from '@angular/core';
import { ActivatedRoute,  Params, Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { User } from '../../models/user.model';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {

  users!:User[];
  id!: number;
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
    this.route.params.subscribe({
      next:(params)=>{
        this.id=+params['id']
        console.log(`Oninit id=${this.id}`)
      }
    })

  }
  deleteUser(userId:any) {
    // this.route.params.subscribe({
    //   next:(params)=>{
    //     this.id=+params['id']
    //     console.log(`onDelete id=${this.id}`)
    //   }
    // })

    console.log(`l'autre id : ${userId}`)
    console.log(`L'id dans deleteUser ${this.id}`)
    // this.userservice.delete(this.id).subscribe({
    //   next:(res)=>{
    //     if(res) this.router.navigate(['/dashboard/user'])
    //   },
    //   error:(e)=>{console.log(e)}
    // })
  }
}
