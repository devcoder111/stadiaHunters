import { Component, OnInit, Input } from '@angular/core';
import { GameDataService } from 'src/app/services/game/game-data.service';

@Component({
  selector: 'game-guide',
  templateUrl: './game-guide.component.html',
  styleUrls: ['../../../assets/styles/games.component.sass']
})
export class GameGuideComponent implements OnInit {
  
  @Input('game') game: any;

  constructor(private gameService: GameDataService) { }

  ngOnInit(): void {
  }

  buildRoute(){
    return `/game/${this.game.tag}/guide`
  }

  changeGame(){
    this.gameService.changeGame(undefined)
  }
  
  
}
