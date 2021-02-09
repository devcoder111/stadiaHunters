import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { SeoService } from "../seo/seo.service";

import { AuthService } from "../providers/auth.service.ts.service";
import { GameDataService } from "../services/game/game-data.service";
import { UsergameService } from "../services/usergame/usergame.service";
import { AchievementService } from "../services/achievement/achievement.service";
import { PaginationService } from "../services/pagination/pagination.service";

@Component({
  selector: 'app-game-achievements',
  templateUrl: './game-achievements.component.html',
  styleUrls: ['./game-achievements.component.sass']
})
export class GameAchievementsComponent implements OnInit {

  tag: any
  game:any

  showDropdown = false
  selected = 'order'

  constructor(
    private route: ActivatedRoute,
    private seo: SeoService,
    private auth: AuthService,
    private gameService: GameDataService,
    private userGameService: UsergameService,
    public page: PaginationService) {
      this.tag = this.route.parent?.parent?.snapshot.paramMap.get('tag')
    }

  ngOnInit(): void {
    this.initTags()
    this.gameService.currentGame.subscribe(game => { 
      if(game){
        this.game = game
        console.log(game)
        this.fetchUserGame()
        this.generateGameTags(game.name, game.banner, game.achievements)
        this.fetchAchievements(game._id, 'position')
      }
    })
  }

  initTags(){
    console.log(this.tag)
    if(this.tag){
      this.generateGameTags(this.gameService.buildGameName(this.tag), this.gameService.buildGameBanner(this.tag))
    }
  }
  

  generateGameTags(name : string, banner: string, achievements: number = 0){
    let data = {
      title: `${name} Achievements | Stadia Hunters`,
      description: `Full list of all ${achievements > 0 ? achievements : ""} ${name} achievements on Stadia.`,
      image: banner, 
    }
    this.seo.generateTags(data)
  }

  fetchAchievements(gameId: string, field: string, reverse: boolean = false, limit: number = 20){
    this.page.init(`games/${gameId}/achievement`, field, { limit: limit, reverse: reverse, prepend: false })
  }

  fetchUserGame(){
    const userId = this.route.snapshot.paramMap.get('userId')
    if(userId) {
      this.userGameService.fetchUserGame(userId, this.game._id) 
    } else {
      this.auth.loggedUser.subscribe(user =>{
        if(user) this.userGameService.fetchUserGame(user._id, this.game._id) 
      })
    }

  }

  scrollHandler(e:any) {
    if (e === 'bottom') {
      this.page.more()
    }
  }

  showDialog() {
    this.showDropdown = !this.showDropdown
  }

  buildDropdownText(){
    switch (this.selected) {
      case 'rare':
          return `Sort by : Rarest`
      case 'common':
        return `Sort by : Common`
      case 'bugged':
        return `Sort by : Bugged`
      case 'secret':
        return `Sort by : Secret` 
      default:
        return `Sort by : Order` 
    }
  }

  sort(type: string){
    this.showDialog()
    if(type !== this.selected){
      this.selected = type
      switch (type) {
        case 'rare':
          this.fetchAchievements(this.game._id, 'players', false, 200)
          break;
        case 'common':
          this.fetchAchievements(this.game._id, 'players', true, 200)
          break;
        case 'bugged':
          this.fetchAchievements(this.game._id, 'bugged')
          break;
        case 'secret':
          this.fetchAchievements(this.game._id, 'secret')
          break;
        case 'order':
          this.fetchAchievements(this.game._id, 'position')
          break;      
        default:
          break;
      }
    }
  }

  guide(){
    return `/game/${this.tag}/guide/`
  }

  leaderboard(){
    return `/game/${this.tag}/leaderboard/`
  }

  review(){
    return `/game/${this.tag}/review/`
  }
}
