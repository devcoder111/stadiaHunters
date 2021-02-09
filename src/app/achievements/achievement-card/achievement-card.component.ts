import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router';
import { UsergameService } from "../../services/usergame/usergame.service";
import { AchievementService } from "../../services/achievement/achievement.service";


@Component({
  selector: 'achievement',
  templateUrl: './achievement-card.component.html',
  styleUrls: ['./achievement-card.component.sass']
})
export class AchievementCardComponent implements OnInit {

  @Input('achievement') data: any;
  @Input('game') game: any;
  @Input('navigate') navigate = true;

  unlocked: boolean = false

  constructor(
    private router: Router,
    private usergame: UsergameService,
    private achievementService: AchievementService
  ) { }

  ngOnInit(): void {
    this.usergame.currentUserGame.subscribe(game => { 
      if(game){
        this.unlocked = game.achievements_earned.includes(this.data._id)
      }
    })
  }

  buildRarity(){
    let percentage: string = this.percentage()
    if(this.data.players === undefined) return ''
    return `${this.data.players.length} tracked gamers ( ${percentage} )`
  }

  private percentage(){
    if(!this.game || !this.game.owned || this.data.players === undefined || this.data.players.length == 0) return ' 0.0 %'

     return ` ${(this.data.players.length / this.game.owned * 100).toFixed(1)} %`
  }

  buildRoute(){
    return `/game/${this.game.tag}/achievement/${this.data._id}/${this.data.title.toLowerCase().replace(" ", "-").replace(/%20/g, "-")}`
  }

  changeAchievement(){
    if(this.navigate){
      this.achievementService.changeAchievement(this.data)
      this.router.navigate([this.buildRoute()])
    }
  }

  buildTitle(){
    return this.data.title
  }

  buildSubtitle(){
    return this.data.subtitle
  }

}
