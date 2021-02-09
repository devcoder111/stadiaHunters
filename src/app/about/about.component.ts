import { Component, OnInit } from '@angular/core';
import { SeoService } from "../seo/seo.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass']
})
export class AboutComponent implements OnInit {

  data = {
    title: 'About | Stadia Hunters',
    description: 'Stadia Hunters is the community of Stadia achievement hunters and available on Web and Android. Find all the secret achievements with guides, reporting bugged , seperationg by dlc requirements and more. Join the community of achievement hunters on Stadia',
    image:'https://firebasestorage.googleapis.com/v0/b/stadiaachievements-34145.appspot.com/o/Achievements%20%26%20Guides%20(7).png?alt=media&token=64343a06-8dcd-45f6-bf80-ee6b34de4ab4', 
  }

  constructor(private seo:SeoService,) { }

  ngOnInit(): void {

    this.seo.generateTags(this.data)
  }

}
