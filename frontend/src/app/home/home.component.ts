import { Component, OnInit } from '@angular/core';
import { Article } from '../shared/models/article.model';
import { FrontEndArticleService } from '../shared/services/front-end-article.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  articles:Article[]=[];
  firstArticle:Article;
  metas:Article[]=[];
  page:number;

  /**
   *
   */
  constructor(
    private frontEndArticleService:FrontEndArticleService,
    private route:ActivatedRoute
  ) {}
  getAll(){
    return this.frontEndArticleService.getAll().subscribe({
      next:(res)=>{
        this.articles=res['articles']['data']
        this.firstArticle=this.articles[0]
        //this.articles=this.articles.filter(a=>a.id!=this.firstArticle.id)
        console.log(`articles ${this.articles}`)
        return this.articles
      },
      error:(err)=>console.log(err)
    })
  }
  getMeta(){
      return this.frontEndArticleService.getAll().subscribe({
      next:(res)=>{
        this.metas=res['articles']['meta']
        console.log(`meta ${this.metas['current_page']}`)
        return this.metas
      },
      error:(err)=>console.log(err)
    })
  }
  getCombine(){

    return combineLatest([
      this.route.queryParamMap
    ]).pipe(switchMap(params=>{
      let param=+params[0].get('page')
      console.log(`page ${param}`)
      return this.frontEndArticleService.getAllAndPaginate(param)
    }))
  }
  getArticles(){
    return this.getCombine().subscribe({
      next:res=>{
        this.articles=res['articles']['data']
        console.log(`this.articles ${this.articles}`)
        return this.articles
      }
    })
  }
  getArticleMetas(){
    return this.getCombine().subscribe({
      next:res=>this.metas=res['articles']['meta']
    })
  }


  getCombineMeta(){
    return combineLatest([
      this.route.queryParamMap
    ]).pipe(switchMap(param=>{
      let params =+param[0].get('page')|1
      return this.frontEndArticleService.getAllAndPaginate(params)
    })).subscribe(res=>this.articles=res['articles']['meta'])

  }
  getCombineAll(){
    let art
    return combineLatest([
      this.route.queryParamMap
    ]).pipe(switchMap(parammap=>{
      let param=+parammap[0].get('page')|1
      return this.frontEndArticleService.getAllAndPaginate(param)
    })).pipe(switchMap(arts=>{
      let art=arguments
      this.articles=arts['articles']['data']
      return this.articles
    })).pipe(switchMap(meta=>{
      this.metas=art['articles']['meta']
      return this.metas
    }))
  }
  ngOnInit(): void {

    // this.getAll()
    // this.getMeta()
    //this.getCombine();
    //this.getCombineMeta();
    //this.getCombineAll()
    this.getArticles()
    this.getArticleMetas()

  }
  extractSrc(image){
    return this.frontEndArticleService.extractImage(image)
  }
}
