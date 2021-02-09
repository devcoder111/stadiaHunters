import { Component, OnInit } from '@angular/core';
import { SeoService } from '../seo/seo.service';
import { PaginationService } from '../services/pagination/pagination.service';

@Component({
  selector: 'app-guides',
  templateUrl: './guides.component.html',
  styleUrls: []
})
export class GuidesComponent implements OnInit {

  meta_data = {
    title: 'Game Guides Highlights | Stadia Hunters',
    description: 'A list of the most recent game guides made by the community.',
    image:'https://firebasestorage.googleapis.com/v0/b/stadiaachievements-34145.appspot.com/o/Achievements%20%26%20Guides%20(7).png?alt=media&token=64343a06-8dcd-45f6-bf80-ee6b34de4ab4', 
  }

  constructor(
    public page: PaginationService, 
    private seo: SeoService,) { 

    }

  ngOnInit(): void {
    this.seo.generateTags(this.meta_data)
    this.fetchGames()
  }

  fetchGames(field:string = "created", query:string = "", reverse: boolean = true){
    this.page.init('guides', field, { limit: 30, reverse: reverse, prepend: false })
  }

  scrollHandler(e:any) {
    if (e === 'bottom') {
      this.page.more()
    }
  }

}
