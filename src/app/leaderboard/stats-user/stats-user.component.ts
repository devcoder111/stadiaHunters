import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'stats-user',
  templateUrl: './stats-user.component.html',
  styleUrls: ['../../../assets/styles/leaderboard.sass']
})
export class StatsUserComponent implements OnInit {

  @Input('index') index: any;
  @Input('filter') filter: any;
  @Input('data') data: any;

  constructor() { }

  ngOnInit(): void {
  }

  buildData(){
    switch(this.filter) { 
      case 'played': { 
        return  this.buildTimePlayed(this.data.time_played)
      } 
      case 'owned': { 
        return this.data.owned
      }
      case 'completed': { 
        return this.data.completed
      } 
      default: { 
        return this.buildTimePlayed(this.data.month_time_played)
      } 
    }
  }

  buildDataTitle(){
    switch(this.filter) { 
      case 'played': { 
        return 'Hours'
      } 
      case 'owned': { 
        return 'Players'
      }
      case 'completed': { 
        return 'Completed'
      } 
      default: { 
        return 'Hours'
      } 
    }
  }

  buildRarity(){
    return `${(this.data.completed / this.data.owned * 100).toFixed(1)} %`
  }

  buildTimePlayed(seconds: number){
    return `${Math.floor(seconds / 3600)}`
  }

}
