import { Component, OnInit } from '@angular/core';
function hamburger(){
  const btn=document.querySelector('#menu-btn');
  const menu=document.querySelector('#menu');

  btn.addEventListener('click',()=>{
    btn.classList.toggle('open');
    menu.classList.toggle('flex');
    menu.classList.toggle('hidden');
  });
}
@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css']
})
export class SiteHeaderComponent implements OnInit {
  ngOnInit(): void {
    hamburger()
  }

}
