import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'achievement-user',
  templateUrl: './achievement-user.component.html',
  styleUrls: ['../../../assets/styles/leaderboard.sass']
})
export class AchievementUserComponent implements OnInit {

  @Input('index') index: any;
  @Input('data') data: any;

  constructor() { }

  ngOnInit(): void {
  }

  buildUsername(name:string, tag:String){
    var username = name
    if (tag != "0000") {
        username += `#${tag}`
    }
    return username
  }

  buildDate(completed:any){
    if(completed){
      var options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
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
