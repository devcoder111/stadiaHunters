import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router';
import { GameDataService } from "../../services/game/game-data.service";
import { AchievementService } from "../../services/achievement/achievement.service";

@Component({
  selector: 'user-guide',
  templateUrl: './user-guide.component.html',
  styleUrls: ['./user-guide.component.sass']
})
export class UserGuideComponent implements OnInit {

  @Input('activity') activity: any;

  constructor(
    private router: Router,
    private game : GameDataService,
    private achievement : AchievementService
  ) { }

  ngOnInit(): void {
  }

  handleAchievement(){
    this.clear()
    let path = this.activity.path
    if(path){
      this.router.navigate([`/${this.activity.path}/${this.activity.achievement.title.toLowerCase().replace(" ", "-")}`]);
    } else {
      this.router.navigate([`/games/${this.activity.game._id}/achievement/${this.activity.achievement._id}/${this.activity.achievement.title.toLowerCase().replace(" ", "-")}}`])
    }
  }

  handleUser(){
    this.clear()
    this.router.navigate([this.activity.user.username]);
  }

  clear(){
    this.game.changeGame(undefined)
    this.achievement.changeAchievement(undefined)
  }

}
