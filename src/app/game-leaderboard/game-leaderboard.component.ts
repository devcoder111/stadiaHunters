import { Component, OnInit } from '@angular/core';
import { SeoService } from "../seo/seo.service";
import { Router, ActivatedRoute} from '@angular/router';
import { UserService } from "../services/user/user.service";
import { GameDataService } from "../services/game/game-data.service";
import { PaginationService } from "../services/pagination/pagination.service";

@Component({
  selector: 'app-game-leaderboard',
  templateUrl: './game-leaderboard.component.html',
  styleUrls: ['./game-leaderboard.component.sass']
})
export class GameLeaderboardComponent implements OnInit {

  tag:any
  game:any

  constructor(
    private seo:SeoService,
    private route: ActivatedRoute,
    private gameService: GameDataService,
    public page: PaginationService
  ) {
    this.tag = this.route.parent?.snapshot.paramMap.get('tag')
   }

  ngOnInit(): void {
    this.initTags()
    this.gameService.currentGame.subscribe(game => { 
      if(game){
        this.game = game
        this.generateGameTags(game.name, game.banner)
        this.fetchLeaderboard(game._id)
      }
    })
  }

  initTags(){
    if(this.tag){
      this.generateGameTags(this.gameService.buildGameName(this.tag), this.gameService.buildGameBanner(this.tag))
    }
  }

  generateGameTags(name : string, banner: string){
    let data = {
      title: `${name} Achievements Leaderboard | Stadia Hunters`,
      description: `${name} leaderboard for Stadia.`,
      image: banner, 
    }
    this.seo.generateTags(data)
  }

  fetchLeaderboard(gameId:string){
    this.page.init(`games/${gameId}/players`, 'achievements_completed', { limit: 20, reverse: true, prepend: false, sort: { field:'completed', reverse: false }})
  }

  scrollHandler(e:any) {
    if (e === 'bottom') {
      this.page.more()
    }
  }

  guide(){
    return `/game/${this.tag}/guide/`
  }

  achievements(){
   return `/game/${this.tag}/achievements/`
  }

  review(){
    return `/game/${this.tag}/review/`
  }

}
