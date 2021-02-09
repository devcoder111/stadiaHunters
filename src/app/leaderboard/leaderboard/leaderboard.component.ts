import { Component, OnInit } from '@angular/core';
import { SeoService } from "../../seo/seo.service";
import { ActivatedRoute} from '@angular/router';
import { PaginationService } from "../../services/pagination/pagination.service";
import { LeaderboardService } from 'src/app/services/leaderboard/leaderboard.service';
import { AuthService } from 'src/app/providers/auth.service.ts.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['../../../assets/styles/leaderboard.sass']
})
export class LeaderboardComponent implements OnInit {

  filter: string = 'overall'
  user: any

  constructor(
    private seo: SeoService,
    private route: ActivatedRoute,
    private auth: AuthService,
    public page: PaginationService,
    private leaderboardService: LeaderboardService
  ) { }

  ngOnInit(): void {
    let param = this.route.snapshot.paramMap.get('filter')
    this.filter = param ? param : 'overall';
    console.log(this.filter)

    let sort = 'score'
    if(this.filter == 'month'){
      sort = 'month_score'
    } else if(this.filter == 'year'){
      sort = 'year_score'
    }
    this.metaTags()
    this.page.init('profiles', sort, { limit: 25, reverse: true, prepend: false })
    this.auth.loggedUser.subscribe(user => {
      this.user = user
    })
  }

  metaTags(){
    let monthly : string = ""
    if(this.filter == 'month'){
      monthly = this.leaderboardService.getMonth()
    } else if(this.filter == 'year'){
      monthly = this.leaderboardService.getYear()
    }
    let meta_data = {
      title: `Stadia ${monthly} Achievement Leaderboards - StadiaHunters.com`,
      description: `Worldwide ${monthly} Leaderboard rankings for Stadia`,
      image:'https://firebasestorage.googleapis.com/v0/b/stadiaachievements-34145.appspot.com/o/Achievements%20%26%20Guides%20(7).png?alt=media&token=64343a06-8dcd-45f6-bf80-ee6b34de4ab4', 
    }

    this.seo.generateTags(meta_data)
  }

  getLeaderboard(): String{
    return this.leaderboardService.buildLeaderboard(this.filter)
  }

  scrollHandler(e:any) {
    if (e === 'bottom') {
      this.page.more()
    }
  }

}
