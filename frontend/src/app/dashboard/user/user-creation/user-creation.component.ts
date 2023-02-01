import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.less']
})
export class UserCreationComponent {
  userAddForm!: FormGroup;

  constructor(private fb:FormBuilder,
    private userservice:UserService,
    private router:Router) {
      this.userAddForm=this.fb.group({
        nom:[],
        prenom:[],
        email:[],
        password:[],
        role:[],

      })

  }
  onSubmit() {
    this.userservice.create(this.userAddForm.value)
    .subscribe(result=>{
      if(result){
        this.router.navigateByUrl('/dashboard')
      }
    })

  }
}
