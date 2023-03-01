import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { first } from 'rxjs';
import { DimPub } from 'src/app/shared/models/dim-pub';
import { Dimension } from 'src/app/shared/models/dimension';
import { Pub } from 'src/app/shared/models/pub';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DimensionService } from 'src/app/shared/services/dimension.service';
import { PubService } from 'src/app/shared/services/pub.service';
import tinymce from 'tinymce';
import 'tinymce/plugins/image';

export interface responsePub{
  sucess:boolean;
  pub:{};
  message:string;

}
@Component({
  selector: 'app-pub-creation',
  templateUrl: './pub-creation.component.html',
  styleUrls: ['./pub-creation.component.less']
})

export class PubCreationComponent implements OnInit{

  pubAddForm!: FormGroup;
  dimensions:Dimension[]=[];
  selectedDimensionId:Number;
  isAddMode:boolean;
  id:number;
  isTokenValid:boolean;
  formattedDate:string;
  lastDate:string;
  init={
    path_absolute : "/",
    //images_upload_url: 'http://localhost:8000/',
    //images_upload_url:"/",
    relative_urls: false,
    //selector:'editor#photo',
    base_url: '/tinymce',
    suffix: '.min',
    //height: 500,
    height: 200,
    menubar: 'file edit view insert format tools table tc help',
    toolbar_sticky: false,
    //image_advtab: true,
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

  /**
   *
   */
  constructor(
    private fb:FormBuilder,
    private dimensionservice:DimensionService,
    private pubservice:PubService,
    private router:Router,
    private authservice:AuthService,
    private route:ActivatedRoute
    ) {
    this.pubAddForm=this.fb.group({
      lien:['',[Validators.required]],
      photo:['',[Validators.required]],
      editeur:['',[Validators.required]],
      datefinpub:['',[Validators.required]],
      pub_dimension_id :['',[Validators.required]],
      createdBy :[],
      lastmodifiedBy :[]

    })


  }
  ngOnInit(): void {
    if (!this.authservice.loggedIn()){
      this.authservice.logout
      this.router.navigate(['/login'])
    }
    this.id = +this.route.snapshot.params['id'];
    this.isAddMode=!this.id
    this.dimensionservice.getAll().subscribe({
      next:(result)=>{
        const [sucess,dimensions]=Object.values(result)
        this.dimensions=dimensions
        return this.dimensions
      },
      error:(err)=>{
        console.log(err)
      }
    })
    if(!this.isAddMode){
      this.pubservice.show(this.id).
      pipe(first())
      .subscribe({
        next:(res:Response)=>{
          const resPub=res["Pub"] as Pub
          this.lastDate=this.formatDate(resPub.datefinpub)
          this.pubAddForm.patchValue(resPub)

        },
        error:(err)=>{console.log(err)}
      })
    }
  }
  get lien(){
    return this.pubAddForm.get('lien')
  }
  get photo(){
    return this.pubAddForm.get('photo')
  }
  get editeur(){
    return this.pubAddForm.get('editeur')
  }
  get datefinpub(){
    return this.pubAddForm.get('datefinpub')
  }
  onSubmit() {
   // console.log(this.pubAddForm.value)
   if (this.isAddMode){
    this.authservice.logeduser.subscribe({
      next:(res)=>{
        this.pubAddForm.patchValue({
          createdBy:res.fullName,
          lastmodifiedBy:res.fullName
        })
      }
     })
      this.pubservice.create(this.pubAddForm.value).subscribe({
        next:(result:responsePub)=>{

          if(result.sucess)
            this.router.navigate(['/dashboard/pub'])
          else
            this.router.navigateByUrl('/dashboard/pub/add')

        },
        error:(err)=>console.log(err)
      })
    }
    else{
      this.pubservice.update(this.id,this.pubAddForm.value).subscribe({
        next:(res)=>{
          if(res["sucess"] ) this.router.navigate(['/dashboard/pub'])
        },
        error:(err)=>{
          console.log(err)
          this.router.navigate(['/dashboard/pub/edit',this.id])
        }
      })
    }
   }

  onChange(event:Event){
    const target = event.target as HTMLButtonElement;
    this.selectedDimensionId=+target.value
  }
  private formatDate(date) {
    const d=new Date(date)
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
}
