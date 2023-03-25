import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../shared/models/article.model';
import { FrontEndArticleService } from '../shared/services/front-end-article.service';


@Component({
  selector: 'app-front-end-article',
  templateUrl: './front-end-article.component.html',
  styleUrls: ['./front-end-article.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class FrontEndArticleComponent implements OnInit {

  slug:string;
  articles:Article[]=[];
  /**
   *
   */
  constructor(
    private frontEndService:FrontEndArticleService,
    private route:ActivatedRoute,
    private metaService:Meta,
    private titleService:Title
  ) {

  }
  getArticle(slug:string){
    return this.frontEndService.getArticleBySlug(slug)
      .subscribe({
        next:(res)=>{
          this.articles= res['article']
          this.titleService.setTitle(this.articles[0].pays+' :: '+this.articles[0].titre)
          this.metaService.addTags([
            { name: 'description', content: this.articles[0].chapeau},
            { name: 'author', content: this.articles[0].auteur},
            { name: 'keywords', content: this.articles[0].keyword},
            { name: 'twitter:card', content: 'summary_large_image'},
            { name: 'twitter:site', content: '@camer.be'},
            { name: 'twitter:creator', content: '@camer.be'},
            { name: 'twitter:description', content: this.articles[0].chapeau},
            { property: 'og:locale', content: 'fr_FR'},
            { property: 'og:locale:alternate', content: 'en-us'},
            { property: 'og:title', content: this.titleService.getTitle().substring(0,70)},
            { property: 'og:type', content: 'article'},
            { property: 'og:site_name', content: 'camerEco'},
            { property: 'article:published_time', content: this.articles[0].dateparution.toString()},
            { property: 'article:modified_time', content: this.articles[0].updated_at.toString()},
            { property: 'article:author', content:  this.articles[0].auteur},
            { property: 'article:section', content:  this.articles[0].categorie},

          ],true)
        }

      })
  }
  ngOnInit(): void {
    this.slug=this.route.snapshot.params['slug'];
    //console.log(`slug ${this.slug}`)
    this.getArticle(this.slug)
    //if (this.article)
     // console.log(`article ${this.article.auteur}`)
  }
  extractSrc(img){
    return this.frontEndService.extractImage(img)
  }
  makeTitle(pays,titre,country):string{
    const bled=pays.tolowercase()
    const co=country.tolowercase()
    let title=titre
    title=title.search(bled)>0? pays+' :: '+title:title
    title=title.search(co)>0? title+ ' :: '+co : title
    return title
  }

}
