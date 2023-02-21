import { Component, OnDestroy, OnInit, ɵclearResolutionOfComponentResourcesQueue } from '@angular/core';
import { ActivatedRoute,  Params, Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {
  isTokenValid:boolean;
  users!:User[];
  id!: number;
  constructor(
    private userservice:UserService,
    private route:ActivatedRoute,
    private router:Router,
    private authservice:AuthService
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

    if (!this.authservice.loggedIn()){
      this.authservice.logout
      this.router.navigate(['/login'])
    }
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
