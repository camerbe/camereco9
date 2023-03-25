import { Component, OnInit } from '@angular/core';
import { Article } from '../shared/models/article.model';
import { FrontEndArticleService } from '../shared/services/front-end-article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  articles:Article[]=[];
  firstArticle:Article;

  /**
   *
   */
  constructor(
    private frontEndArticleService:FrontEndArticleService
  ) {}
  getAll(){
    return this.frontEndArticleService.getAll().subscribe({
      next:(res)=>{
        this.articles=res['articles']
        this.firstArticle=this.articles[0]
        this.articles=this.articles.filter(a=>a.id!=this.firstArticle.id)
        return this.articles
      },
      error:(err)=>console.log(err)
    })
  }

  ngOnInit(): void {
    this.getAll()
  }
  extractSrc(image){
    return this.frontEndArticleService.extractImage(image)
  }
}
