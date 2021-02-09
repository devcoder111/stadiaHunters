import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.sass', '../../game-details/game-details.component.sass']
})
export class BannerComponent implements OnInit {

  banner:string = ""
  banners = [
    "https://storage.googleapis.com/stadiaachievements-34145.appspot.com/test/baldurs-gate-3.jpg",
    "https://storage.googleapis.com/stadiaachievements-34145.appspot.com/test/crayta.jpg",
    "https://storage.googleapis.com/stadiaachievements-34145.appspot.com/banners/gylt.jpg",
    "https://storage.googleapis.com/stadiaachievements-34145.appspot.com/banners/outcasters.jpg",
    "https://storage.googleapis.com/stadiaachievements-34145.appspot.com/banners/rock-of-ages-3.jpg",
    "https://storage.googleapis.com/stadiaachievements-34145.appspot.com/test/super-bomberman-r-online.jpg"]

  constructor() { }

  ngOnInit(): void {
    this.carousel()
  }

  carousel() {
  
    let index = this.getRandomInt(this.banners.length)
    this.banner = this.banners[index]
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

}
