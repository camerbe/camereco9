import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FrontEndDataService } from './front-end-data.service';

@Injectable({
  providedIn: 'root'
})
export class FrontEndArticleService extends FrontEndDataService{

  constructor(private httpclient:HttpClient) {
    super("http://127.0.0.1:8000/api/front",httpclient);
  }
  extractImage(image){
    const img=image
    let strimg=img.toString()
    const strreplace=strimg.replace(/<p>/i,"")
    const strreplace2=strreplace.replace(/<\/p>/i,"")

    if(strreplace2.startsWith('http') || strreplace2.startsWith('https')){
      //console.log(image)
      return image
    }
    else{
      // const re = /<img [^>]*src="[^"]*"[^>]*>/g
      // if(re.exec(strreplace2)===null) return image
      // console.log(`${strreplace2.match(/<img [^>]*src="[^"]*"[^>]*>/gm)
      // .map(x => x.replace(/.*src="([^"]*)".*/, '$1'))}`)
      return strreplace2.match(/<img [^>]*src="[^"]*"[^>]*>/gm).map(x => x.replace(/.*src="([^"]*)".*/, '$1'))

    }


  }
}
