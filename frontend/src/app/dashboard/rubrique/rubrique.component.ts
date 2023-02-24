import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Rubrique } from 'src/app/shared/models/rubrique';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RubriqueService } from 'src/app/shared/services/rubrique.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rubrique',
  templateUrl: './rubrique.component.html',
  styleUrls: ['./rubrique.component.css']
})
export class RubriqueComponent implements OnInit{

  rubriques: Rubrique[] = [];
  /**
   *
   */
  constructor(
    private rubriqueService:RubriqueService,
    private authService:AuthService,
    private route:ActivatedRoute,
    private router:Router
  ) { }
  getAll(){
    return this.rubriqueService.getAll().subscribe({
      next:(res)=>{
        this.rubriques=res["Rubriques"]
        return this.rubriques
      }
    })
  }
  ngOnInit(): void {
    if (!this.authService.loggedIn()){
      this.authService.logout
      this.router.navigate(['/login'])
    }
    this.getAll()
  }
  deleteRubrique(id:bigint) {
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
        this.rubriqueService.delete(id).subscribe({
          next:()=>{
            this.rubriques=this.rubriques.filter(r=>r.id!=id)
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
    this.router.navigate(['/dashboard/rubrique'])
  }
}
