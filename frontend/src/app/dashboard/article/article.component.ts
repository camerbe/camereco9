import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/shared/models/article.model';
import { ArticleService } from 'src/app/shared/services/article.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit{


  articles:Article[]=[];
  pages:number[]=[];
  lastPage:number;
  totalPage:number;
  fromPage:number;
  toPage:number;
  currentPage:number;
  id:number;


  /**
   *
   */
  constructor(
    private articleService:ArticleService,
    private authservice:AuthService,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  getArticleByUserId(id:number){
     return this.articleService.findArticleById(id).subscribe({
      next:(res)=>{
        console.log(res['articles']['meta'])
        const meta=res['articles']['meta'];
        this.lastPage=meta.last_page
        for(let i=1;i<this.lastPage+1;i++){
          this.pages.push(i)
        }
        this.totalPage=meta.total
        this.fromPage=meta.from
        this.toPage=meta.to
        this.currentPage=meta.current_page

        // console.log(`meta ${meta.last_page} ${res['articles']['meta']}`)
        this.articles=res['articles']['data']
        return this.articles

      },
      error:(err)=>console.log(err)
     })
  }
  ngOnInit(): void {

    if (!this.authservice.loggedIn()){
      this.authservice.logout
      this.router.navigate(['/login'])
    }
    this.id=this.route.snapshot.params['id']
    this.getArticleByUserId(this.id)

  }
  deleteArticle(id: Number) {
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
        this.articleService.delete(id).subscribe({
          next:()=>{
            this.articles=this.articles.filter(a=>a.id!=id)
            this.getArticleByUserId(this.id)
          },
          error:(err)=>console.log(err)
        })

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {

      }
    })
    this.router.navigate(['/dashboard/article/user',this.id])
  }

}
