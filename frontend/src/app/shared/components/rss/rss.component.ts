import { Component, OnInit } from '@angular/core';
import { RSS } from '../../models/rss.model';
import { FrontEndArticleService } from '../../services/front-end-article.service';

@Component({
  selector: 'app-rss',
  templateUrl: './rss.component.html',
  styleUrls: ['./rss.component.css']
})
export class RssComponent implements OnInit{
  rssList:RSS[]=[];

  /**
   *
   */
  constructor(
    private frontEndService:FrontEndArticleService
  ) {}

  getRss(){
    return this.frontEndService.getRss()
      .subscribe(res=>this.rssList=res['rss'])
  }
  ngOnInit(): void {
    this.getRss()
  }

}
