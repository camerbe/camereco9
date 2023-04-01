import { Component, OnInit } from '@angular/core';
import { Pub } from '../../models/pub';
import { FrontEndArticleService } from '../../services/front-end-article.service';

@Component({
  selector: 'app-advert',
  templateUrl: './advert.component.html',
  styleUrls: ['./advert.component.css']
})
export class AdvertComponent implements OnInit{

  pubs:Pub[]=[]
  singlePubs:Pub[]=[]

  /**
   *
   */
  constructor(
    private frontService:FrontEndArticleService
  ) {}
  getAllAdvert(id:number){
    return this.frontService.getAdvert(id)
    .subscribe({
      next:(res)=>{
        this.pubs=res['pubs']
        this.singlePubs=this.pubs.splice(Math.floor(Math.random()*this.pubs.length),1)
        return this.singlePubs
      }

    })
  }
  ngOnInit(): void {
    //Banner 728X90
    this.getAllAdvert(5)
    console.log(`pub:${this.singlePubs}`)

  }
  extractSrc(img){
    return this.frontService.extractImage(img)
  }
}
