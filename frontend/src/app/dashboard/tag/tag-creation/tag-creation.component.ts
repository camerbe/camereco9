import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { Tag } from 'src/app/shared/models/tag.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TagService } from 'src/app/shared/services/tag.service';

@Component({
  selector: 'app-tag-creation',
  templateUrl: './tag-creation.component.html',
  styleUrls: ['./tag-creation.component.css']
})
export class TagCreationComponent implements OnInit{
isAddMode: boolean;
tagAddForm: FormGroup;
id:Number;

/**
 *
 */
  constructor(
    private authservice:AuthService,
    private router:Router,
    private route:ActivatedRoute,
    private tagService:TagService,
    private fb:FormBuilder
  ) {
      this.tagAddForm=this.fb.group({
        tag:['',Validators.required],
        lastmodifiedBy:[''],
        createdBy:[''],
      })
  }
  get tag(){
    return this.tagAddForm.get('tag')
  }
  ngOnInit(): void {
      if (!this.authservice.loggedIn()){
        this.authservice.logout
        this.router.navigate(['/login'])
      }
      this.id=+this.route.snapshot.params['id'];
      this.isAddMode=!this.id
      if(!this.isAddMode){
        this.tagService.show(this.id)
        .pipe(first())
        .subscribe({
          next:(res)=>this.tagAddForm.patchValue(res['tag']),
          error:(err)=>console.log(err)
        })

      }
  }
  onSubmit() {
    this.authservice.logeduser.subscribe({
      next:(res)=>{
        this.tagAddForm.patchValue({
          createdBy:res.fullName,
          lastmodifiedBy:res.fullName
        })
      }
    })
    if(this.isAddMode){
      this.tagService.create(this.tagAddForm.value)
      .subscribe({
        next:(res)=>{
          if (res['sucess']) this.router.navigate(['dashboard/tag'])
          else {
            console.log(res['message'])
            this.router.navigate(['dashboard/tag/edit',this.id])
          }
        },
        error:(err)=>{
          console.log(err)
          this.router.navigate(['dashboard/tag/edit',this.id])
        }
      })
    }
    else{
      this.tagService.update(this.id,this.tagAddForm.value)
      .subscribe({
        next:(res)=>{
          if(res['sucess']) this.router.navigate(['dashboard/tag'])
          else{
            console.log(res['message'])
            this.router.navigate(['dashboard/tag/edit',this.id])
          }
        },
        error:(err)=>{
          console.log(err)
            this.router.navigate(['dashboard/tag/edit',this.id])
        }
      })
    }
  }


}
