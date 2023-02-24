import { Component, OnDestroy, OnInit, ɵclearResolutionOfComponentResourcesQueue } from '@angular/core';
import { ActivatedRoute,  Params, Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import Swal from 'sweetalert2';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {
  isTokenValid:boolean;
  users!:User[];
  id!: number;
  constructor(
    private userservice:UserService,
    private route:ActivatedRoute,
    private router:Router,
    private authservice:AuthService
    ){

  }

  getAll(){
    return this.userservice.getAll().subscribe({
      next:(usrs)=>{
        const [sucess,users]=Object.values(usrs)
        this.users=users
        return this.users
      },
      error:(e)=>{
        console.log(e)
      }
    })
  }


  // create(){
  //   this.userservice.create().subscribe()
  // }
  ngOnInit(): void {

    if (!this.authservice.loggedIn()){
      this.authservice.logout
      this.router.navigate(['/login'])
    }
    this.getAll()
    this.route.params.subscribe({
      next:(params)=>{
        this.id=+params['id']
        console.log(`Oninit id=${this.id}`)
      }
    })

  }
  deleteUser(id:bigint) {
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
        this.userservice.delete(id).subscribe({
          next:()=>{
            this.users=this.users.filter(u=>u.id!=id)
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
    this.router.navigateByUrl('/dashboard/user')
  }
}
