import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { Categorie } from 'src/app/shared/models/categorie.model';
import { Rubrique } from 'src/app/shared/models/rubrique';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CategorieService } from 'src/app/shared/services/categorie.service';
import { RubriqueService } from 'src/app/shared/services/rubrique.service';

@Component({
  selector: 'app-categorie-creation',
  templateUrl: './categorie-creation.component.html',
  styleUrls: ['./categorie-creation.component.css']
})
export class CategorieCreationComponent implements OnInit{

  categorieAddForm:FormGroup;
  rubriques:Rubrique[]=[];
  categories:Categorie[]=[];
  id:Number;
  selectedRubriqueId:Number;
  isAddMode:boolean;
  /**
   *
   */
  constructor(
    private fb:FormBuilder,
    private categorieService:CategorieService,
    private rubriqueService:RubriqueService,
    private router:Router,
    private authservice:AuthService,
    private route:ActivatedRoute
  ) {
    this.categorieAddForm=this.fb.group({
      categorie:['',[Validators.required]],
      rubrique_id:['',[Validators.required]],
      createdBy :[],
      lastmodifiedBy :[]
    })
  }
  get categorie(){
    return this.categorieAddForm.get('categorie')
  }
  getAll(){
    return this.categorieService.getAll().subscribe({
      next:(res)=>{
        this.categories=res['categories']
        return this.categories
      },
      error:(err)=>console.log(err)
    })
  }
  getRubriques(){
    return this.rubriqueService.getAll().subscribe({
      next:(res)=>this.rubriques=res["Rubriques"],
      error:(err)=>console.log(err)
    })
  }
  ngOnInit(): void {
    if (!this.authservice.loggedIn()){
      this.authservice.logout
      this.router.navigate(['/login'])
    }
    this.id = +this.route.snapshot.params['id'];
    this.isAddMode=!this.id
    this.getAll()
    this.getRubriques()
    if(!this.isAddMode){
      this.categorieService.show(this.id)
      .pipe(first())
      .subscribe({

        next:(res)=>this.categorieAddForm.patchValue(res['categorie']),
        error:(err)=>console.log(err)
      })
    }

  }
  onChange($event:Event) {
    const target = event.target as HTMLButtonElement;
    this.selectedRubriqueId=+target.value
  }
  onSubmit() {
    this.authservice.logeduser.subscribe({
      next:(res)=>{
        this.categorieAddForm.patchValue({
          createdBy:res.fullName,
          lastmodifiedBy:res.fullName
        })
      }
    })
    if(this.isAddMode){
      this.categorieService.create(this.categorieAddForm.value).subscribe({
        next:(res)=>this.router.navigate(['dashboard/categorie']),
        error:(err)=>{
          console.log(err)
          this.router.navigate(['dashboard/categorie/edit',this.id])
        }
      })
    }
    else{
      this.categorieService.update(this.id,this.categorieAddForm.value)
      .subscribe({
        next:(res)=>{
          if (res) this.router.navigate(['/dashboard/categorie'])
        },
        error:(err)=>{
          console.log(err)
          this.router.navigate(['/dashboard/categorie/edit'+this.id])
        }
      })
    }
  }

}
