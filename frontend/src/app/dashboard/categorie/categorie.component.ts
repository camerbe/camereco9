import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/shared/models/categorie.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CategorieService } from 'src/app/shared/services/categorie.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit{

  categories:Categorie[]=[];
  /**
   *
   */
  constructor(
    private categorieService:CategorieService,
    private authservice:AuthService,
    private router:Router
  ) {}

  getAll(){
    return this.categorieService.getAll().subscribe({
      next:(res)=>{
        console.log(res)
        this.categories=res['categories']
        return this.categories
      },
      error:(err)=>console.log(err)
    })
  }
  ngOnInit(): void {
    if (!this.authservice.loggedIn()){
      this.authservice.logout
      this.router.navigate(['/login'])
    }
    this.getAll()
  }
  deleteCategorie(id: number) {
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
        this.categorieService.delete(id).subscribe({
          next:()=>{
            this.categories=this.categories.filter(d=>d.id!=id)
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
    this.router.navigate(['/dashboard/categorie'])
  }
}
