import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.less']
})
export class UserCreationComponent implements OnInit{

  userAddForm!: FormGroup;

  constructor(private fb:FormBuilder,
    private userservice:UserService,
    private router:Router) {
      this.userAddForm=this.fb.group({
        nom:['',[Validators.required]],
        prenom:['',[Validators.required]],
        email:['',[Validators.required,Validators.email]],
        password:[[Validators.required,Validators.minLength(6)]],
        role:[[Validators.required]],

      })

  }
  ngOnInit(): void {
    this.router.navigate([this.router.url])
  }
  onSubmit() {
    this.userservice.create(this.userAddForm.value)
    .subscribe(result=>{
      if(result){
        this.router.navigateByUrl('/dashboard')
      }
    })

  }
  getAllUsers() {
    this.router.navigate(['/dashboard/user'])
  }
}
