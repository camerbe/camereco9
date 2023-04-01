import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/article.model';
import { FrontEndArticleService } from '../../services/front-end-article.service';

@Component({
  selector: 'app-plus-lu',
  templateUrl: './plus-lu.component.html',
  styleUrls: ['./plus-lu.component.css']
})
export class PlusLuComponent implements OnInit{

mostreadeds:Article[]=[]
constructor(
  private frontService:FrontEndArticleService
) {}

  ngOnInit(): void {
    this.getMostReaded()
  }

  getMostReaded(){
    return this.frontService.getMostReaded()
    .subscribe(res=>this.mostreadeds=res['articles'])
  }
  extractSrc(img){
    return this.frontService.extractImage(img)
  }
}
