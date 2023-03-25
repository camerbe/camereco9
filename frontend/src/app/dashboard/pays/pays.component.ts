import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pays } from 'src/app/shared/models/pays.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PaysService } from 'src/app/shared/services/pays.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pays',
  templateUrl: './pays.component.html',
  styleUrls: ['./pays.component.css']
})
export class PaysComponent implements OnInit{

  countries:Pays[]=[]
  /**
   *
   */

  constructor(
    private paysService:PaysService,
    private authservice:AuthService,
    private router:Router
  ) {}

  getAll(){
    return this.paysService.getAll()
        .subscribe({
          next:(res)=>{
             this.countries=res['countries']
             return this.countries
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

  deletePays(code:string) {
    // this.paysService.delete(code)
    // .subscribe()
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
        this.paysService.delete(code).subscribe({
          next:()=>{
            this.countries=this.countries.filter(d=>d.code!=code)
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
    this.router.navigate(['/dashboard/pays'])

  }
}
