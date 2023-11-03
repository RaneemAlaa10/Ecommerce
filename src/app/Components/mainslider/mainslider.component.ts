import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-mainslider',
  templateUrl: './mainslider.component.html',
  styleUrls: ['./mainslider.component.css']
})
export class MainsliderComponent {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    autoplay:true,
    autoplaySpeed:300,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }
}
