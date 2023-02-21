import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-start',
  templateUrl: './user-start.component.html',
  styleUrls: ['./user-start.component.less']
})
export class UserStartComponent implements OnInit {

  users!:User[];
  id!: Number;
  isTokenValid:boolean;
  constructor(
    private userservice:UserService,
    private route:ActivatedRoute,
    private authservice:AuthService,
    private router:Router) {

  }
  getAll(){
    this.userservice.getAll()
      .subscribe({
        next:(res)=>{
          const [sucess,users]=Object.values(res)
          this.users=users
          return this.users
        },
        error:(e)=>{
          console.log(e)
        }
      })
  }
  deleteUser() {
    console.log(`id=${this.route.snapshot.paramMap.get('id')}`)
  }
  ngOnInit(): void {
    if (!this.authservice.loggedIn()){
      this.authservice.logout
      this.router.navigate(['/login'])
    }
    this.getAll
  }

}
