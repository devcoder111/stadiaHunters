import { Component, OnInit, Input } from '@angular/core';

import { UserService } from "../../services/user/user.service";

@Component({
  selector: 'game-leaderboard-user',
  templateUrl: './game-user.component.html',
  styleUrls: ['../../../assets/styles/leaderboard.sass']
})
export class GameUserComponent implements OnInit {

  @Input('index') index: any;
  @Input('data') data: any;

  constructor(
    public user: UserService
  ) { }

  ngOnInit(): void {
  }

  buildRoute(){
    this.user.changeUser(null)
    return `/user/${this.data.name}${this.data.tag == '0000' ? '' : '-' + this.data.tag}`
  }

  buildHours(){
    if(this.data.completion_time){
      return `~${(this.data.completion_time / 3600).toFixed(0)}h`
    } else {
      return ""
    }

  }

  buildDate(completed:any){
    if(completed && completed.seconds){
      var options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      };
      var date = new Date(1970, 0, 1)
      date.setSeconds(completed.seconds)
      var fmt = new Intl.DateTimeFormat('en-GB', options);
      return fmt.format(date);
    } else {
      return ''
    }
  }

}
