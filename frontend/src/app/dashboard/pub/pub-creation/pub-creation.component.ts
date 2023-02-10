import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import tinymce from 'tinymce';
import 'tinymce/plugins/image';

@Component({
  selector: 'app-pub-creation',
  templateUrl: './pub-creation.component.html',
  styleUrls: ['./pub-creation.component.less']
})
export class PubCreationComponent implements OnInit{
  pubAddForm!: FormGroup;
  init={
    path_absolute : "/",
    // images_upload_url: 'http://localhost:8000/laravel-filemanager',
    images_upload_url:"/",
    selector:'editor#photo',
    base_url: '/tinymce',
    suffix: '.min',
    height: 500,
    menubar: 'file edit view insert format tools table tc help',
    toolbar_sticky: false,
    image_advtab: true,
    file_picker_callback : function(callback, value, meta) {
      var x = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
      var y = window.innerHeight|| document.documentElement.clientHeight|| document.getElementsByTagName('body')[0].clientHeight;

      var cmsURL = 'http://localhost:8000/api/laravel-filemanager?editor=' + meta.fieldname;

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
  constructor(private fb:FormBuilder) {
    this.pubAddForm=this.fb.group({
      lien:['',[Validators.required]],
      photo:['',[Validators.required]],
      editeur:['',[Validators.required]],
      datefinpub:['',[Validators.required]]

    })


  }
  ngOnInit(): void {
    // let node = document.createElement('script');
    // node.src="https://cdnjs.cloudflare.com/ajax/libs/tinymce/5.6.2/tinymce.min.js"
    // node.type='text/javascript'
    // node.async=true
    // document.getElementsByTagName('head')[0].appendChild(node)
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
    console.log(this.pubAddForm.value)
  }

}
