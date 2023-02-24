import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/shared/models/role.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RoleService } from 'src/app/shared/services/role.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

roles:Role[]=[];

constructor(
  private roleService:RoleService,
  private authService:AuthService,
  private route:ActivatedRoute,
  private router:Router
) {}

  getAll(){
    return this.roleService.getAll().subscribe({
      next:(res)=>{
        this.roles=res["Roles"]
        return this.roles
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
  deleteRole(id: number) {
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
        this.roleService.delete(id).subscribe({
          next:()=>{
            this.roles=this.roles.filter(r=>r.id!=id)
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
    this.router.navigate(['/dashboard/role'])

  }
}
