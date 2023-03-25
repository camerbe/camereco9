import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { first } from 'rxjs';
import { Article } from 'src/app/shared/models/article.model';
import { Categorie } from 'src/app/shared/models/categorie.model';
import { Pays } from 'src/app/shared/models/pays.model';
import { Tag } from 'src/app/shared/models/tag.model';
import { ArticleService } from 'src/app/shared/services/article.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CategorieService } from 'src/app/shared/services/categorie.service';
import { PaysService } from 'src/app/shared/services/pays.service';
import { TagService } from 'src/app/shared/services/tag.service';
import tinymce from 'tinymce';

export interface responseArticle{
  sucess:boolean;
  article:{};
  message:string;

}
@Component({
  selector: 'app-article-creation',
  templateUrl: './article-creation.component.html',
  styleUrls: ['./article-creation.component.css']
})
export class ArticleCreationComponent implements OnInit{
  selectedTagId:Number;
  selectedCategorieId:Number;
  selectedPaysCode:string;
  articleAddForm: FormGroup;
  isAddMode: boolean;
  categories:Categorie[]=[];
  countries:Pays[]=[];
  tags:Tag[]=[];
  id:number;
  art: Article;
  init={
    path_absolute : "/",
    relative_urls: false,
    base_url: '/tinymce',
    suffix: '.min',
    height: 500,
    menubar: 'file edit view insert format tools table tc help',
    toolbar_sticky: false,
    file_picker_callback : function(callback, value, meta) {
      var x = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
      var y = window.innerHeight|| document.documentElement.clientHeight|| document.getElementsByTagName('body')[0].clientHeight;

      var cmsURL = 'http://localhost:8000/laravel-filemanager?editor=' + meta.fieldname;

      if (meta.filetype == 'image') {
        cmsURL = cmsURL + "&type=Images";
      } else {
        cmsURL = cmsURL + "&type=Files";
      }

      tinymce.activeEditor.windowManager.openUrl({
        url : cmsURL,
        title : 'Filemanager',
        width : x * 0.8,
        height : y * 0.8,
        //resizable : 'yes',
        //close_previous : 'no',

        onMessage: (api, message) => {
          console.log(`message ${message['content']}`);
          callback(message['content'],'*');

        }

      });
    },
    plugins: [
      'image', 'media', 'tools', 'link', 'advlist',
      'autolink', 'lists', 'table', 'wordcount','code'
    ],

    toolbar:'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media table mergetags  blockquote'

  }
  init_image={
    path_absolute : "/",
    relative_urls: false,
    base_url: '/tinymce',
    suffix: '.min',
    height: 200,
    menubar: 'file edit view insert format tools table tc help',
    toolbar_sticky: false,
    file_picker_callback : function(callback, value, meta) {
      var x = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
      var y = window.innerHeight|| document.documentElement.clientHeight|| document.getElementsByTagName('body')[0].clientHeight;

      var cmsURL = 'http://localhost:8000/laravel-filemanager?editor=' + meta.fieldname;

      (meta.filetype == 'image')? cmsURL=cmsURL + "&type=Images":cmsURL = cmsURL + "&type=Files";
      tinymce.activeEditor.windowManager.openUrl({
        url : cmsURL,
        title : 'Filemanager',
        width : x * 0.8,
        height : y * 0.8,

      })
      // tinymce.activeEditor.windowManager.openUrl({
      //   url : cmsURL,
      //   title : 'Filemanager',
      //   width : x * 0.8,
      //   height : y * 0.8,
      //   //resizable : 'yes',
      //   //close_previous : 'no',

      //   onMessage: (api, message) => {
      //     //console.log(`message ${message['content']}`);
      //     callback({
      //       message : "Hi there",
      //       command :"hi-there-command",
      //       data : "Some Data"
      //     },'*');

      //   }


      // });
    },
    plugins: [
      'image', 'media', 'tools', 'link'

    ],

    toolbar:'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media table mergetags  blockquote'

  }


  /**
   *
   */
  constructor(
    private fb:FormBuilder,
    private categorieService:CategorieService,
    private paysService:PaysService,
    private authservice:AuthService,
    private router:Router,
    private route:ActivatedRoute,
    private articleService:ArticleService,
    private tagService:TagService,

  )
  {
      this.articleAddForm=this.fb.group({
      auteur:['',Validators.required],
      source:['',Validators.required],
      titre:['',[Validators.required,Validators.maxLength(100)]],
      dateparution:[new Date().toISOString().slice(0,-1),[Validators.required]],
      categorie_id :['',[Validators.required]],
      pays_code :['',[Validators.required]],
      article :['',[Validators.required]],
      photo :['',[Validators.required]],
      motclefOne :['',[Validators.required,Validators.minLength(3)]],
      motclefTwo :['',[Validators.required,Validators.minLength(3)]],
      motclefThree :['',[Validators.required,Validators.minLength(3)]],
      createdBy :[],
      lastmodifiedBy :[],
      keyword :[],
      user_id :[],
    })
  }

  get createdBy(){
    return this.articleAddForm.get('createdBy');
  }
  get lastmodifiedBy(){
    return this.articleAddForm.get('lastmodifiedBy');
  }
  get categorie_id(){
    return this.articleAddForm.get('categorie_id');
  }
  get pays_code(){
    return this.articleAddForm.get('pays_code');
  }
  get auteur(){
    return this.articleAddForm.get('auteur');
  }
  get titre(){
    return this.articleAddForm.get('titre');
  }
  get source(){
    return this.articleAddForm.get('source');
  }
  get dateparution(){
    return this.articleAddForm.get('dateparution');
  }
  get article(){
    return this.articleAddForm.get('article');
  }
  get photo(){
    return this.articleAddForm.get('photo');
  }
  get motclefOne(){
    return this.articleAddForm.get('motclefOne');
  }
  get motclefTwo(){
    return this.articleAddForm.get('motclefTwo');
  }
  get motclefThree(){
    return this.articleAddForm.get('motclefThree');
  }
  get keyword(){
    return this.articleAddForm.get('keyword');
  }
  get user_id(){
    return this.articleAddForm.get('user_id');
  }

  onChange($event: Event) {
    const target = event.target as HTMLButtonElement;
    this.selectedCategorieId=+target.value
  }
  onChangeCountry($event: Event) {
    const target = event.target as HTMLButtonElement;
    this.selectedPaysCode=target.value
  }
  onChangeTag($event:Event) {
    const target = event.target as HTMLButtonElement;
    this.selectedTagId=+target.value
  }
  getAllPays(){
    return this.paysService.getAll()
    .subscribe({
      next:(res)=>this.countries=res['countries'],
      error:(err)=>console.log(err)
    })
  }
  getAllCategories(){
    return this.categorieService.getAll()
    .subscribe({
      next:(res)=>this.categories=res['categories'],
      error:(err)=>console.log(err)
    })
  }
  getAllTags(){
    return this.tagService.getAll()
    .subscribe({
      next:(res)=>this.tags=res['tags'],
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
    this.getAllCategories();
    this.getAllPays();
    this.getAllTags();

    if(!this.isAddMode){

      this.articleService.show(this.id)
      .pipe(first())
      .subscribe({
        next:(res:responseArticle)=>{
          const art=res['article'] as Article
          const keywords=art.keyword.split(',')
          this.articleAddForm.patchValue(art)
          this.articleAddForm.patchValue({
            article:art.article,
            motclefOne:keywords[0],
            motclefTwo:keywords[1],
            motclefThree:keywords[2],
            //dateparution:art.dateparution.toLocaleString()
          })

        },
        error:(err)=>console.log(err)
      })
    }
  }

  onSubmit() {
    this.authservice.logeduser.subscribe({
      next:(res)=>{
        this.articleAddForm.patchValue({
          createdBy:res.fullName,
          lastmodifiedBy:res.fullName,
          user_id:res.id,
          keyword:this.articleAddForm.get('motclefOne').value+','
          +this.articleAddForm.get('motclefTwo').value+','
          +this.articleAddForm.get('motclefThree').value
        })
      }
    })
    if(this.isAddMode){

      this.articleService.create(this.articleAddForm.value).subscribe({
        next:(res)=>{
          if(res['sucess']) this.router.navigate(['dashboard/article/user',+this.user_id.value])
          else{
            this.router.navigate(['dashboard/article/add'])
          }
        },
        error:(err)=>{
          console.log(err)
          this.router.navigate(['dashboard/article/add'])
        }
      })
    }
    else{
        this.articleService.update(this.id,this.articleAddForm.value).subscribe({
          next:(res)=>{
            if(res['sucess']) this.router.navigate(['dashboard/article/user',this.user_id.value])
            else{
              console.log(res['message'])
              this.router.navigate(['dashboard/article/add'])
            }
          },
          error:(err)=>{
            console.log(err)
            this.router.navigate(['dashboard/article/add'])
          }
        })

    }


  }


}
