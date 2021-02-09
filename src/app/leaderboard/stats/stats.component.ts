import { Component, OnInit } from '@angular/core';
import { SeoService } from "../../seo/seo.service";
import { Router, ActivatedRoute} from '@angular/router';
import { PaginationService } from "../../services/pagination/pagination.service";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['../../../assets/styles/leaderboard.sass']
})
export class StatsComponent implements OnInit {

  filter = 'month'

  constructor(
    private seo: SeoService,
    private route: ActivatedRoute,
    private router: Router,
    public page: PaginationService
  ) { }

  ngOnInit(): void {
    const filter = this.route.snapshot.paramMap.get('filter');
    console.log(filter)
    if(filter !== null){
      this.filter = filter
    }
    switch(filter) { 
      case 'played': { 
        var sort = 'time_played'
        break; 
      } 
      case 'owned': { 
        var sort = 'owned'
         break; 
      }
      case 'month': { 
        var sort = 'month_time_played'
        break; 
      } 
      default: { 
        var sort = 'completed'
        break; 
      } 
   }
    this.metaTags()
    this.page.init('games', sort, { limit: 25, reverse: true, prepend: false })
  }

  metaTags(){
    switch(this.filter) { 
      case 'time_played': { 
        var filter = 'time_played'
        break; 
      } 
      case 'owned': { 
        var filter = 'most owned (also counts free weekends)'
         break; 
      }
      case 'completed': { 
        var filter = 'most completed'
        break; 
      } 
      default: { 
        var filter = 'most played this month'
        break; 
      } 
   }
    let meta_data = {
      title: `Stadia Stats - StadiaHunters.com`,
      description: `Worldwide Stadia Stats on the game ${filter}`,
      image:'https://firebasestorage.googleapis.com/v0/b/stadiaachievements-34145.appspot.com/o/Achievements%20%26%20Guides%20(7).png?alt=media&token=64343a06-8dcd-45f6-bf80-ee6b34de4ab4', 
    }

    this.seo.generateTags(meta_data)
  }

  scrollHandler(e:any) {
    if (e === 'bottom') {
      this.page.more()
    }
  }

  redirect(data:any){
    console.log(data)
    this.router.navigate([`/game/${data.tag}`]);
  }

}
