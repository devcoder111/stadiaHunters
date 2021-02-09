import { Component, OnInit, Input } from '@angular/core';
import { GameDataService } from 'src/app/services/game/game-data.service';

@Component({
  selector: 'game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['../../../assets/styles/games.component.sass']
})
export class GameCardComponent implements OnInit {

  @Input('game') game: any;

  constructor(private gameService: GameDataService) { }

  ngOnInit(): void {
  }

  buildRoute(){
    return `/game/${this.game.tag}/achievements`
  }

  changeGame(){
    this.gameService.changeGame(this.game)
  }

}
