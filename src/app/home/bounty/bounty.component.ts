import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router';
import { GameDataService } from "../../services/game/game-data.service";
import { AchievementService } from "../../services/achievement/achievement.service";

@Component({
  selector: 'bounty',
  templateUrl: './bounty.component.html',
  styleUrls: ['./bounty.component.sass']
})
export class BountyComponent implements OnInit {

  @Input('missing') missing: any

  constructor(
    private router: Router,
    private game : GameDataService,
    private achievement : AchievementService
  ) { }

  ngOnInit(): void {
  }

  handleAchievement(){

    this.game.changeGame(this.missing.game)
    this.achievement.changeAchievement(this.missing.achievement)
    this.router.navigate([`/games/${this.missing.game._id}/achievement/${this.missing.achievement._id}/${this.missing.achievement.title.toLowerCase().replace(" ", "-")}`]);
  }

  buildSubtitle(){
    return 'Insert here: [ Inspiring text, motivating the reader to help on the search of secret achievement ]'
  }

}
