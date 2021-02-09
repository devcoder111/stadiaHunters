import { Component, OnInit, Input } from '@angular/core';

import { Router} from '@angular/router';
import { LeaderboardService } from 'src/app/services/leaderboard/leaderboard.service';

@Component({
  selector: 'profile-score',
  templateUrl: './profile-score.component.html',
  styleUrls: ['./profile-score.component.sass']
})
export class ProfileScoreComponent implements OnInit {

  @Input('type') type: any
  @Input('user') user: any

  constructor(
    private router: Router,
    private leaderboardService: LeaderboardService
  ) { }

  ngOnInit(): void {
  }

  buildUndefined(value:any){
    return value ? value : "-"
  }

  buildLeaderboard(){
    return this.leaderboardService.buildLeaderboard(this.type)
  }

  redirectLeaderboard(){
    this.router.navigate([`/leaderboard/${this.type}`]);
  }

  buildRank(){
    return this.leaderboardService.buildRank(this.type, this.user)
  }

  buildScore(){
    return this.leaderboardService.buildScore(this.type, this.user)
  }

  buildAchievements(){
    return this.leaderboardService.buildAchievements(this.type, this.user)
  }

  buildGames(){
    return this.leaderboardService.buildGames(this.type, this.user)
  }
}
