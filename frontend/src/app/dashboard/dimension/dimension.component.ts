import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dimension } from 'src/app/shared/models/dimension';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DimensionService } from 'src/app/shared/services/dimension.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dimension',
  templateUrl: './dimension.component.html',
  styleUrls: ['./dimension.component.less']
})
export class DimensionComponent implements OnInit {
  isTokenValid:boolean;
  dimensions: Dimension[] = [];
  /**
   *
   */
  constructor(
    private dimensionservice:DimensionService,
    private authservice:AuthService,
    private router:Router
    ) {


  }

  deleteDimension(id:bigint) {
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
        this.dimensionservice.delete(id).subscribe({
          next:()=>{
            this.dimensions=this.dimensions.filter(d=>d.id!=id)
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
    this.router.navigate(['/dashboard/dimension'])



    }
  getAll(){
    return this.dimensionservice.getAll()
      .subscribe({
        next:(res)=>{
          this.dimensions=res["dimensions"]
          return this.dimensions
        },
        error:(e)=>{
          console.log(e)
        }
      })
  }

  ngOnInit(): void {
    if (!this.authservice.loggedIn()){
      this.authservice.logout
      this.router.navigate(['/login'])
    }
   this.getAll()
  }

}
