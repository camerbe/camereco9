import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tag } from 'src/app/shared/models/tag.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TagService } from 'src/app/shared/services/tag.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit{
  tags:Tag[]=[];
  /**
   *
   */

  constructor(
    private tagService:TagService,
    private authService:AuthService,
    private router:Router,

  ) {}

  getAll(){
    return this.tagService.getAll()
    .subscribe({
      next:(res)=>this.tags=res['tags'],
      error:(err)=>console.log(err)
    })
  }
  ngOnInit(): void {
    if (!this.authService.loggedIn()){
      this.authService.logout
      this.router.navigate(['/login'])
    }
    this.getAll()
  }
  deleteTag(id:Number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'mr-3 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded',
        cancelButton: 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Êtes-vous sûr?',
      text: "De vouloir supprimer cet enregistrement !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler ',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.tagService.delete(id).subscribe({
          next:()=>{
            this.tags=this.tags.filter(t=>t.id!=id)
            this.getAll()

          },
          error:(err)=>console.log(err)
        })

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {

      }
    })
    this.router.navigate(['/dashboard/tag'])

  }

}
