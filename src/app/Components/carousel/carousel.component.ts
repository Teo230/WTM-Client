import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Swiper } from "swiper";

// install Swiper modules
SwiperCore.use([Navigation]);

const swiper = new Swiper('.swiper',{
  slidesPerView: 5,
  spaceBetween: 20,
  loop: true,
  // loopedSlides: 1,
  navigation: false,
  // pagination: {
  //   dynamicBullets: true
  // },
  // zoom: true,
  observer: true,
  observeParents: true,
  observeSlideChildren: true,
  // resizeObserver: true,
  // height: 100
});

@Component({
  selector: 'app-carousel',
  // template: `<swiper
  //   [slidesPerView]="1"
  //   [spaceBetween]="30"
  //   [loop]="true"
  //   [pagination]="{
  //     clickable: true
  //   }"
  //   [navigation]="true"
  //   [observer]="true"
  //   class="mySwiper"
  //   >
  //     <ng-template swiperSlide *ngFor="let src of sourceList">
  //       <img src="{{src}}"/>
  //     </ng-template>
  //   </swiper>`,
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CarouselComponent implements OnInit {

  @Input("sourceList") sourceList: any[] = [];

  constructor() { }

  ngOnInit(): void {
    setTimeout(()=>{
      swiper.init();

      //swiper.update();
    },500);
  }

}
