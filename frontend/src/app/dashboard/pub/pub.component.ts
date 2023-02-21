import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { SweetAlertComponent } from 'src/app/shared/components/sweet-alert/sweet-alert.component';
import { Pub } from 'src/app/shared/models/pub';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PubService } from 'src/app/shared/services/pub.service';
import Swal from 'sweetalert2';
export interface responsePub{
  current_page:number;
  data:{};
  first_page_url:string;
  from:number;
  last_page:number;

}
@Component({
  selector: 'app-pub',
  templateUrl: './pub.component.html',
  styleUrls: ['./pub.component.less']
})
export class PubComponent implements OnInit{
  pubs!:Pub[]
  isTokenValid:boolean;
  /**
   *
   */
  constructor(
      private pubservice:PubService,
      private router:Router,
      private route:ActivatedRoute,
      private authservice:AuthService
      ) {


  }
  getAll(){
    return this.pubservice.getAll().subscribe({
      next:(result)=>{
        this.pubs= result["Publicités"]["data"]
        return this.pubs
      }
    })
  }
  ngOnInit() {
    if (!this.authservice.loggedIn()){
      this.authservice.logout
      this.router.navigate(['/login'])
    }
    this.getAll()
  }
  deletePub(id: BigInt) {

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
        this.pubservice.delete(id).subscribe({
          next:(res:Response)=>{
            if (res.ok){
              this.getAll()
              location.reload()

            }
          },
          error:(err)=>console.log(err)
        })

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {

      }
    })
    this.router.navigate(['/dashboard/pub'])


  }
}
