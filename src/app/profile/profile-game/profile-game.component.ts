import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'profile-game',
  templateUrl: './profile-game.component.html',
  styleUrls: ['./profile-game.component.sass']
})
export class ProfileGameComponent implements OnInit {

  @Input('game') game: any;

  constructor() { }

  ngOnInit(): void {
  }

  buildPercentage(){
    return `${this.game.achievements_completed / this.game.achievements * 100}%`
  }

  buildLastPlayed(){
    if(this.game.last_played){
      var options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      };
      var date = new Date(1970, 0, 1)
      date.setSeconds(this.game.last_played.seconds)
      var fmt = new Intl.DateTimeFormat('en-GB', options);
      return fmt.format(date);
    } else {
      return ''
    }
  }

  buildHoursPlayed(){
    if(this.game.time_played){
      return `${Math.floor(this.game.time_played / 3600)} h`
    } else{
      return ''
    }
  }

  buildMinPlayed(){
    if(this.game.time_played){
      let hours = this.game.time_played / 3600
      return `${Math.floor(60 * (hours - Math.floor(hours)))} m`
    } else{
      return ''
    }
  }

}
